import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PhotoLightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: string, state: any) => void;
  initialState?: any;
}

const tRGB: [number, [number, number, number]][] = [
  [2000, [1.0, 0.40, 0.07]], [2500, [1.0, 0.54, 0.16]], [3000, [1.0, 0.66, 0.26]],
  [3500, [1.0, 0.79, 0.41]], [4000, [1.0, 0.88, 0.59]], [4500, [1.0, 0.94, 0.75]],
  [5000, [1.0, 0.97, 0.87]], [5600, [1.0, 0.98, 0.95]], [6500, [0.91, 0.94, 1.0]],
  [7500, [0.84, 0.89, 1.0]], [9000, [0.77, 0.84, 1.0]]
];

const getLRC = (t: number) => {
  for (let i = 0; i < tRGB.length - 1; i++) {
    const a = tRGB[i], b = tRGB[i + 1];
    if (t >= a[0] && t <= b[0]) {
      const f = (t - a[0]) / (b[0] - a[0]);
      return [
        a[1][0] + (b[1][0] - a[1][0]) * f,
        a[1][1] + (b[1][1] - a[1][1]) * f,
        a[1][2] + (b[1][2] - a[1][2]) * f
      ];
    }
  }
  return tRGB[tRGB.length - 1][1];
};

const TP: Record<string, { dp: number, sp: number, si: number }> = {
  key: { dp: 1.3, sp: 28, si: 0.75 }, 
  fill: { dp: 0.55, sp: 8, si: 0.2 },
  rim: { dp: 1.1, sp: 52, si: 1.1 }, 
  softbox: { dp: 0.65, sp: 6, si: 0.22 },
  spot: { dp: 2.2, sp: 100, si: 1.4 }, 
  practical: { dp: 1.0, sp: 18, si: 0.55 }
};

export function PhotoLightModal({ isOpen, onClose, onSave, initialState }: PhotoLightModalProps) {
  const [az, setAz] = useState(initialState?.az ?? 270);
  const [el, setEl] = useState(initialState?.el ?? 45);
  const [intensity, setIntensity] = useState(initialState?.intensity ?? 75);
  const [ct, setCt] = useState(initialState?.ct ?? 5600);
  const [hard, setHard] = useState(initialState?.hard ?? 50);
  const [fill, setFill] = useState(initialState?.fill ?? 0);
  const [type, setType] = useState(initialState?.type ?? 'key');
  const [subject, setSubject] = useState(initialState?.subject ?? 'portrait');

  const domeRef = useRef<HTMLCanvasElement>(null);
  const sphRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isOpen) {
      drawDome();
      drawSphere();
    }
  }, [isOpen, az, el, intensity, ct, hard, fill, type, subject]);

  const drawDome = () => {
    const canvas = domeRef.current;
    if (!canvas) return;
    const dc = canvas.getContext('2d');
    if (!dc) return;
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = 182;
    dc.clearRect(0, 0, W, H);
    dc.fillStyle = '#0e0e0e'; dc.fillRect(0, 0, W, H);

    [0, 20, 40, 60, 80].forEach((e, i) => {
      const r = R * Math.cos(e * Math.PI / 180); 
      if (r < 2) return;
      dc.strokeStyle = i === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.055)';
      dc.lineWidth = i === 0 ? 1 : 0.5;
      dc.beginPath(); dc.arc(cx, cy, r, 0, Math.PI * 2); dc.stroke();
      if (i > 0 && i < 4) {
        dc.fillStyle = 'rgba(255,255,255,0.16)';
        dc.font = '9px "IBM Plex Mono", monospace';
        dc.textAlign = 'left'; dc.textBaseline = 'middle';
        dc.fillText(e + '°', cx + r + 5, cy);
      }
    });

    dc.strokeStyle = 'rgba(255,255,255,0.055)'; dc.lineWidth = 0.5;
    dc.beginPath(); dc.moveTo(cx - R, cy); dc.lineTo(cx + R, cy); dc.moveTo(cx, cy - R); dc.lineTo(cx, cy + R); dc.stroke();
    const dd = R * 0.707;
    dc.strokeStyle = 'rgba(255,255,255,0.022)';
    dc.beginPath(); dc.moveTo(cx - dd, cy - dd); dc.lineTo(cx + dd, cy + dd); dc.moveTo(cx + dd, cy - dd); dc.lineTo(cx - dd, cy + dd); dc.stroke();

    for (let i = 0; i < 360; i += 10) {
      const rad = (i - 90) * Math.PI / 180;
      const maj = i % 90 === 0, med = i % 30 === 0;
      const inn = R - (maj ? 15 : med ? 8 : 4);
      dc.strokeStyle = maj ? 'rgba(255,255,255,0.38)' : med ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)';
      dc.lineWidth = maj ? 1.5 : 0.5;
      dc.beginPath(); dc.moveTo(cx + inn * Math.cos(rad), cy + inn * Math.sin(rad)); dc.lineTo(cx + R * Math.cos(rad), cy + R * Math.sin(rad)); dc.stroke();
    }

    dc.fillStyle = 'rgba(255,255,255,0.2)'; dc.font = '9px "IBM Plex Mono", monospace'; dc.textAlign = 'center'; dc.textBaseline = 'middle';
    [30, 60, 90, 120, 150, 210, 240, 270, 300, 330].forEach((deg) => {
      const drad = (deg - 90) * Math.PI / 180;
      dc.fillText(deg + '°', cx + (R + 22) * Math.cos(drad), cy + (R + 22) * Math.sin(drad));
    });

    dc.fillStyle = 'rgba(255,255,255,0.45)'; dc.font = 'bold 10px sans-serif';
    dc.fillText('F', cx, cy - R - 14); dc.fillText('B', cx, cy + R + 14);
    dc.fillText('L', cx - R - 14, cy); dc.fillText('R', cx + R + 14, cy);

    const azR = (az - 90) * Math.PI / 180, elR = el * Math.PI / 180;
    const rn = Math.cos(elR);
    const lx = cx + R * rn * Math.cos(azR), ly = cy + R * rn * Math.sin(azR);

    const selR = el * Math.PI / 180;
    const rawLen = el < 3 ? R * 0.7 : Math.min(R * 0.72, R * 0.28 / Math.tan(selR));
    const shadowLen = Math.max(10, rawLen);
    const shadowAzR = (az + 180 - 90) * Math.PI / 180;
    const ssx = cx + shadowLen * Math.cos(shadowAzR), ssy = cy + shadowLen * Math.sin(shadowAzR);
    
    dc.setLineDash([3, 5]); dc.strokeStyle = 'rgba(90,140,220,0.38)'; dc.lineWidth = 1.5;
    dc.beginPath(); dc.moveTo(cx, cy); dc.lineTo(ssx, ssy); dc.stroke(); dc.setLineDash([]);
    
    dc.fillStyle = 'rgba(90,140,220,0.38)';
    dc.beginPath(); dc.moveTo(ssx, ssy);
    dc.lineTo(ssx - 9 * Math.cos(shadowAzR - 0.38), ssy - 9 * Math.sin(shadowAzR - 0.38));
    dc.lineTo(ssx - 9 * Math.cos(shadowAzR + 0.38), ssy - 9 * Math.sin(shadowAzR + 0.38));
    dc.closePath(); dc.fill();

    dc.setLineDash([3, 6]); dc.strokeStyle = 'rgba(239,159,39,0.16)'; dc.lineWidth = 1;
    dc.beginPath(); dc.moveTo(cx, cy); dc.lineTo(lx, ly); dc.stroke(); dc.setLineDash([]);

    dc.strokeStyle = 'rgba(255,255,255,0.22)'; dc.lineWidth = 1.5;
    dc.beginPath(); dc.arc(cx, cy - 8, 5, 0, Math.PI * 2); dc.stroke();
    dc.beginPath(); dc.moveTo(cx, cy - 3); dc.lineTo(cx, cy + 9); dc.stroke();
    dc.beginPath(); dc.moveTo(cx - 7, cy + 2); dc.lineTo(cx + 7, cy + 2); dc.stroke();

    const srcR = type === 'softbox' ? 28 : type === 'spot' ? 6 : type === 'rim' ? 10 : type === 'fill' ? 20 : 14;
    dc.strokeStyle = 'rgba(239,159,39,0.45)'; dc.lineWidth = 1.5;
    if (type === 'softbox') {
      dc.strokeRect(lx - srcR, ly - srcR * 0.65, srcR * 2, srcR * 1.3);
    } else if (type === 'spot') {
      dc.beginPath(); dc.arc(lx, ly, srcR, 0, Math.PI * 2); dc.stroke();
      dc.strokeStyle = 'rgba(239,159,39,0.2)';
      dc.beginPath(); dc.moveTo(lx, ly); dc.lineTo(cx, cy); dc.stroke();
    } else {
      dc.beginPath(); dc.arc(lx, ly, srcR, 0, Math.PI * 2); dc.stroke();
    }

    const g = dc.createRadialGradient(lx, ly, 0, lx, ly, srcR + 24);
    g.addColorStop(0, 'rgba(239,159,39,0.38)'); g.addColorStop(1, 'rgba(239,159,39,0)');
    dc.fillStyle = g; dc.beginPath(); dc.arc(lx, ly, srcR + 24, 0, Math.PI * 2); dc.fill();

    dc.fillStyle = '#EF9F27'; dc.beginPath(); dc.arc(lx, ly, 8, 0, Math.PI * 2); dc.fill();
    dc.fillStyle = 'rgba(255,242,210,0.95)'; dc.beginPath(); dc.arc(lx - 2, ly - 2, 3, 0, Math.PI * 2); dc.fill();

  };

  const drawSphere = () => {
    const canvas = sphRef.current;
    if (!canvas) return;
    const sc = canvas.getContext('2d');
    if (!sc) return;
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = 178;
    sc.fillStyle = '#111827'; sc.fillRect(0, 0, W, H);

    const azR = az * Math.PI / 180, elR = el * Math.PI / 180;
    const lx = Math.sin(azR) * Math.cos(elR), ly = Math.sin(elR), lz = Math.cos(azR) * Math.cos(elR);
    const lc = getLRC(ct), iF = intensity / 100;
    const tp = TP[type] || TP.key;
    const hF = hard / 100;
    const dp = tp.dp * (0.55 + hF * 0.9), sp = tp.sp * (0.25 + hF * 1.5), si = tp.si * (0.18 + hF * 0.95);
    const fillIf = fill / 100 * iF * 0.48;
    const flx = 0, fly = 0.5, flz = 0.866; 
    const fillLC = [0.88, 0.92, 1.0];

    const img = sc.createImageData(W, H), dd = img.data;
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const dx = (px - cx) / R, dy = -(py - cy) / R, d2 = dx * dx + dy * dy;
        if (d2 > 1) continue;
        const dz = Math.sqrt(1 - d2), nx = dx, ny = dy, nz = dz;
        const NdL = nx * lx + ny * ly + nz * lz;
        const diff = Math.pow(Math.max(0, NdL), dp);
        const rx = 2 * NdL * nx - lx, ry = 2 * NdL * ny - ly, rz = 2 * NdL * nz - lz;
        const spec = Math.pow(Math.max(0, rz), sp) * si;
        const FNdL = nx * flx + ny * fly + nz * flz;
        const fd = Math.pow(Math.max(0, FNdL), 0.6);
        const sR = 0.60, sG = 0.60, sB = 0.635;
        const fr = Math.pow(1 - dz, 2.3) * 0.44;
        let r = (0.035 + diff * iF * lc[0] + fd * fillIf * fillLC[0]) * sR * (1 - fr) + spec * iF * lc[0];
        let gg = (0.035 + diff * iF * lc[1] + fd * fillIf * fillLC[1]) * sG * (1 - fr) + spec * iF * lc[1];
        let b = (0.035 + diff * iF * lc[2] + fd * fillIf * fillLC[2]) * sB * (1 - fr) + spec * iF * lc[2];
        r = Math.pow(Math.min(1, r * 1.5), 0.45) * 255;
        gg = Math.pow(Math.min(1, gg * 1.5), 0.45) * 255;
        b = Math.pow(Math.min(1, b * 1.5), 0.45) * 255;
        const idx = (py * W + px) * 4; dd[idx] = r; dd[idx + 1] = gg; dd[idx + 2] = b; dd[idx + 3] = 255;
      }
    }
    sc.putImageData(img, 0, 0);

    const shX = cx - lx * R * 0.28;
    sc.fillStyle = 'rgba(0,0,0,0.55)';
    sc.beginPath(); sc.ellipse(shX, cy + R + 8, R * 0.48, 8, 0, 0, Math.PI * 2); sc.fill();

    if (subject === 'portrait') {
      const cl = getCL(az, el);
      const eyeX = cx + 30, eyeY = cy - 48, eyeR = 22;
      sc.fillStyle = 'rgba(220,220,230,0.1)'; sc.beginPath(); sc.ellipse(eyeX, eyeY, eyeR, eyeR * 0.62, 0, 0, Math.PI * 2); sc.fill();
      sc.fillStyle = 'rgba(70,90,130,0.38)'; sc.beginPath(); sc.arc(eyeX, eyeY, 10, 0, Math.PI * 2); sc.fill();
      sc.fillStyle = 'rgba(0,0,0,0.55)'; sc.beginPath(); sc.arc(eyeX, eyeY, 5, 0, Math.PI * 2); sc.fill();
      if (cl) {
        const cla = cl.angle * Math.PI / 180;
        sc.fillStyle = 'rgba(255,252,240,0.95)';
        sc.beginPath(); sc.arc(eyeX + 7 * Math.sin(cla), eyeY - 7 * Math.cos(cla), 3.5, 0, Math.PI * 2); sc.fill();
      }
    }
  };

  const normAz = (a: number) => ((a % 360) + 360) % 360;

  const getCL = (a: number, e: number) => {
    const n = normAz(a); if (n > 148 && n < 212 || e < 5) return null;
    const azR = a * Math.PI / 180, elR = e * Math.PI / 180;
    const x = Math.sin(azR) * Math.cos(elR), y = Math.sin(elR);
    let angle = Math.atan2(x, y) * 180 / Math.PI; if (angle < 0) angle += 360;
    let h = Math.round(angle / 30); if (h === 0 || h === 12) h = 12;
    return { hours: h, angle, clock: h + ':00' };
  };

  const shadowDir = (a: number) => {
    const opp = normAz(normAz(a) + 180);
    if (opp < 20 || opp >= 340) return 'directly behind subject, away from camera';
    if (opp < 68) return 'behind and to camera-left';
    if (opp < 113) return 'to camera-left';
    if (opp < 157) return 'front-left, toward camera-left foreground';
    if (opp < 202) return 'toward camera, foreground shadow visible in frame';
    if (opp < 248) return 'front-right, toward camera-right foreground';
    if (opp < 293) return 'to camera-right';
    return 'behind and to camera-right';
  };

  const shadowLength = (e: number) => {
    if (e < 2) return '∞ (horizontal light)';
    if (e > 88) return '<0.05× (negligible)';
    const r = 1 / Math.tan(e * Math.PI / 180);
    if (r > 12) return '>12× subject height';
    return (Math.round(r * 10) / 10).toFixed(1) + '× subject height';
  };

  const moodStyle = (a: number, e: number, h: number, t: string, c: number) => {
    const n = normAz(a), parts = [];
    if (n > 280 || n < 60) {
      if (e > 28 && e < 65 && h > 40) parts.push('Rembrandt chiaroscuro — triangular cheek highlight, Renaissance master-painting tonal depth');
      else if (e > 65) parts.push('butterfly/Paramount — symmetrical drop shadow directly beneath nose, classic Hollywood glamour');
      else if (e < 15) parts.push('frontal low angle — unflattering undereye light, horror or interrogation quality');
      else parts.push('near-frontal directional — catchlight-rich, minimal shadow definition, approachable softness');
    } else if (n > 60 && n < 120) {
      e < 20 ? parts.push('extreme low sidelight — venetian-blind-style raking shadows, noir or expressionist quality') : parts.push('split sidelight — half face in deep shadow, graphic bilaterally-divided composition');
    } else if (n > 148 && n < 212) {
      parts.push('full backlight — silhouette potential, subject edge-lit with rim halo, atmospheric lens flare possible');
    } else if (n > 120 && n < 148 || n > 212 && n < 248) {
      parts.push('rear ¾ — strong rim separation from background, subject edge definition, hair-light quality');
    } else {
      parts.push('broad broad sidelight — strong lateral texture and form revelation, subject volume emphasized');
    }
    if (e < 14 && (n < 148 || n > 212)) parts.push('low-angle raking — surface micro-texture brutally revealed');
    if (e > 78) parts.push('overhead utility feel — generally unflattering to faces unless heavily diffused');
    if (h > 78) parts.push('high-contrast graphic quality — bone structure and skin texture emphasized');
    if (h < 22) parts.push('enveloping wraparound — skin-smoothing quality, fashion and cosmetics-appropriate');
    if (c < 3100) parts.push('tungsten warm color — period, nostalgic, firelit or intimate indoor atmosphere');
    if (c > 7200) parts.push('cold blue-sky color — psychological chill, clinical or urban-night atmosphere');
    return parts.join('. ');
  };

  const styleRef = (a: number, e: number, h: number, t: string, c: number) => {
    const n = normAz(a), refs = [];
    if ((n > 280 || n < 70) && e > 28 && e < 65 && h > 42) refs.push('Yousuf Karsh');
    if (e > 60 && (n > 320 || n < 40)) refs.push('George Hurrell (glamour overhead)');
    if (h < 28 && t === 'softbox') refs.push('Annie Leibovitz / Platon (soft studio)');
    if (n > 60 && n < 120 && e < 25) refs.push('film noir (Gregg Toland, James Wong Howe)');
    if (n > 148 && n < 212) refs.push('David Bailey (backlit editorial)');
    if (t === 'spot' && h > 70) refs.push('Irving Penn (hard spotlight)');
    if (c < 3000) refs.push('Peter Lindbergh (warm intimate)');
    if (c > 6800) refs.push('Richard Avedon (cool neutral)');
    if (refs.length === 0) refs.push('contemporary editorial / commercial standard');
    return refs.join(', ');
  };

  const azLong = (a: number) => {
    const n = normAz(a), r = Math.round(n);
    if (n < 5 || n >= 355) return r + '° — on-axis with camera, fully frontal flat illumination';
    if (n < 22) return r + '° — near-frontal with slight camera-right offset';
    if (n < 45) return r + '° — 45° camera-right, front-right broad';
    if (n < 68) return r + '° — broad camera-right, dominant side component';
    if (n < 90) return r + '° — nearly full camera-right sidelight';
    if (n < 113) return r + '° — 90° camera-right, pure split sidelight';
    if (n < 135) return r + '° — past side into back-right, rear ¾';
    if (n < 158) return r + '° — back-right rear ¾, strong rim potential';
    if (n < 180) return r + '° — near-backlight from camera-right';
    if (n < 202) return r + '° — directly behind subject, full backlight';
    if (n < 225) return r + '° — near-backlight from camera-left';
    if (n < 248) return r + '° — back-left rear ¾, strong rim potential';
    if (n < 270) return r + '° — past side into back-left, rear ¾';
    if (n < 293) return r + '° — 270° camera-left, pure split sidelight';
    if (n < 315) return r + '° — broad camera-left, dominant side';
    if (n < 338) return r + '° — 315° camera-left, classic 45° Rembrandt zone';
    return r + '° — near-frontal with slight camera-left offset';
  };

  const elLong = (e: number) => {
    const r = Math.round(e);
    if (e < 3) return r + '° — at horizon level, horizontal light, maximum raking texture';
    if (e < 12) return r + '° — extreme low angle, near-horizon';
    if (e < 22) return r + '° — low dramatic angle';
    if (e < 32) return r + '° — low-to-mid, loop lighting zone';
    if (e < 44) return r + '° — ¾ height, approaching classic 45° key';
    if (e < 52) return r + '° — standard 45° key elevation, textbook portrait position';
    if (e < 62) return r + '° — steeper high angle, shadows pull short';
    if (e < 72) return r + '° — high steep angle';
    if (e < 82) return r + '° — near-overhead (butterfly zone)';
    return r + '° — directly overhead, shadows fall directly beneath';
  };

  const hardLong = (h: number) => {
    if (h < 12) return 'ultra-soft (' + h + '/100) — borderline shadowless wrap';
    if (h < 28) return 'very soft (' + h + '/100) — wide diffusion, cloud-like gradation';
    if (h < 42) return 'soft (' + h + '/100) — gentle feathered shadow edge';
    if (h < 55) return 'semi-soft (' + h + '/100) — defined shadow with brushed edge';
    if (h < 65) return 'medium (' + h + '/100) — clear shadow definition';
    if (h < 78) return 'hard (' + h + '/100) — sharp shadow edge, strong specular';
    if (h < 90) return 'very hard (' + h + '/100) — razor-edged shadows';
    return 'ultra-hard (' + h + '/100) — point-source quality, maximum contrast';
  };

  const ctLong = (t: number) => {
    if (t < 2300) return t + 'K — extreme amber-orange, near-black shadows';
    if (t < 2700) return t + 'K — classic tungsten/filament, rich amber';
    if (t < 3100) return t + 'K — warm studio tungsten, golden tones';
    if (t < 3600) return t + 'K — warm white incandescent, golden-hour';
    if (t < 4300) return t + 'K — warm-to-neutral balance';
    if (t < 5000) return t + 'K — near-neutral daylight, clean whites';
    if (t < 5800) return t + 'K — standard daylight, true neutral';
    if (t < 6400) return t + 'K — slightly cool, high overcast';
    if (t < 7200) return t + 'K — open shade/blue sky, cool cast';
    if (t < 8200) return t + 'K — heavy overcast, cold blue-gray';
    return t + 'K — strong blue-violet cast, dusk quality';
  };

  const intensityLong = (i: number) => {
    if (i < 12) return i + '% — barely-ambient, deep low-key';
    if (i < 28) return i + '% — very low exposure';
    if (i < 42) return i + '% — fill/ambient level';
    if (i < 58) return i + '% — moderate exposure';
    if (i < 72) return i + '% — medium-high, slight shadow depth';
    if (i < 86) return i + '% — standard key exposure';
    if (i < 95) return i + '% — high output, near peak';
    return i + '% — maximum output, blown highlights';
  };

  const fillLong = (f: number) => {
    if (f === 0) return 'none — pure shadow, full drama';
    if (f < 12) return f + '% fill — barely perceptible lift';
    if (f < 25) return f + '% fill — slight lift, portrait shadow';
    if (f < 40) return f + '% fill — moderate fill';
    if (f < 58) return f + '% fill — balanced commercial lighting';
    if (f < 75) return f + '% fill — heavy fill, approaching flat';
    return f + '% fill — near-equal, high-key';
  };

  const tyLbl: Record<string, string> = { key: 'Key light', fill: 'Fill light', rim: 'Rim light', softbox: 'Large softbox', spot: 'Spotlight', practical: 'Practical' };
  const subW: Record<string, string> = { portrait: 'portrait subject', product: 'product', still: 'still-life composition', arch: 'architectural surface' };

  const buildPromptString = () => {
    const sw = subW[subject] || 'subject';
    const cl = getCL(az, el);
    const n = normAz(az);
    const isBack = n > 148 && n < 212;
    const azParts = azLong(az).split('—');
    const azShort = azParts[0].trim();
    const azQual = azParts[1] ? azParts[1].trim() : '';
    const elParts = elLong(el).split('—');
    const elShort = elParts[0].trim();
    const hardParts = hardLong(hard).split('—');
    const hardShort = hardParts[0].trim();
    const ctParts = ctLong(ct).split('—');
    const ctShort = ctParts[0].trim();
    const intParts = intensityLong(intensity).split('—');
    const intShort = intParts[0].trim();

    let p = tyLbl[type] + ' striking ' + sw + ' from ' + azShort + (azQual ? ', ' + azQual : '') + '; ' + elShort + '. ';
    p += hardShort + ' shadow quality — shadows fall ' + shadowDir(az) + ', ' + shadowLength(el) + '. ';
    p += ctShort + (ctParts[1] ? ', ' + ctParts[1].trim() : '') + '. ';
    p += intShort + (intParts[1] ? ', ' + intParts[1].trim() : '') + '. ';
    p += (fill > 0 ? fillLong(fill).split('—')[0].trim() + ' supplemental fill from front.' : 'No fill light — full unmitigated shadow depth.') + ' ';
    if (!isBack && cl) p += 'Catchlight positioned at ' + cl.clock + ' in the eye (' + type + ' reflection shape). ';
    const mood = moodStyle(az, el, hard, type, ct);
    if (mood) p += mood.split('.')[0] + '. ';
    p += 'Style references: ' + styleRef(az, el, hard, type, ct) + '.';
    return p;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!domeRef.current || !isDragging.current) return;
    const rect = domeRef.current.getBoundingClientRect();
    const W = domeRef.current.width, H = domeRef.current.height;
    const cx = W / 2, cy = H / 2, R = 182;
    const sx = W / rect.width, sy = H / rect.height;
    const px = (clientX - rect.left) * sx, py = (clientY - rect.top) * sy;
    
    const dx = px - cx, dy = -(py - cy);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const rn = Math.min(dist / R, 1);
    
    let a = Math.atan2(dx, dy) * 180 / Math.PI; if (a < 0) a += 360;
    setAz(a);
    setEl(Math.acos(rn) * 180 / Math.PI);
  };

  const setP = (p: any) => {
    setAz(p.az); setEl(p.el); setIntensity(p.intensity); setCt(p.ct);
    setHard(p.hard); setFill(p.fill); setType(p.type);
  };

  const presets = {
    rembrandt: { az: 315, el: 45, intensity: 80, ct: 3200, hard: 65, fill: 0, type: 'key' },
    beauty: { az: 0, el: 68, intensity: 72, ct: 5600, hard: 28, fill: 32, type: 'softbox' },
    dramatic: { az: 93, el: 11, intensity: 95, ct: 2700, hard: 88, fill: 0, type: 'spot' },
    backlit: { az: 180, el: 28, intensity: 85, ct: 6200, hard: 72, fill: 14, type: 'rim' },
    overhead: { az: 0, el: 84, intensity: 65, ct: 5500, hard: 55, fill: 20, type: 'softbox' },
    split: { az: 90, el: 42, intensity: 90, ct: 4200, hard: 74, fill: 0, type: 'key' },
    noir: { az: 278, el: 17, intensity: 88, ct: 2900, hard: 96, fill: 0, type: 'spot' },
    golden: { az: 302, el: 7, intensity: 85, ct: 2800, hard: 80, fill: 5, type: 'practical' },
    butterfly: { az: 2, el: 70, intensity: 75, ct: 5600, hard: 40, fill: 35, type: 'softbox' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-[920px] w-full max-h-[90vh] flex flex-col font-['DM_Sans',sans-serif] text-[#eeeeee]"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#4a4a4a]">Light Valve</h1>
                    <p className="text-[12px] text-[#4a4a4a] hidden sm:block">photography light direction controller</p>
                </div>
                <button onClick={onClose} className="p-2 -m-2 text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {Object.entries(presets).map(([k, p]) => (
                        <button key={k} onClick={() => setP(p)} className="text-[11px] px-3.5 py-1.5 rounded-full border border-white/10 bg-[#161616] text-[#888] hover:border-white/20 hover:text-white transition-all capitalize tracking-wide font-medium">
                            {k}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#4a4a4a]">Dome — drag light</span>
                            <div className="flex gap-4 font-mono text-center">
                                <div><div className="text-xl font-medium leading-none">{Math.round(az)}°</div><div className="text-[10px] text-[#4a4a4a] mt-1">Azimuth</div></div>
                                <div><div className="text-xl font-medium leading-none">{Math.round(el)}°</div><div className="text-[10px] text-[#4a4a4a] mt-1">Elevation</div></div>
                            </div>
                        </div>
                        <canvas 
                            ref={domeRef} width={420} height={420} 
                            className="w-full aspect-square bg-[#0e0e0e] rounded-[10px] border border-white/10 cursor-crosshair touch-none"
                            onMouseDown={(e) => { isDragging.current = true; handlePointerMove(e.clientX, e.clientY); }}
                            onMouseMove={(e) => { if(e.buttons === 1) handlePointerMove(e.clientX, e.clientY); }}
                            onMouseUp={() => isDragging.current = false}
                            onMouseLeave={() => isDragging.current = false}
                            onTouchStart={(e) => { isDragging.current = true; handlePointerMove(e.touches[0].clientX, e.touches[0].clientY); }}
                            onTouchMove={(e) => { if(isDragging.current) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY); }}
                            onTouchEnd={() => isDragging.current = false}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#4a4a4a]">Subject preview</span>
                            <span className="text-[11px] font-mono text-[#EF9F27]">{tyLbl[type]}</span>
                        </div>
                        <canvas ref={sphRef} width={420} height={420} className="w-full aspect-square bg-[#111827] rounded-[10px] border border-white/10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#161616] border border-white/10 rounded-[10px] p-4">
                        <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#4a4a4a] mb-3">Exposure</div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2"><span className="text-[11px] text-[#888]">Intensity</span><span className="font-mono text-[11px] text-[#EF9F27] font-medium">{intensity}%</span></div>
                            <input type="range" min="0" max="100" value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="w-full h-0.5 bg-[#262626] rounded-full appearance-none outline-none accent-[#EF9F27]" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2"><span className="text-[11px] text-[#888]">Fill ratio</span><span className="font-mono text-[11px] text-[#EF9F27] font-medium">{fill}%</span></div>
                            <input type="range" min="0" max="100" value={fill} onChange={e => setFill(Number(e.target.value))} className="w-full h-0.5 bg-[#262626] rounded-full appearance-none outline-none accent-[#EF9F27]" />
                        </div>
                    </div>
                    <div className="bg-[#161616] border border-white/10 rounded-[10px] p-4">
                        <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#4a4a4a] mb-3">Light quality</div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2"><span className="text-[11px] text-[#888]">Color temp</span><span className="font-mono text-[11px] text-[#EF9F27] font-medium">{ct} K</span></div>
                            <input type="range" min="2000" max="9000" step="100" value={ct} onChange={e => setCt(Number(e.target.value))} className="w-full h-0.5 bg-[#262626] rounded-full appearance-none outline-none accent-[#EF9F27]" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2"><span className="text-[11px] text-[#888]">Hardness</span><span className="font-mono text-[11px] text-[#EF9F27] font-medium">{hard}</span></div>
                            <input type="range" min="0" max="100" value={hard} onChange={e => setHard(Number(e.target.value))} className="w-full h-0.5 bg-[#262626] rounded-full appearance-none outline-none accent-[#EF9F27]" />
                        </div>
                    </div>
                    <div className="bg-[#161616] border border-white/10 rounded-[10px] p-4">
                        <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#4a4a4a] mb-3">Light type</div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {Object.keys(tyLbl).map(k => (
                                <button key={k} onClick={() => setType(k)} className={`text-[11px] px-2.5 py-1 rounded-md border min-w-[max-content] transition-all ${type === k ? 'border-[#EF9F27] bg-[#EF9F27]/10 text-[#EF9F27]' : 'border-white/10 text-[#888] hover:border-[#EF9F27]/30 hover:text-[#EF9F27]'}`}>{tyLbl[k].split(' ')[0]}</button>
                            ))}
                        </div>
                        <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#4a4a4a] mb-3">Subject</div>
                        <div className="flex flex-wrap gap-1.5">
                            {Object.keys(subW).map(k => (
                                <button key={k} onClick={() => setSubject(k)} className={`text-[11px] px-2.5 py-1 rounded-md border min-w-[max-content] transition-all ${subject === k ? 'border-[#7DC8FF] bg-[#7DC8FF]/10 text-[#7DC8FF]' : 'border-white/10 text-[#888] hover:border-[#7DC8FF]/30 hover:text-[#7DC8FF]'}`}>{k}</button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4 border-t border-white/10 bg-[#161616] shrink-0 flex justify-between items-center">
                <div className="text-[10px] text-[#888] max-w-sm leading-relaxed hidden md:block">
                    The prompt text will be generated directly into the engine, explicitly guiding the AI to follow the exact lighting directions configured.
                </div>
                <button 
                    onClick={() => {
                        const promptExtracted = buildPromptString();
                        const stateObj = { az, el, intensity, ct, hard, fill, type, subject };
                        onSave(promptExtracted, stateObj);
                        onClose();
                    }}
                    className="bg-[#EF9F27] hover:bg-[#d88c1f] text-black font-bold uppercase tracking-wider text-[11px] px-6 py-2.5 rounded-lg transition-colors"
                >
                    Apply Directional Light Base
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
