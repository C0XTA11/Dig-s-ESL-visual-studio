const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

// Find imports and add useState if not there, but React is imported as: import React, { useState, useEffect, useRef } from 'react';
// We just need to add the state variables inside App function.
let appIndex = lines.findIndex(l => l.includes('function App() {'));

// find where to add state
const stateInsertIndex = appIndex + 1;

const stateCode = `
  const [hoveredModeId, setHoveredModeId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredModeId) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };
`;

lines.splice(stateInsertIndex, 0, stateCode);

// now we need to add the onMouseEnter, onMouseLeave, onMouseMove to the buttons
// We will replace the mapping code for eslModes and creativeModes

const replaceCategory = (categoryName) => {
  let startIndex = -1;
  let endIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`{${categoryName}.map((mode) => (`)) {
      startIndex = i;
    }
    if (startIndex !== -1 && lines[i].includes(`))} `) || (startIndex !== -1 && lines[i].includes(`))}`) && !lines[i].includes(`map`))) {
       endIndex = i;
       break;
    }
  }
  return {startIndex, endIndex};
}

let eslRange = replaceCategory('eslModes');
// Need to find it more robustly. Let's do it via regex replace on the entire content instead.

