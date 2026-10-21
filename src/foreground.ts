// Foreground layer: grass, front pumpkins and the lightning flash.
import { DUR, GROUND, H, W } from "./config.js";
import { rng } from "./lib/rng.js";
import { animA, pixelRects } from "./lib/svg.js";
import { PUMPKIN, PUMPKIN_PAL } from "./sprites.js";

export function grass(): string {
  const r = rng(5);
  let d = `M0 ${H} L0 ${GROUND + 6}`;
  for (let x = 0; x <= W; x += 6) d += ` L${x + 3} ${GROUND + 6 - (3 + r() * 9)} L${x + 6} ${GROUND + 6}`;
  return `<path d="${d} L${W} ${H} Z" fill="#0b0615"/>`;
}

export function foregroundPumpkins(): string {
  const spots: [number, number, number][] = [[24, 318, 4], [570, 316, 4]];
  return spots.map(([x, y, c], i) =>
    `<g><circle cx="${x + 6 * c}" cy="${y + 5 * c}" r="${8 * c}" fill="url(#glowOrange)">${animA("opacity", [0.6, 1, 0.5, 0.9, 0.6], 1.3 + i * 0.4)}</circle>` +
    `${pixelRects(PUMPKIN, PUMPKIN_PAL, x, y, c)}</g>`).join("");
}

export function lightning(): string {
  return `<rect width="${W}" height="${H}" fill="#cdd6ff" opacity="0" pointer-events="none">` +
    animA("opacity", [0, 0, 0.4, 0, 0.28, 0, 0], DUR, { keyTimes: [0, 0.6, 0.61, 0.63, 0.64, 0.67, 1] }) + `</rect>`;
}
