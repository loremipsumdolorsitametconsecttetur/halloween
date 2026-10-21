// CLI entry point:  tsx src/index.ts [output-path]   (default: assets/halloween.svg)
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { buildSvg } from "./scene.js";

const out = process.argv[2] ?? "assets/halloween.svg";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, buildSvg());
console.log(`wrote ${out}`);
