// The tossed jack-o'-lantern with the logo on it.
import { CELL, DUR } from "./config.js";
import { P1_X, P2_X } from "./choreography.js";
import { animA, animT, f, pixelRects } from "./lib/svg.js";
import { BALL_PAL, BALL_PUMPKIN, LOGO, LOGO_PAL, LOGO_SHADOW } from "./sprites.js";

export function ball(): string {
  const HIT_Y = 234, PEAK = 125;
  const hitX = [P1_X + 12 * CELL + 18, P2_X - 18, P1_X + 12 * CELL + 18, P2_X - 18];
  const pts: string[] = [], ks: number[] = [];
  const N = 160;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const u = ((((t - 0.125) % 1) + 1) % 1) / 0.25;
    const seg = Math.min(3, Math.floor(u)), s = u - seg;
    const x = hitX[seg] + (hitX[(seg + 1) % 4] - hitX[seg]) * s;
    const y = HIT_Y - PEAK * 4 * s * (1 - s);
    pts.push(`${f(x)} ${f(y)}`); ks.push(t);
  }
  const lx = -14, ly = -8; // logo (14x11 @ 2px) centred on the pumpkin body
  return `<g id="ball">${animT("translate", pts, DUR, { keyTimes: ks })}` +
    `<circle r="42" fill="url(#glowOrange)">${animA("opacity", [0.8, 1, 0.7, 1, 0.8], 0.7)}</circle>` +
    `<g>${animT("rotate", ["-12 0 0", "12 0 0", "-12 0 0"], 2.4)}` +
    `${pixelRects(BALL_PUMPKIN, BALL_PAL, -24, -19.5, 3)}` +
    `${pixelRects(LOGO, LOGO_SHADOW, lx + 2, ly + 2, 2)}${pixelRects(LOGO, LOGO_PAL, lx, ly, 2)}</g></g>`;
}
