import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Copy, Sparkles, Ban, Eraser } from 'lucide-react';

export function hsvToHex(h: number, s: number, v: number): string {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  if (c.length !== 6) return { h: 40, s: 12, v: 82 };

  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const v = Math.round(max * 100);

  return { h, s, v };
}

interface CustomColorPickerProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  useCustomBackground: boolean;
  setUseCustomBackground: (use: boolean) => void;
  isBackgroundless?: boolean;
  setIsBackgroundless?: (val: boolean) => void;
  transparentCutoutStyle?: 'clean' | 'sticker' | 'feather';
  setTransparentCutoutStyle?: (val: 'clean' | 'sticker' | 'feather') => void;
  transparentTolerance?: number;
  setTransparentTolerance?: (val: number) => void;
}

const PRESET_SWATCHES = [
  { hex: '#D2C9B8', name: 'Sand (ESL Standard)' },
  { hex: '#FFFBEB', name: 'Vintage Cream' },
  { hex: '#F1F5F9', name: 'Alabaster' },
  { hex: '#E2F0D9', name: 'Soft Sage' },
  { hex: '#E0F2FE', name: 'Muted Sky' },
  { hex: '#FDE2E4', name: 'Pastel Blush' },
  { hex: '#FEF3C7', name: 'Warm Ochre' },
  { hex: '#E0E7FF', name: 'Soft Lavender' },
  { hex: '#989898', name: 'Slate Gray' },
  { hex: '#1E293B', name: 'Dark Slate' },
  { hex: '#FFFFFF', name: 'Pure White' },
];

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  backgroundColor,
  setBackgroundColor,
  useCustomBackground,
  setUseCustomBackground,
  isBackgroundless = false,
  setIsBackgroundless,
  transparentCutoutStyle = 'clean',
  setTransparentCutoutStyle,
  transparentTolerance = 32,
  setTransparentTolerance
}) => {
  const [copied, setCopied] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(backgroundColor));
  const hsvRef = useRef(hsv);
  hsvRef.current = hsv;
  const [isExpanded, setIsExpanded] = useState(false);

  const satBoxRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);

  // Sync HSV state if external backgroundColor changes and does not match current HSV hex
  useEffect(() => {
    const currentHex = hsvToHex(hsvRef.current.h, hsvRef.current.s, hsvRef.current.v);
    if (currentHex.toUpperCase() !== backgroundColor.toUpperCase()) {
      const nextHsv = hexToHsv(backgroundColor);
      setHsv(nextHsv);
    }
  }, [backgroundColor]);

  const handleCopyHex = () => {
    navigator.clipboard.writeText(backgroundColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // 2D Saturation / Value Box Drag Handler
  const updateSatValFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!satBoxRef.current) return;
    const rect = satBoxRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);

    const newHsv = { ...hsvRef.current, s, v };
    setHsv(newHsv);
    setBackgroundColor(hsvToHex(newHsv.h, newHsv.s, newHsv.v));
  };

  const handleSatMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    updateSatValFromEvent(e);

    const onMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
      updateSatValFromEvent(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
  };

  // Hue Bar Drag Handler
  const updateHueFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!hueBarRef.current) return;
    const rect = hueBarRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const h = Math.round((x / rect.width) * 360) % 360;

    const newHsv = { ...hsvRef.current, h };
    setHsv(newHsv);
    setBackgroundColor(hsvToHex(newHsv.h, newHsv.s, newHsv.v));
  };

  const handleHueMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    updateHueFromEvent(e);

    const onMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
      updateHueFromEvent(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
  };

  const pureHueHex = hsvToHex(hsv.h, 100, 100);

  return (
    <div className="pt-2 border-t border-slate-800 space-y-2">
      {/* Header & Main Toggle */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
          <Palette className="w-2.5 h-2.5 text-fuchsia-400" /> Canvas Background Engine
        </label>
        
        {/* 3-Way Toggle Button */}
        <div className="flex items-center gap-1 bg-[#090d16] p-0.5 rounded border border-[#1e293b]">
          <button
            type="button"
            onClick={() => {
              setUseCustomBackground(false);
              setIsBackgroundless?.(false);
            }}
            className={`px-2 py-0.5 text-[8.5px] font-bold rounded transition-all flex items-center gap-1 ${
              !useCustomBackground && !isBackgroundless
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Ban className="w-2.5 h-2.5" /> Natural
          </button>
          <button
            type="button"
            onClick={() => {
              setUseCustomBackground(true);
              setIsBackgroundless?.(false);
            }}
            className={`px-2 py-0.5 text-[8.5px] font-bold rounded transition-all flex items-center gap-1 ${
              useCustomBackground && !isBackgroundless
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" /> Solid Color
          </button>
          <button
            type="button"
            onClick={() => {
              setIsBackgroundless?.(true);
            }}
            className={`px-2 py-0.5 text-[8.5px] font-bold rounded transition-all flex items-center gap-1 ${
              isBackgroundless
                ? 'bg-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                : 'text-emerald-400/80 hover:text-emerald-300'
            }`}
            title="Isolate subject on pure transparent PNG"
          >
            <Eraser className="w-2.5 h-2.5" /> Backgroundless (PNG)
          </button>
        </div>
      </div>

      {/* When Backgroundless is ON: ALWAYS overrides everything, even if custom background was selected! */}
      {isBackgroundless ? (
        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[9px] text-emerald-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300">
              <Eraser className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Backgroundless Active (Overrides Background Color)</span>
            </div>
            <span className="text-[7.5px] bg-emerald-900/90 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold tracking-wide">
              TRANSPARENT PNG
            </span>
          </div>
          <p className="text-[8px] text-emerald-300/80 leading-relaxed font-normal">
            Any selected canvas color is bypassed. The subject will be synthesized on pure studio void with zero ground shadow and exported as a transparent <span className="font-mono text-emerald-300">.png</span>.
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-emerald-900/50">
            <div className="flex items-center gap-1">
              <span className="text-[7.5px] text-emerald-400/80 uppercase font-bold">Edge:</span>
              {(['clean', 'sticker', 'feather'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setTransparentCutoutStyle?.(style)}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-semibold capitalize transition-all ${
                    transparentCutoutStyle === style
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-[#0b0f19] text-emerald-300/70 border border-emerald-900/40 hover:border-emerald-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[7.5px] text-emerald-400/80 uppercase font-bold">Tol:</span>
              {[22, 32, 48].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransparentTolerance?.(t)}
                  className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold transition-all ${
                    transparentTolerance === t
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-[#0b0f19] text-emerald-300/70 border border-emerald-900/40 hover:border-emerald-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : !useCustomBackground ? (
        /* When Custom Background is OFF and Backgroundless is OFF */
        <div className="p-2 rounded bg-[#0b0f19] border border-slate-800 text-[8.5px] text-slate-400 flex items-center justify-between">
          <span className="italic">Natural studio background active (no color forced).</span>
          <button
            type="button"
            onClick={() => setUseCustomBackground(true)}
            className="text-fuchsia-400 font-bold hover:underline ml-2 uppercase text-[8px]"
          >
            Enable Solid Color
          </button>
        </div>
      ) : (
        /* When Custom Background is ON */
        <div className="space-y-2.5 bg-[#080c14] p-2.5 rounded-lg border border-[#1e293b]">
          {/* Swatches Bar */}
          <div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              ESL Palette Presets
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_SWATCHES.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  onClick={() => {
                    setBackgroundColor(swatch.hex);
                    setHsv(hexToHsv(swatch.hex));
                  }}
                  title={swatch.name}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    backgroundColor.toUpperCase() === swatch.hex.toUpperCase()
                      ? 'border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                      : 'border-white/20 hover:border-white/50 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>
          </div>

          {/* Color Preview & Hex Controls */}
          <div className="flex items-center justify-between gap-2 bg-[#0d1321] p-2 rounded border border-[#1e293b]">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded border border-white/20 shadow-inner shrink-0"
                style={{ backgroundColor }}
              />
              <div>
                <div className="text-[10px] font-mono font-bold text-white flex items-center gap-1">
                  {backgroundColor}
                </div>
                <div className="text-[8px] text-slate-400">
                  HSV: {hsv.h}°, {hsv.s}%, {hsv.v}%
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyHex}
                title="Copy HEX Code"
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-[8px] font-bold flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-2 py-1 rounded bg-fuchsia-900/50 hover:bg-fuchsia-800/60 text-fuchsia-200 border border-fuchsia-700/50 text-[8px] font-bold uppercase tracking-wider transition-all"
              >
                {isExpanded ? 'Hide Spectrum' : 'Full Spectrum'}
              </button>
            </div>
          </div>

          {/* Custom Full Range Spectrum Picker (2D Box + Rainbow Hue Slider) */}
          {isExpanded && (
            <div className="space-y-2 pt-1">
              {/* 2D Saturation / Value Area */}
              <div className="relative">
                <div
                  ref={satBoxRef}
                  onMouseDown={handleSatMouseDown}
                  onTouchStart={handleSatMouseDown}
                  className="w-full h-28 rounded relative cursor-crosshair overflow-hidden select-none border border-white/10"
                  style={{ backgroundColor: pureHueHex }}
                >
                  {/* Saturation White Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
                  {/* Value Black Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                  {/* Selector Cursor Handle */}
                  <div
                    className="absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${hsv.s}%`,
                      top: `${100 - hsv.v}%`,
                      backgroundColor
                    }}
                  />
                </div>
                <div className="flex justify-between text-[7px] text-slate-400 font-mono mt-0.5 px-0.5">
                  <span>Saturation ◄ ►</span>
                  <span>Brightness ▲ ▼</span>
                </div>
              </div>

              {/* Rainbow Hue Bar Slider */}
              <div className="space-y-0.5">
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Hue Spectrum</div>
                <div
                  ref={hueBarRef}
                  onMouseDown={handleHueMouseDown}
                  onTouchStart={handleHueMouseDown}
                  className="w-full h-4 rounded relative cursor-pointer select-none border border-white/10 overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
                  }}
                >
                  {/* Hue Handle Indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-2.5 bg-white border border-black shadow-[0_0_3px_rgba(0,0,0,0.9)] -translate-x-1/2 rounded-sm pointer-events-none"
                    style={{ left: `${(hsv.h / 360) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
