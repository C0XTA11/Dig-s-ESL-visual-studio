const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

// Find the start of the `if (finalMode === 'photo') {` block
const startIndex = lines.findIndex(l => l.includes("if (finalMode === 'photo') {"));
const endIndex = lines.findIndex(l => l.includes("const distanceDesc = "));

console.log("Start", startIndex, "End", endIndex);
