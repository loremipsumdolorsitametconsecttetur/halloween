// Pixel-art sprites (string grids, "." = transparent) and their palettes.
import type { Grid, Palette } from "./config.js";

export const GHOST: Grid = [
  "....1111....", "..11111111..", ".1111111111.", ".1122112211.", ".1122112211.", ".1111111111.",
  ".1111222111.", ".1111111111.", ".1111111111.", ".1111111111.", ".1111111111.", ".11.1111.11.", ".1...11...1.",
];
export const GHOST_PAL: Palette = { "1": "#e6ecff", "2": "#1a1030" };

export const BAT_UP: Grid = ["1.1.....1.1", "11111.11111", ".111111111.", "...11111...", "....1.1...."];
export const BAT_DOWN: Grid = ["....1.1....", "...11111...", ".111111111.", "11111.11111", "1.1.....1.1"];
export const BAT_PAL: Palette = { "1": "#0c0614" };

export const PUMPKIN: Grid = [
  "......33....", ".....33.....", "..11111111..", ".1111111111.", ".1141111411.", ".1444111444.",
  ".1111111111.", ".1144444411.", ".1114141411.", "..11111111..",
];
export const PUMPKIN_PAL: Palette = { "1": "#e8661a", "3": "#2f5a22", "4": "#ffd84a" };

// Plain (faceless) pumpkin used for the tossed ball, with the brand logo on it
export const BALL_PUMPKIN: Grid = [
  "......33........", ".....33.........", "...1111111111...", "..111111111111..", ".11211111111211.",
  "1112111111112111", "1112111111112111", "1112111111112111", "1112111111112111", ".11211111111211.",
  "..111111111111..", "...1111111111...", "....11111111....",
];
export const BALL_PAL: Palette = { "1": "#e8661a", "2": "#b8470f", "3": "#2f5a22" };
export const LOGO: Grid = [
  "...BBBBBBBB...", "..BBWWWWWWBB..", ".BBBWWWWWWWBB.", "BBBBBWWWBWWWBB", "BBWWBBWWWBWWBB",
  "BBWWWBBWWBBBBB", ".BBWWWBWWWBBB.", "..BBWWWWWWBB..", "...BBWWWWBB...", "....BBBBBB....", ".....BBBB.....",
];
export const LOGO_PAL: Palette = { B: "#4b4feb", W: "#ffffff" };
export const LOGO_SHADOW: Palette = { B: "#2a2564", W: "#2a2564" };

export const SPIDER: Grid = ["1.111.1", ".11111.", "1.111.1"];
export const SPIDER_PAL: Palette = { "1": "#0b0612" };

export const TOMB: Grid = [
  "..111111..", ".11111111.", "1111111111", "1111221111", "1111221111", "1122222211",
  "1111221111", "1111221111", "1111111111", "1111111111", "1111111111", "1111111111",
];
export const TOMB_PAL: Palette = { "1": "#3d3358", "2": "#241c3a" };
