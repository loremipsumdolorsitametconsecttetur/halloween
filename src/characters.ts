// Characters: pose grids, palettes and jump schedule. Add your own to CHARACTERS.
import { CELL, GROUND, type Grid, type Interval, type Palette } from "./config.js";
import { P1_JUMPS, P1_X, P2_JUMPS, P2_X } from "./choreography.js";
import { hopAnim, inAny, pixelRects, visibilityAnim, withRows } from "./lib/svg.js";

export interface CharacterDef {
  id: string;
  x: number;                          // left edge of sprite (px)
  flip: boolean;                      // mirror horizontally (face left)
  palette: Palette;
  poses: Record<string, Grid> & { idle: Grid };
  schedule: Record<string, Interval[]>; // pose name -> windows (fractions of DUR); idle is the default
  hop: Interval[];                    // windows in which the character jumps
}

export const WITCH_IDLE: Grid = [
  ".....11.....", "....1111....", "...114411...", "..11111111..", ".1111111111.", "...222222...",
  "...232232...", "...222222...", "....2222....", "..11111111..", ".1111111111.", ".1111111111.",
  "..11111111..", "...33..33...",
];
export const WITCH_JUMP = withRows(WITCH_IDLE, { 8: "2...2222...2", 9: "2.11111111.2" });
export const SKEL_IDLE: Grid = [
  "...111111...", "..11111111..", "..13311331..", "..11111111..", "...1.1.1.1..", ".....11.....",
  "..11111111..", "..1.1111.1..", "..1.1111.1..", "..1..11..1..", ".....11.....", "....1111....",
  "...11..11...", "...11..11...",
];
export const SKEL_JUMP = withRows(SKEL_IDLE, { 5: "1....11....1", 6: "1.11111111.1" });

export const CHARACTERS: CharacterDef[] = [
  {
    id: "P1", x: P1_X, flip: false,
    palette: { "1": "#6a2c91", "2": "#7fbf4d", "3": "#140a1e", "4": "#ffd84a" },
    poses: { idle: WITCH_IDLE, jumping: WITCH_JUMP },
    schedule: { jumping: P1_JUMPS }, hop: P1_JUMPS,
  },
  {
    id: "P2", x: P2_X, flip: true,
    palette: { "1": "#e9e4d4", "3": "#140a1e" },
    poses: { idle: SKEL_IDLE, jumping: SKEL_JUMP },
    schedule: { jumping: P2_JUMPS }, hop: P2_JUMPS,
  },
];

export function character(c: CharacterDef): string {
  const rows = c.poses.idle.length;
  const oy = GROUND - rows * CELL;
  const order = Object.keys(c.poses).filter((p) => p !== "idle");
  const activePose = (t: number) => order.find((p) => inAny(c.schedule[p] ?? [], t)) ?? "idle";
  const edges = order.flatMap((p) => (c.schedule[p] ?? []).flat());
  const groups = Object.keys(c.poses).map((pose) =>
    `<g id="${c.id}-${pose}" visibility="${pose === "idle" ? "visible" : "hidden"}">${visibilityAnim((t) => activePose(t) === pose, edges)}` +
    `${pixelRects(c.poses[pose], c.palette, c.x, oy, CELL, c.flip)}</g>`).join("");
  // soft ground shadow
  const shadow = `<ellipse cx="${c.x + 6 * CELL}" cy="${GROUND + 2}" rx="${6 * CELL}" ry="4" fill="#000" opacity=".45"/>`;
  return `${shadow}<g id="${c.id}">${hopAnim(c.hop, 4 * CELL)}${groups}</g>`;
}
