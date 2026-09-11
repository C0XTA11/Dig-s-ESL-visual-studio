const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

// 1. Insert State variables
let appIndex = lines.findIndex(l => l.includes('function App() {'));
lines.splice(appIndex + 1, 0, `
  const [hoveredMode, setHoveredMode] = useState<{label: string, description: string} | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
`);

// 2. Add event handlers to eslModes buttons
let newContent = lines.join('\n');
newContent = newContent.replace(
  /<button\n\s*key=\{mode\.id\}\n\s*onClick=\{\(\) => setGenerationMode\(mode\.id as any\)\}\n\s*className=\{`/g,
  `<button
                                  key={mode.id}
                                  onClick={() => setGenerationMode(mode.id as any)}
                                  onMouseEnter={() => setHoveredMode({ label: mode.label, description: mode.description })}
                                  onMouseLeave={() => setHoveredMode(null)}
                                  onMouseMove={handleMouseMove}
                                  className={\``
);

// 3. Add the fixed tooltip element
const tooltipHTML = `
      <AnimatePresence>
        {hoveredMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[9999] pointer-events-none bg-[#1e293b] text-slate-200 text-xs px-3 py-2.5 rounded-lg shadow-2xl border border-slate-700/80 max-w-[220px]"
            style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
          >
            <div className="font-bold text-[10px] uppercase tracking-wider text-cyan-400 mb-1">{hoveredMode.label}</div>
            <div className="leading-tight opacity-90">{hoveredMode.description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;
newContent = newContent.replace(/    <\/div>\n  \);\n}\n$/g, tooltipHTML);

fs.writeFileSync('src/App.tsx', newContent);
