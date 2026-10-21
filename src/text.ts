// Lettering: the "Slice or Treat" title and the dripping "You browse we pay" tagline.
import { W } from "./config.js";
import { rng } from "./lib/rng.js";
import { animA, f } from "./lib/svg.js";

export function title(): string {
  const a = `x="${W / 2}" y="40" text-anchor="middle" font-family="Creepster, Georgia, serif" font-style="italic" font-weight="bold" font-size="34" letter-spacing="5" textLength="360" lengthAdjust="spacingAndGlyphs"`;
  return `<text ${a} fill="#ff7a1a" filter="url(#blur)" opacity=".6">SLICE OR TREAT</text>` +
    `<text ${a} fill="#ffa733" stroke="#3b1500" stroke-width="2" paint-order="stroke">SLICE OR TREAT${animA("opacity", [1, 0.8, 1, 0.92, 1], 3.2)}</text>`;
}

/** "YOU BROWSE WE PAY" — dripping blood lettering on the ground strip. */
export function tagline(): string {
  const r = rng(99), x0 = 155, x1 = 485, y = 337;
  let drips = "";
  for (let i = 0; i < 14; i++) {
    const x = x0 + ((i + 0.5) / 14) * (x1 - x0) + (r() - 0.5) * 8;
    const len = 6 + r() * 12, d = 2.5 + r() * 3;
    drips += `<line x1="${f(x)}" y1="${y - 6}" x2="${f(x)}" y2="${y + len}" stroke="#a00812" stroke-width="3" stroke-linecap="round">` +
      animA("y2", [y + 4, y + len + 8, y + 4], d, { begin: -r() * d }) + `</line>`;
  }
  const a = `x="${W / 2}" y="${y}" text-anchor="middle" font-family="Creepster, Georgia, serif" font-style="italic" font-weight="bold" font-size="27" textLength="${x1 - x0}" lengthAdjust="spacingAndGlyphs"`;
  return `<text ${a} fill="#ff1a1a" filter="url(#blur)">YOU BROWSE WE PAY${animA("opacity", [0.7, 0.25, 0.6, 0.35, 0.7], 2.6)}</text>` +
    drips + `<text ${a} fill="#d4121f" stroke="#250003" stroke-width="2" paint-order="stroke">YOU BROWSE WE PAY</text>`;
}
