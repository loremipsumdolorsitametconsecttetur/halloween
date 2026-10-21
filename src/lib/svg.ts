// Low-level SVG/SMIL helpers: number formatting, <animate> builders and pixel-art rendering.
import { DUR, type Grid, type Interval, type Palette } from "../config.js";

export const f = (n: number) => +n.toFixed(3);

export const kt = (k?: number[]) => (k ? `keyTimes="${k.map(f).join(";")}" ` : "");
export const bg = (b?: number) => (b !== undefined ? `begin="${b}s" ` : "");

export const animT = (type: string, vals: string[], dur: number, o: { keyTimes?: number[]; begin?: number } = {}) =>
  `<animateTransform attributeName="transform" type="${type}" values="${vals.join(";")}" ${kt(o.keyTimes)}dur="${dur}s" ${bg(o.begin)}repeatCount="indefinite"/>`;

export const animA = (attr: string, vals: (string | number)[], dur: number,
  o: { keyTimes?: number[]; begin?: number; discrete?: boolean } = {}) =>
  `<animate attributeName="${attr}" values="${vals.join(";")}" ${kt(o.keyTimes)}${o.discrete ? 'calcMode="discrete" ' : ""}dur="${dur}s" ${bg(o.begin)}repeatCount="indefinite"/>`;

/** Run-length-merged pixel rects from a string grid ('.' = transparent). */
export function pixelRects(grid: Grid, pal: Palette, ox: number, oy: number, cell: number, flip = false): string {
  const w = grid[0].length;
  let out = "";
  grid.forEach((row, y) => {
    for (let x = 0; x < w; ) {
      const c = row[x];
      if (c === "." || !pal[c]) { x++; continue; }
      let e = x;
      while (e < w && row[e] === c) e++;
      const rx = flip ? w - e : x;
      out += `<rect x="${ox + rx * cell}" y="${oy + y * cell}" width="${(e - x) * cell}" height="${cell}" fill="${pal[c]}"/>`;
      x = e;
    }
  });
  return `<g shape-rendering="crispEdges">${out}</g>`;
}
export const withRows = (g: Grid, rows: Record<number, string>): Grid => g.map((r, i) => rows[i] ?? r);
export const inAny = (iv: Interval[], t: number) => iv.some(([a, b]) => t >= a && t < b);

/** Discrete show/hide animation driven by a predicate over t∈[0,1). */
export function visibilityAnim(on: (t: number) => boolean, edges: number[]): string {
  const ts = [...new Set([0, ...edges.filter((e) => e > 0 && e < 1)])].sort((a, b) => a - b);
  const vals = ts.map((t, i) => (on((t + (ts[i + 1] ?? 1)) / 2) ? "visible" : "hidden"));
  if (ts.length === 1) return animA("visibility", [vals[0], vals[0]], DUR, { keyTimes: [0, 1], discrete: true });
  return animA("visibility", vals, DUR, { keyTimes: ts, discrete: true });
}

export function hopAnim(jumps: Interval[], height: number): string {
  const pts: [number, number][] = [[0, 0]];
  for (const [a, b] of [...jumps].sort((p, q) => p[0] - q[0])) pts.push([a, 0], [(a + b) / 2, -height], [b, 0]);
  pts.push([1, 0]);
  return animT("translate", pts.map((p) => `0 ${p[1]}`), DUR, { keyTimes: pts.map((p) => p[0]) });
}
