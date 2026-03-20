#!/usr/bin/env node
/**
 * Generate pixel-art SVG icons for all 14 projects.
 * Each icon is a 16x16 grid rendered at 64x64 (4x4 per pixel).
 * Monochrome: #1A1A1A on transparent.
 */

const fs = require('fs');
const path = require('path');

const GRID = 16;
const SCALE = 4;
const SIZE = GRID * SCALE; // 64
const COLOR = '#1A1A1A';

function gridToSvg(grid) {
  const rects = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (grid[y][x]) {
        rects.push(`<rect x="${x * SCALE}" y="${y * SCALE}" width="${SCALE}" height="${SCALE}" fill="${COLOR}"/>`);
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">\n${rects.join('\n')}\n</svg>`;
}

// Helper: create empty 16x16 grid
function empty() {
  return Array.from({ length: GRID }, () => Array(GRID).fill(0));
}

// Helper: set pixels from coordinate list
function pixels(coords) {
  const g = empty();
  for (const [x, y] of coords) {
    if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  }
  return g;
}

// Helper: draw a filled rectangle
function fillRect(g, x1, y1, x2, y2) {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++)
      if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  return g;
}

// Helper: draw rectangle outline
function strokeRect(g, x1, y1, x2, y2) {
  for (let x = x1; x <= x2; x++) { g[y1][x] = 1; g[y2][x] = 1; }
  for (let y = y1; y <= y2; y++) { g[y][x1] = 1; g[y][x2] = 1; }
  return g;
}

// Helper: draw a circle outline (midpoint)
function strokeCircle(g, cx, cy, r) {
  for (let a = 0; a < 360; a += 2) {
    const rad = (a * Math.PI) / 180;
    const x = Math.round(cx + r * Math.cos(rad));
    const y = Math.round(cy + r * Math.sin(rad));
    if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  }
  return g;
}

// Helper: fill circle
function fillCircle(g, cx, cy, r) {
  for (let y = 0; y < GRID; y++)
    for (let x = 0; x < GRID; x++)
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r ** 2)
        if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  return g;
}

// Helper: horizontal line
function hLine(g, x1, x2, y) {
  for (let x = x1; x <= x2; x++) if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  return g;
}

// Helper: vertical line
function vLine(g, x, y1, y2) {
  for (let y = y1; y <= y2; y++) if (x >= 0 && x < GRID && y >= 0 && y < GRID) g[y][x] = 1;
  return g;
}

// ─── Icon Definitions ───────────────────────────────────────────────────────

const icons = {};

// 1. shaberu — Speech bubble
icons['shaberu'] = (() => {
  const g = empty();
  // Rounded rectangle bubble body
  hLine(g, 4, 12, 2);
  hLine(g, 3, 13, 3);
  for (let y = 4; y <= 9; y++) { g[y][3] = 1; g[y][13] = 1; }
  hLine(g, 3, 13, 10);
  hLine(g, 4, 12, 11);
  // Fill interior
  for (let y = 3; y <= 10; y++)
    for (let x = 4; x <= 12; x++) g[y][x] = 1;
  // Clear interior to make outline
  for (let y = 4; y <= 9; y++)
    for (let x = 5; x <= 11; x++) g[y][x] = 0;
  // Tail
  g[12][5] = 1; g[12][6] = 1;
  g[13][4] = 1; g[13][5] = 1;
  g[14][3] = 1;
  // Dots inside bubble to suggest text
  g[6][6] = 1; g[6][8] = 1; g[6][10] = 1;
  return g;
})();

// 2. campus-reach — Globe
icons['campus-reach'] = (() => {
  const g = empty();
  strokeCircle(g, 8, 8, 6);
  // Horizontal lines
  hLine(g, 2, 14, 8);
  hLine(g, 4, 12, 5);
  hLine(g, 4, 12, 11);
  // Vertical center
  vLine(g, 8, 2, 14);
  // Curved vertical lines for longitude
  vLine(g, 6, 3, 13);
  vLine(g, 10, 3, 13);
  return g;
})();

// 3. translate-practice — Two overlapping rectangles
icons['translate-practice'] = (() => {
  const g = empty();
  // Back rectangle (offset)
  strokeRect(g, 5, 1, 14, 9);
  // Front rectangle
  strokeRect(g, 1, 5, 10, 13);
  // Fill front rect background (clear overlap)
  for (let y = 6; y <= 12; y++)
    for (let x = 2; x <= 9; x++) g[y][x] = 0;
  strokeRect(g, 1, 5, 10, 13);
  // "A" in back rect
  g[3][8] = 1; g[4][7] = 1; g[4][9] = 1; g[5][7] = 1; g[5][8] = 1; g[5][9] = 1; g[6][7] = 1; g[6][9] = 1;
  // Dots suggesting "あ" in front rect
  g[8][4] = 1; g[8][5] = 1; g[8][6] = 1;
  g[9][7] = 1; g[10][5] = 1; g[10][6] = 1;
  g[11][4] = 1; g[11][7] = 1;
  return g;
})();

// 4. greek-word-explorer — Alpha symbol (Α shape)
icons['greek-word-explorer'] = (() => {
  const g = empty();
  // Large alpha/A shape
  // Top point
  g[2][7] = 1; g[2][8] = 1;
  // Sides spreading down
  g[3][6] = 1; g[3][9] = 1;
  g[4][5] = 1; g[4][10] = 1;
  g[5][5] = 1; g[5][10] = 1;
  g[6][4] = 1; g[6][11] = 1;
  // Crossbar
  hLine(g, 4, 11, 7);
  g[8][4] = 1; g[8][11] = 1;
  g[9][3] = 1; g[9][12] = 1;
  g[10][3] = 1; g[10][12] = 1;
  g[11][3] = 1; g[11][12] = 1;
  g[12][2] = 1; g[12][13] = 1;
  g[13][2] = 1; g[13][13] = 1;
  return g;
})();

// 5. n2-visual-vocab — Flashcard
icons['n2-visual-vocab'] = (() => {
  const g = empty();
  strokeRect(g, 2, 2, 13, 13);
  // Divider line
  hLine(g, 2, 13, 7);
  // Dots in top half suggesting text
  hLine(g, 5, 10, 4);
  // Dots in bottom half
  g[10][5] = 1; g[10][6] = 1; g[10][7] = 1;
  g[10][9] = 1; g[10][10] = 1;
  return g;
})();

// 6. halfway — Book/journal with center line
icons['halfway'] = (() => {
  const g = empty();
  // Book outline
  strokeRect(g, 2, 1, 13, 14);
  // Center spine
  vLine(g, 7, 1, 14);
  vLine(g, 8, 1, 14);
  // Page lines left
  hLine(g, 4, 6, 4);
  hLine(g, 4, 6, 6);
  hLine(g, 4, 6, 8);
  // Page lines right
  hLine(g, 9, 12, 4);
  hLine(g, 9, 12, 6);
  hLine(g, 9, 12, 8);
  return g;
})();

// 7. ism-journey-map — Map with dotted path
icons['ism-journey-map'] = (() => {
  const g = empty();
  strokeRect(g, 1, 1, 14, 14);
  // Zigzag/dotted path across the map
  g[4][3] = 1; g[4][4] = 1;
  g[5][5] = 1; g[5][6] = 1;
  g[6][7] = 1;
  g[7][8] = 1; g[7][9] = 1;
  g[8][10] = 1;
  g[9][9] = 1;
  g[10][8] = 1; g[10][7] = 1;
  g[11][6] = 1;
  g[12][7] = 1; g[12][8] = 1;
  // Start marker
  fillCircle(g, 3, 4, 1);
  // End marker
  fillCircle(g, 9, 12, 1);
  return g;
})();

// 8. common-lore — Playing card with diamond
icons['common-lore'] = (() => {
  const g = empty();
  strokeRect(g, 3, 1, 12, 14);
  // Diamond shape in center
  g[5][7] = 1; g[5][8] = 1;
  g[6][6] = 1; g[6][9] = 1;
  g[7][5] = 1; g[7][10] = 1;
  g[8][5] = 1; g[8][10] = 1;
  g[9][6] = 1; g[9][9] = 1;
  g[10][7] = 1; g[10][8] = 1;
  // Corner marks
  g[3][5] = 1;
  g[12][10] = 1;
  return g;
})();

// 9. global-atlas — Dice with dots
icons['global-atlas'] = (() => {
  const g = empty();
  strokeRect(g, 2, 2, 13, 13);
  // 5-pip dice face
  fillCircle(g, 5, 5, 1);    // top-left
  fillCircle(g, 10, 5, 1);   // top-right
  fillCircle(g, 7, 7, 1);    // center (using 7 instead of 7.5)
  fillCircle(g, 8, 8, 1);    // center companion
  fillCircle(g, 5, 10, 1);   // bottom-left
  fillCircle(g, 10, 10, 1);  // bottom-right
  return g;
})();

// 10. workout-buddy — Dumbbell
icons['workout-buddy'] = (() => {
  const g = empty();
  // Left weight
  fillRect(g, 1, 4, 3, 11);
  fillRect(g, 4, 5, 4, 10);
  // Bar
  fillRect(g, 5, 7, 10, 8);
  // Right weight
  fillRect(g, 11, 5, 11, 10);
  fillRect(g, 12, 4, 14, 11);
  return g;
})();

// 11. mu-sentiment — Musical note
icons['mu-sentiment'] = (() => {
  const g = empty();
  // Note head (filled circle)
  fillCircle(g, 5, 11, 2);
  // Stem
  vLine(g, 7, 3, 11);
  // Flag
  g[3][8] = 1; g[3][9] = 1; g[3][10] = 1;
  g[4][10] = 1; g[4][11] = 1;
  g[5][11] = 1;
  g[6][10] = 1; g[6][11] = 1;
  g[7][9] = 1; g[7][10] = 1;
  return g;
})();

// 12. merror — Face with frame
icons['merror'] = (() => {
  const g = empty();
  // Frame outline
  strokeRect(g, 1, 1, 14, 14);
  // Inner face outline
  strokeRect(g, 3, 3, 12, 12);
  // Eyes (two dots)
  g[6][6] = 1; g[6][7] = 1;
  g[6][9] = 1; g[6][10] = 1;
  // Smile arc
  g[9][5] = 1;
  g[10][6] = 1; g[10][7] = 1; g[10][8] = 1; g[10][9] = 1; g[10][10] = 1;
  g[9][11] = 1;
  return g;
})();

// 13. jazz — Guitar (figure-8 body + neck)
icons['jazz'] = (() => {
  const g = empty();
  // Upper body (smaller circle)
  strokeCircle(g, 8, 4, 3);
  // Lower body (larger circle)
  strokeCircle(g, 8, 11, 4);
  // Neck line
  vLine(g, 8, 1, 2);
  // Sound hole
  g[11][8] = 1;
  // Waist connections (narrow middle)
  g[7][6] = 1; g[7][10] = 1;
  g[8][6] = 1; g[8][10] = 1;
  return g;
})();

// 14. interview-koro — Microphone
icons['interview-koro'] = (() => {
  const g = empty();
  // Mic head (circle)
  strokeCircle(g, 8, 4, 3);
  // Fill mic head slightly
  fillCircle(g, 8, 4, 2);
  // Stem
  vLine(g, 8, 7, 11);
  // Base
  hLine(g, 5, 11, 12);
  hLine(g, 6, 10, 13);
  // Grille lines on mic head
  g[3][7] = 0; g[3][9] = 0;
  g[5][7] = 0; g[5][9] = 0;
  return g;
})();

// ─── Generate SVG files ─────────────────────────────────────────────────────

const outDir = path.join(__dirname, '..', 'public', 'icons');

for (const [name, grid] of Object.entries(icons)) {
  const svg = gridToSvg(grid);
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`  ✓ ${name}.svg`);
}

console.log(`\nGenerated ${Object.keys(icons).length} icons in ${outDir}`);
