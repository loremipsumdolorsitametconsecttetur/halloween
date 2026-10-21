// Where the characters stand and when they jump (fractions of the master loop).
import type { Interval } from "./config.js";

export const P1_X = 96, P2_X = 496;
export const P1_JUMPS: Interval[] = [[0.075, 0.175], [0.575, 0.675]];
export const P2_JUMPS: Interval[] = [[0.325, 0.425], [0.825, 0.925]];
