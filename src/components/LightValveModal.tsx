import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sun } from 'lucide-react';

interface LightValveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (azimuth: string, altitude: string, tension: string, lumens: string, beamAngle: string, intensity: string, colorTemp: string, modifiers: string[]) => void;
  initialAzimuth: string;
  initialAltitude: string;
  initialTension: string;
  initialLumens: string;
  initialBeamAngle: string;
  initialIntensity: string;
  initialColorTemp: string;
  initialModifiers: string[];
}

export function LightValveModal({ isOpen, onClose, onSave, initialAzimuth, initialAltitude, initialTension, initialLumens, initialBeamAngle, initialIntensity, initialColorTemp, initialModifiers }: LightValveModalProps) {
  const valveRef = useRef<HTMLDivElement>(null);
  
  const [azimuth, setAzimuth] = useState(initialAzimuth || '180');
  const [altitude, setAltitude] = useState(initialAltitude || '45');
  const [tension, setTension] = useState(initialTension || '0.82');
  const [lumens, setLumens] = useState(initialLumens || '1200');
  const [beamAngle, setBeamAngle] = useState(initialBeamAngle || '360');
  const [intensity, setIntensity] = useState(initialIntensity || '75');
  const [colorTemp, setColorTemp] = useState(initialColorTemp || '5600');
  const [activeModifiers, setActiveModifiers] = useState<string[]>(initialModifiers || []);

  const kelvinToRGB = (k: number) => {
    const temp = k / 100;
    let r, g, b;

    if (temp <= 66) {
      r = 255;
      g = Math.max(0, Math.min(255, 99.4708025861 * Math.log(temp) - 161.1195681661 || 0));
      b = temp <= 19 ? 0 : Math.max(0, Math.min(255, 138.5177312231 * Math.log(temp - 10) - 305.0447927307 || 0));
    } else {
      r = Math.max(0, Math.min(255, 329.698727446 * Math.pow(temp - 60, -0.1332047592) || 0));
      g = Math.max(0, Math.min(255, 288.1221695283 * Math.pow(temp - 60, -0.0755148492) || 0));
      b = 255;
    }
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${parseFloat(intensity) / 100})`;
  };
  
  const lightColor = kelvinToRGB(parseInt(colorTemp));

  const allModifiers = [
    "Rembrandt", "Beauty dish", "Dramatic", "Backlit", "Overhead", "Split", 
    "Key light", "Fill light", "Rim light", "Softbox", "Spotlight", "Practical"
  ];

  const toggleModifier = (mod: string) => {
    setActiveModifiers(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
  };

  const [xPct, setXPct] = useState('50%');
  const [yPct, setYPct] = useState('50%');
  const [angleDeg, setAngleDeg] = useState('0deg');
    const updatePosition = (clientX: number, clientY: number) => {
    if (!valveRef.current) return;
    const rect = valveRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let dx = clientX - centerX;
    let dy = clientY - centerY;
    
    let distance = Math.sqrt(dx * dx + dy * dy);
    const radius = rect.width / 2;
    
    if (distance > radius) {
        const angle = Math.atan2(dy, dx);
        dx = Math.cos(angle) * radius;
        dy = Math.sin(angle) * radius;
        distance = radius;
    }

    const x = ((dx + radius) / rect.width) * 100;
    const y = ((dy + radius) / rect.height) * 100;
    
    let azCalc = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (azCalc < 0) azCalc += 360;
    const angle = azCalc.toFixed(0);

    const d = distance / radius;
    const alt = (90 - (d * 90)).toFixed(0);
    const tens = (d * 10).toFixed(1);
    const lum = Math.floor(1200 + (d * 4800)).toString();

    setXPct(`${x}%`);
    setYPct(`${y}%`);
    setAngleDeg(`${angle}deg`);
    
    setAzimuth(angle);
    setAltitude(alt);
    setTension(tens);
    setLumens(lum);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click dragged
      updatePosition(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[-1]" 
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")' }} />
               
          <svg className="absolute w-0 h-0">
              <defs>
                  <filter id="gooey-warp">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                  </filter>
              </defs>
          </svg>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#050505] rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 max-w-5xl w-full max-h-[92vh] overflow-y-auto flex flex-col items-center justify-between"
          >
            <div className="w-full flex gap-8 items-center justify-between mb-16">
              <button
                onClick={() => {
                    onSave(azimuth, altitude, tension, lumens, beamAngle, intensity, colorTemp, activeModifiers);
                    onClose();
                }}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>
  
              {/* Left HUD */}
              <div className="flex flex-col gap-8 z-10 w-48 shrink-0">
                  <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Azimuth (Position)</p>
                      <div className="text-5xl font-black tabular-nums text-white leading-none">{azimuth}°</div>
                  </div>
                  <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Altitude (Angle)</p>
                      <div className="text-5xl font-black tabular-nums text-white leading-none">{altitude}°</div>
                  </div>
              </div>
  
              {/* Center Valve */}
              <div 
                  ref={valveRef}
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                  onTouchMove={handleTouchMove}
                  onTouchStart={(e) => updatePosition(e.touches[0].clientX, e.touches[0].clientY)}
                  className="relative w-full max-w-[400px] aspect-square flex items-center justify-center cursor-crosshair mx-auto"
              >
                  <div className="absolute -inset-10 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-10 rounded-full border border-dashed border-white/10 pointer-events-none" style={{ transform: `rotate(${angleDeg})` }} />
                  
                  <div 
                      className="absolute w-full h-full rounded-full transition-[background] duration-100 ease-out border border-white/5"
                      style={{
                          background: `radial-gradient(circle at ${xPct} ${yPct}, ${lightColor} 0%, rgba(0,0,0,0) ${Math.max(10, (parseInt(beamAngle) / 360) * 80)}%), #121212`,
                          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)',
                          filter: 'url(#gooey-warp)'
                      }}
                  />
                  
                  <div 
                      className="absolute w-px h-[100px] pointer-events-none opacity-20 origin-top transition-all duration-100"
                      style={{
                          background: `linear-gradient(to top, ${lightColor.replace(/[^,]+(?=\))/, '1')}, transparent)`,
                          left: xPct,
                          top: yPct,
                          transform: `translate(-50%, 0) rotate(calc(${angleDeg} + 180deg))`
                      }}
                  />
                  
                  <div 
                      className="absolute w-20 h-20 bg-white rounded-full pointer-events-none mix-blend-overlay z-10 transition-all duration-100"
                      style={{
                          left: xPct,
                          top: yPct,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: `0 0 30px ${lightColor.replace(/[^,]+(?=\))/, '0.4')}, 0 0 100px ${lightColor.replace(/[^,]+(?=\))/, '0.1')}`,
                          backgroundColor: lightColor.replace(/[^,]+(?=\))/, '0.8')
                      }}
                  />
                  
                  <div 
                      className="absolute w-3 h-3 bg-white rounded-full pointer-events-none z-20"
                      style={{
                          left: xPct,
                          top: yPct,
                          transform: 'translate(-50%, -50%)'
                      }}
                  />
              </div>
  
              {/* Right HUD */}
              <div className="flex flex-col gap-8 z-10 text-right w-48 shrink-0">
                  <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Radial Proximity</p>
                      <div className="text-5xl font-black tabular-nums text-white leading-none">{tension}m</div>
                  </div>
                  <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Source Lumens</p>
                      <div className="text-5xl font-black tabular-nums text-white leading-none">{lumens}lm</div>
                  </div>
                  <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">Beam Spread ({beamAngle}°)</p>
                      <input 
                          type="range" 
                          min="10" max="360" 
                          value={beamAngle} 
                          onChange={(e) => setBeamAngle(e.target.value)}
                          className="w-full accent-white h-1 bg-white/20 rounded-full appearance-none outline-none mt-2"
                          title="Narrow flashlight vs Omnidirectional light"
                      />
                  </div>
              </div>
            </div>

            <div className="w-full flex justify-center gap-16 px-8 mb-8 z-10 max-w-3xl">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2 font-mono">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40">Intensity</p>
                        <p className="text-sm font-bold text-white/90">{intensity}%</p>
                    </div>
                    <input 
                        type="range" 
                        min="1" max="100" 
                        value={intensity} 
                        onChange={(e) => setIntensity(e.target.value)}
                        className="w-full accent-white h-1 bg-white/20 rounded-full appearance-none outline-none"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2 font-mono">
                        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/40">Color Temp</p>
                        <p className="text-sm font-bold text-white/90">{colorTemp} K</p>
                    </div>
                    <input 
                        type="range" 
                        min="2000" max="10000" step="100"
                        value={colorTemp} 
                        onChange={(e) => setColorTemp(e.target.value)}
                        className="w-full accent-[#fdba74] h-1 bg-gradient-to-r from-orange-500 via-white to-blue-400 rounded-full appearance-none outline-none"
                    />
                </div>
            </div>

            <div className="w-full flex justify-center flex-wrap gap-2 px-8 mb-4">
              {allModifiers.map(mod => (
                <button
                  key={mod}
                  onClick={() => toggleModifier(mod)}
                  className={`px-4 py-2 font-medium rounded-xl border text-sm transition-all ${
                    activeModifiers.includes(mod) 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>

            <div className="w-full mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-4">
                <div className="font-black text-xl tracking-tighter text-white">FLASH UI // LIGHT VALVE</div>
                <div className="px-3 py-1.5 bg-white/5 rounded-full font-mono text-[0.6rem] flex items-center gap-2 text-white/80 border border-white/10">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] animate-pulse" />
                  NEURAL ENGINE ACTIVE
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSave(azimuth, altitude, tension, lumens, beamAngle, intensity, colorTemp, activeModifiers);
                  onClose();
                }}
                className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Confirm Light Focus
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
