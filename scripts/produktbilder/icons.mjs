// Lucide-Icons als Inline-SVG für die Produktbilder.
// lucide-react hängt die Pfade nicht an die Komponente, deshalb lesen wir sie
// aus der Icon-Quelldatei (dist/esm/icons/<name>.mjs) heraus.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const iconDir = require.resolve("lucide-react").replace(/\/dist\/.*$/, "/dist/esm/icons/");

const cache = new Map();

function iconNode(name) {
  if (cache.has(name)) return cache.get(name);
  const src = readFileSync(`${iconDir}${name}.mjs`, "utf8");
  const m = src.match(/const __iconNode = (\[[\s\S]*?\]);\n/);
  if (!m) throw new Error(`Icon ${name}: __iconNode nicht gefunden`);
  const node = new Function(`return ${m[1]}`)();
  cache.set(name, node);
  return node;
}

/**
 * @param {string} name  Lucide-Name in kebab-case (z. B. "calendar-check")
 * @param {object} opt   size (px), stroke (Farbe oder url(#id)), width (Strichstärke), extra (Attribute)
 */
export function icon(name, opt = {}) {
  const { size = 24, stroke = "currentColor", width = 2, cls = "", defs = "" } = opt;
  const inner = iconNode(name)
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${a}/>`;
    })
    .join("");
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${defs}${inner}</svg>`;
}
