// Moving spooks: ghosts, bats, the spider and green wisps.
import type { Grid } from "./config.js";
import { rng } from "./lib/rng.js";
import { animA, animT, f, pixelRects } from "./lib/svg.js";
import { BAT_DOWN, BAT_PAL, BAT_UP, GHOST, GHOST_PAL, SPIDER, SPIDER_PAL } from "./sprites.js";

export function ghost(x: number, y: number, dur: number, begin: number, flip = false): string {
  return `<g transform="translate(${x} ${y})"><g>${animT("translate", ["0 0", "36 -14", "72 0", "36 14", "0 0"], dur, { begin })}
    ${animA("opacity", [0.55, 0.9, 0.55], dur / 2, { begin })}
    <ellipse cx="24" cy="26" rx="40" ry="38" fill="url(#glowGhost)"/>
    ${pixelRects(GHOST, GHOST_PAL, 0, 0, 4, flip)}</g></g>`;
}

export function bat(path: string, dur: number, begin: number, scale = 3): string {
  const ox = -5.5 * scale, oy = -2.5 * scale;
  const frame = (g: Grid, first: boolean) =>
    `<g visibility="${first ? "visible" : "hidden"}">${animA("visibility", first ? ["visible", "hidden"] : ["hidden", "visible"], 0.4,
      { keyTimes: [0, 0.5], discrete: true })}${pixelRects(g, BAT_PAL, ox, oy, scale)}</g>`;
  return `<g><animateMotion path="${path}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>${frame(BAT_UP, true)}${frame(BAT_DOWN, false)}</g>`;
}

export function spider(x: number): string {
  return `<g>
    <line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#cfc6e0" stroke-opacity=".55" stroke-width="1">
      ${animA("y2", [30, 130, 30], 7, { keyTimes: [0, 0.5, 1] })}</line>
    <g>${animT("translate", ["0 28", "0 128", "0 28"], 7, { keyTimes: [0, 0.5, 1] })}
      <g transform="translate(${x - 10} 0)">${pixelRects(SPIDER, SPIDER_PAL, 0, 0, 3)}
        <rect x="6" y="3" width="3" height="3" fill="#ff2a2a"/><rect x="12" y="3" width="3" height="3" fill="#ff2a2a"/></g></g></g>`;
}

export function wisps(): string {
  const r = rng(77);
  let s = "";
  for (let i = 0; i < 9; i++) {
    const x = 40 + r() * 560, y = 215 + r() * 80, d = 4 + r() * 4;
    s += `<g transform="translate(${f(x)} ${f(y)})"><g>${animT("translate", ["0 0", `${f(r() * 24 - 12)} -14`, `${f(r() * 24 - 12)} 6`, "0 0"], d, { begin: -r() * 6 })}
      <circle r="9" fill="url(#glowGreen)">${animA("opacity", [0.2, 1, 0.2], d / 2, { begin: -r() * 3 })}</circle>
      <circle r="1.6" fill="#eaffd0"/></g></g>`;
  }
  return s;
}
