// Shared gradients and filters.

export function defs(): string {
  return `<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#07031a"/><stop offset=".55" stop-color="#2a0f45"/>
    <stop offset=".85" stop-color="#7a2f48"/><stop offset="1" stop-color="#c2562a"/>
  </linearGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1c1030"/><stop offset="1" stop-color="#07030f"/>
  </linearGradient>
  <radialGradient id="moonGlow"><stop offset="0" stop-color="#fff2b8" stop-opacity=".55"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowOrange"><stop offset="0" stop-color="#ffb347" stop-opacity=".7"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowGreen"><stop offset="0" stop-color="#9dff6a" stop-opacity=".9"/><stop offset="1" stop-color="#9dff6a" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowGhost"><stop offset="0" stop-color="#bcd0ff" stop-opacity=".35"/><stop offset="1" stop-color="#bcd0ff" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>
  <radialGradient id="fog"><stop offset="0" stop-color="#b9a8d8" stop-opacity=".30"/><stop offset="1" stop-color="#b9a8d8" stop-opacity="0"/></radialGradient>
</defs>`;
}
