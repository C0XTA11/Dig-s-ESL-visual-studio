export interface CutoutOptions {
  tolerance?: number; // Distance tolerance (default: 32, range 10-80)
  feather?: number;   // Edge feathering in pixels (default: 2.5)
  style?: 'clean' | 'sticker' | 'feather'; // 'clean' = sharp alpha, 'sticker' = white vinyl outline, 'feather' = soft edge
  stickerBorderWidth?: number; // Width of sticker border in px (default: 10)
  targetColor?: { r: number; g: number; b: number }; // Optional custom key color
  clearCavities?: boolean; // Detect and clear enclosed background pockets (e.g. mug handles, arm gaps) (default: true)
}

/**
 * High-performance, intelligent background removal engine.
 * 
 * Features:
 * 1. Multi-cluster perimeter background detection (handles white, light tones, or custom key backdrops).
 * 2. BFS edge-connected flood-fill preserving interior whites (eyes, teeth, highlights).
 * 3. Smart internal cavity detection (clears enclosed holes like mug handles, arm loops, leg gaps).
 * 4. Precise alpha de-fringing / unpremultiplication (eliminates halo color contamination).
 * 5. Optional die-cut vinyl sticker contour or soft feathering.
 */
export async function removeBackgroundFromDataUrl(
  dataUrl: string,
  options: CutoutOptions = {}
): Promise<string> {
  const {
    tolerance = 32,
    feather = 2.5,
    style = 'clean',
    stickerBorderWidth = 10,
    targetColor,
    clearCavities = true
  } = options;

  return new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        if (width <= 0 || height <= 0) {
          resolve(dataUrl);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        const totalPixels = width * height;

        // 1. Auto-detect background key color using perimeter cluster sampling
        let bgR = 255;
        let bgG = 255;
        let bgB = 255;

        if (targetColor) {
          bgR = targetColor.r;
          bgG = targetColor.g;
          bgB = targetColor.b;
        } else {
          // Sample perimeter pixels and corners with inset to avoid border artifacts
          const samples: { r: number; g: number; b: number }[] = [];
          const stepX = Math.max(1, Math.floor(width / 40));
          const stepY = Math.max(1, Math.floor(height / 40));

          // Top and bottom edges
          for (let x = 0; x < width; x += stepX) {
            const topIdx = x * 4;
            samples.push({ r: data[topIdx], g: data[topIdx + 1], b: data[topIdx + 2] });
            const botIdx = ((height - 1) * width + x) * 4;
            samples.push({ r: data[botIdx], g: data[botIdx + 1], b: data[botIdx + 2] });
          }

          // Left and right edges
          for (let y = 0; y < height; y += stepY) {
            const leftIdx = (y * width) * 4;
            samples.push({ r: data[leftIdx], g: data[leftIdx + 1], b: data[leftIdx + 2] });
            const rightIdx = (y * width + (width - 1)) * 4;
            samples.push({ r: data[rightIdx], g: data[rightIdx + 1], b: data[rightIdx + 2] });
          }

          // Inset 4-corner sampling (5% inset)
          const insetX = Math.floor(width * 0.05);
          const insetY = Math.floor(height * 0.05);
          const cornerInsets = [
            (insetY * width + insetX) * 4,
            (insetY * width + (width - 1 - insetX)) * 4,
            ((height - 1 - insetY) * width + insetX) * 4,
            ((height - 1 - insetY) * width + (width - 1 - insetX)) * 4,
          ];
          for (const cIdx of cornerInsets) {
            samples.push({ r: data[cIdx], g: data[cIdx + 1], b: data[cIdx + 2] });
          }

          // Find dominant color cluster (median of brightest or modal cluster)
          if (samples.length > 0) {
            // Sort by luminance
            samples.sort((a, b) => (0.299 * a.r + 0.587 * a.g + 0.114 * a.b) - (0.299 * b.r + 0.587 * b.g + 0.114 * b.b));
            // In studio white isolation, the vast majority of perimeter samples are the backdrop
            // Take the upper-median cluster to safely reject any dark subject touching the edge
            const mid = Math.min(samples.length - 1, Math.floor(samples.length * 0.7));
            bgR = samples[mid].r;
            bgG = samples[mid].g;
            bgB = samples[mid].b;
          }
        }

        // Color distance function (perceptual human vision weighting)
        const colorDist = (r: number, g: number, b: number): number => {
          const rDiff = r - bgR;
          const gDiff = g - bgG;
          const bDiff = b - bgB;
          return Math.sqrt(0.299 * rDiff * rDiff + 0.587 * gDiff * gDiff + 0.114 * bDiff * bDiff);
        };

        // 2. BFS Flood Fill from image borders
        // visited: 0 = unvisited (potential subject), 1 = verified background, 2 = edge transition
        const visited = new Uint8Array(totalPixels);
        const queue = new Int32Array(totalPixels);
        let head = 0;
        let tail = 0;

        const maxTolerance = tolerance + feather;

        // Seed border pixels
        for (let x = 0; x < width; x++) {
          const topIdx = x;
          const topD = topIdx * 4;
          const distT = colorDist(data[topD], data[topD + 1], data[topD + 2]);
          if (distT <= tolerance) {
            visited[topIdx] = 1;
            queue[tail++] = topIdx;
          } else if (distT <= maxTolerance) {
            visited[topIdx] = 2;
          }

          const botIdx = (height - 1) * width + x;
          const botD = botIdx * 4;
          const distB = colorDist(data[botD], data[botD + 1], data[botD + 2]);
          if (distB <= tolerance) {
            visited[botIdx] = 1;
            queue[tail++] = botIdx;
          } else if (distB <= maxTolerance) {
            visited[botIdx] = 2;
          }
        }

        for (let y = 0; y < height; y++) {
          const leftIdx = y * width;
          if (!visited[leftIdx]) {
            const leftD = leftIdx * 4;
            const distL = colorDist(data[leftD], data[leftD + 1], data[leftD + 2]);
            if (distL <= tolerance) {
              visited[leftIdx] = 1;
              queue[tail++] = leftIdx;
            } else if (distL <= maxTolerance) {
              visited[leftIdx] = 2;
            }
          }

          const rightIdx = y * width + (width - 1);
          if (!visited[rightIdx]) {
            const rightD = rightIdx * 4;
            const distR = colorDist(data[rightD], data[rightD + 1], data[rightD + 2]);
            if (distR <= tolerance) {
              visited[rightIdx] = 1;
              queue[tail++] = rightIdx;
            } else if (distR <= maxTolerance) {
              visited[rightIdx] = 2;
            }
          }
        }

        // Run fast BFS perimeter flood
        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % width;
          const cy = (curr / width) | 0;

          if (cx > 0) {
            const n = curr - 1;
            if (visited[n] === 0) {
              const d = n * 4;
              const dist = colorDist(data[d], data[d + 1], data[d + 2]);
              if (dist <= tolerance) { visited[n] = 1; queue[tail++] = n; }
              else if (dist <= maxTolerance) { visited[n] = 2; }
            }
          }
          if (cx < width - 1) {
            const n = curr + 1;
            if (visited[n] === 0) {
              const d = n * 4;
              const dist = colorDist(data[d], data[d + 1], data[d + 2]);
              if (dist <= tolerance) { visited[n] = 1; queue[tail++] = n; }
              else if (dist <= maxTolerance) { visited[n] = 2; }
            }
          }
          if (cy > 0) {
            const n = curr - width;
            if (visited[n] === 0) {
              const d = n * 4;
              const dist = colorDist(data[d], data[d + 1], data[d + 2]);
              if (dist <= tolerance) { visited[n] = 1; queue[tail++] = n; }
              else if (dist <= maxTolerance) { visited[n] = 2; }
            }
          }
          if (cy < height - 1) {
            const n = curr + width;
            if (visited[n] === 0) {
              const d = n * 4;
              const dist = colorDist(data[d], data[d + 1], data[d + 2]);
              if (dist <= tolerance) { visited[n] = 1; queue[tail++] = n; }
              else if (dist <= maxTolerance) { visited[n] = 2; }
            }
          }
        }

        // 3. Smart Internal Cavity / Pocket Clearing (enclosed holes like mug handles, arm gaps)
        if (clearCavities) {
          const strictCavityTolerance = tolerance * 0.85;
          const cavityQueue = new Int32Array(totalPixels);

          for (let p = 0; p < totalPixels; p++) {
            if (visited[p] === 0) {
              const d = p * 4;
              const dist = colorDist(data[d], data[d + 1], data[d + 2]);
              // If unvisited pixel matches background color with high confidence
              if (dist <= strictCavityTolerance) {
                // BFS flood the potential cavity
                let cHead = 0;
                let cTail = 0;
                cavityQueue[cTail++] = p;
                visited[p] = 3; // temporary cavity marker

                let cavityPixelCount = 1;
                let touchesBorder = false;

                while (cHead < cTail) {
                  const curr = cavityQueue[cHead++];
                  const cx = curr % width;
                  const cy = (curr / width) | 0;

                  if (cx === 0 || cx === width - 1 || cy === 0 || cy === height - 1) {
                    touchesBorder = true;
                  }

                  const neighbors = [
                    cx > 0 ? curr - 1 : -1,
                    cx < width - 1 ? curr + 1 : -1,
                    cy > 0 ? curr - width : -1,
                    cy < height - 1 ? curr + width : -1
                  ];

                  for (const n of neighbors) {
                    if (n !== -1 && visited[n] === 0) {
                      const nd = n * 4;
                      if (colorDist(data[nd], data[nd + 1], data[nd + 2]) <= strictCavityTolerance) {
                        visited[n] = 3;
                        cavityQueue[cTail++] = n;
                        cavityPixelCount++;
                      }
                    }
                  }
                }

                // If it's a true enclosed background cavity (doesn't touch outer border and isn't massive)
                const isEnclosedCavity = !touchesBorder && cavityPixelCount < (totalPixels * 0.35);
                const markAs = isEnclosedCavity ? 1 : 0;
                for (let i = 0; i < cTail; i++) {
                  visited[cavityQueue[i]] = markAs;
                }
              }
            }
          }
        }

        // 4. Alpha Transparency, Anti-Aliasing, and Halo De-Fringing
        for (let p = 0; p < totalPixels; p++) {
          const dIdx = p * 4;
          const state = visited[p];

          if (state === 1) {
            // Absolute background -> pure transparent
            data[dIdx + 3] = 0;
          } else if (state === 2) {
            // Transition feather pixel
            const dist = colorDist(data[dIdx], data[dIdx + 1], data[dIdx + 2]);
            const alphaFactor = Math.max(0, Math.min(1, (dist - tolerance) / Math.max(0.5, feather)));
            const newAlpha = Math.round(data[dIdx + 3] * alphaFactor);
            data[dIdx + 3] = newAlpha;

            // De-fringe / unpremultiply background color
            if (newAlpha > 0 && newAlpha < 255) {
              const a = newAlpha / 255;
              data[dIdx] = Math.max(0, Math.min(255, Math.round((data[dIdx] - (1 - a) * bgR) / a)));
              data[dIdx + 1] = Math.max(0, Math.min(255, Math.round((data[dIdx + 1] - (1 - a) * bgG) / a)));
              data[dIdx + 2] = Math.max(0, Math.min(255, Math.round((data[dIdx + 2] - (1 - a) * bgB) / a)));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // 5. Vinyl Sticker Style Enhancement
        if (style === 'sticker') {
          const stickerCanvas = document.createElement('canvas');
          stickerCanvas.width = width;
          stickerCanvas.height = height;
          const sCtx = stickerCanvas.getContext('2d');

          if (sCtx) {
            // Create clean solid white die-cut decal border
            sCtx.shadowColor = '#FFFFFF';
            sCtx.shadowBlur = stickerBorderWidth;
            for (let i = 0; i < 4; i++) {
              sCtx.drawImage(canvas, 0, 0);
            }
            sCtx.shadowBlur = 0;
            // Draw original cutout cleanly on top
            sCtx.drawImage(canvas, 0, 0);
            resolve(stickerCanvas.toDataURL('image/png'));
            return;
          }
        }

        // Return pure transparent PNG
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error removing background:', err);
        resolve(dataUrl);
      }
    };

    img.onerror = (e) => {
      console.error('Image load failed for background cutout:', e);
      resolve(dataUrl);
    };

    img.src = dataUrl;
  });
}
