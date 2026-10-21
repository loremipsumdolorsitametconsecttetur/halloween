// Global constants and shared types for the scene.

export const W = 640, H = 360;
export const CELL = 4;          // pixel size for characters
export const DUR = 8;           // master loop length (s)
export const GROUND = 300;      // y of the ground line
export type Interval = [number, number]; // fractions of DUR, 0..1
export type Palette = Record<string, string>;
export type Grid = string[];
