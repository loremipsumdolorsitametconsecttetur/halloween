// Assembles every layer (back to front) into the final SVG string.
import { GROUND, H, W } from "./config.js";
import { ball } from "./ball.js";
import { CHARACTERS, character } from "./characters.js";
import { bat, ghost, spider, wisps } from "./creatures.js";
import { defs } from "./defs.js";
import { grass, foregroundPumpkins, lightning } from "./foreground.js";
import { backTombs, clouds, deadTree, fogBand, hills, house, moon, stars } from "./scenery.js";
import { tagline, title } from "./text.js";

export function buildSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 2}" height="${H * 2}">
<title>Halloween night</title>
${defs()}
<rect width="${W}" height="${H}" fill="url(#sky)"/>
${stars()}${moon()}${clouds()}
${bat("M-30,90 C150,20 300,140 480,70 S700,40 720,100", 11, -2)}
${bat("M700,150 C520,90 360,200 200,120 S-20,160 -40,110", 14, -6, 2)}
${hills()}${house()}${deadTree(34, false)}${deadTree(606, true)}${backTombs()}
${fogBand(292, 260, 16, -4, 0.9)}
${ghost(40, 90, 9, -2)}${ghost(440, 150, 12, -7, true)}${ghost(250, 72, 10, -5)}
${bat("M-30,200 C100,160 220,240 340,180 S600,150 700,210", 9, -1, 2)}
${spider(205)}
<rect y="${GROUND}" width="${W}" height="${H - GROUND}" fill="url(#ground)"/>
${wisps()}
${CHARACTERS.map(character).join("\n")}
${ball()}
${grass()}${foregroundPumpkins()}
${fogBand(340, 300, 20, -9, 0.7)}
${tagline()}
${lightning()}${title()}
</svg>`;
}
