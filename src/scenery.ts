// Static-ish landscape: stars, moon, clouds, hills, haunted house, trees, tombstones, fog.
import { W } from "./config.js";
import { rng } from "./lib/rng.js";
import { animA, animT, f, pixelRects } from "./lib/svg.js";
import { TOMB, TOMB_PAL } from "./sprites.js";

export function stars(): string {
  const r = rng(13);
  let s = "";
  for (let i = 0; i < 70; i++) {
    const x = r() * W, y = r() * 190, big = r() > 0.85;
    s += `<rect x="${f(x)}" y="${f(y)}" width="${big ? 2 : 1}" height="${big ? 2 : 1}" fill="#fff">` +
      animA("opacity", [0.2, 1, 0.2], 2 + r() * 3, { begin: -r() * 5 }) + `</rect>`;
  }
  return s;
}

export function moon(): string {
  const cx = 520, cy = 80;
  return `<circle cx="${cx}" cy="${cy}" r="120" fill="url(#moonGlow)"/>
  <circle cx="${cx}" cy="${cy}" r="42" fill="#f6e7b0"/>
  <circle cx="${cx - 14}" cy="${cy - 10}" r="8" fill="#dccb92"/><circle cx="${cx + 12}" cy="${cy + 12}" r="11" fill="#dccb92"/>
  <circle cx="${cx + 16}" cy="${cy - 18}" r="5" fill="#dccb92"/>`;
}

export function clouds(): string {
  const mk = (y: number, sc: number, dur: number, begin: number, op: number) =>
    `<g opacity="${op}"><g transform="translate(0 ${y}) scale(${sc})">` +
    `<ellipse cx="0" cy="0" rx="70" ry="14" fill="#2b1a45"/><ellipse cx="-30" cy="-8" rx="36" ry="12" fill="#2b1a45"/>` +
    `<ellipse cx="25" cy="-10" rx="40" ry="13" fill="#34205a"/>${animT("translate", ["-250 0", "900 0"], dur, { begin })}</g></g>`;
  // translate animation lives on the inner group's transform, so wrap separately:
  const wrap = (y: number, sc: number, dur: number, begin: number, op: number) =>
    `<g opacity="${op}"><g transform="translate(0 ${y}) scale(${sc})"><g>` +
    `<ellipse cx="0" cy="0" rx="70" ry="14" fill="#2b1a45"/><ellipse cx="-30" cy="-8" rx="36" ry="12" fill="#2b1a45"/>` +
    `<ellipse cx="25" cy="-10" rx="40" ry="13" fill="#34205a"/>${animT("translate", ["-250 0", `${900 / sc} 0`], dur, { begin })}</g></g></g>`;
  void mk;
  return wrap(70, 1, 55, -10, 0.85) + wrap(130, 1.3, 75, -40, 0.7) + wrap(40, 0.8, 90, -60, 0.8);
}

export function hills(): string {
  return `<path d="M0 300 L0 272 Q120 242 240 268 Q320 282 400 262 Q520 238 640 274 L640 300 Z" fill="#150a24"/>`;
}

export function house(): string {
  const win = (x: number, y: number, w: number, h: number, d: number, b: number) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffb347">${animA("opacity", [1, 0.35, 1, 0.8, 0.2, 1], d, { begin: b })}</rect>`;
  return `<g fill="#0d0616">
    <rect x="280" y="225" width="70" height="45"/><polygon points="272,225 315,190 358,225"/>
    <rect x="350" y="195" width="22" height="75"/><polygon points="346,195 361,168 376,195"/>
    <rect x="292" y="196" width="8" height="20"/><rect x="305" y="262" width="20" height="12" opacity="0"/>
  </g>
  <rect x="308" y="250" width="14" height="22" fill="#050209"/>
  ${win(290, 236, 10, 12, 3.1, -1)}${win(330, 236, 10, 12, 4.3, -2)}${win(357, 206, 8, 11, 2.2, -0.5)}${win(310, 207, 8, 9, 5.1, -3)}`;
}

export function deadTree(x: number, flip: boolean): string {
  const t = `<g stroke="#08040f" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M${x} 302 C${x + 3} 255 ${x - 5} 225 ${x + 3} 175" stroke-width="11"/>
    <path d="M${x + 2} 214 L${x - 30} 186 L${x - 38} 154" stroke-width="5"/>
    <path d="M${x + 3} 196 L${x + 38} 168 L${x + 46} 130" stroke-width="5"/>
    <path d="M${x - 2} 238 L${x + 28} 222 L${x + 40} 226" stroke-width="4"/>
    <path d="M${x - 30} 186 L${x - 52} 180" stroke-width="3"/><path d="M${x + 38} 168 L${x + 62} 160" stroke-width="3"/>
  </g>`;
  return flip ? `<g transform="translate(${2 * x} 0) scale(-1 1)">${t}</g>` : t;
}

export function backTombs(): string {
  const spots: [number, number, number][] = [[185, 280, -6], [240, 286, 4], [400, 284, -3], [452, 279, 7]];
  return spots.map(([x, y, rot]) =>
    `<g transform="rotate(${rot} ${x + 15} ${y + 18})">${pixelRects(TOMB, TOMB_PAL, x, y - 20, 3)}</g>`).join("");
}

export function fogBand(y: number, rx: number, dur: number, begin: number, op: number): string {
  return `<g opacity="${op}"><ellipse cx="320" cy="${y}" rx="${rx}" ry="26" fill="url(#fog)">` +
    `${animT("translate", ["-90 0", "90 0", "-90 0"], dur, { begin })}</ellipse></g>`;
}
