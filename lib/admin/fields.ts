// Wandelt eine Sprachdatei in eine flache Liste editierbarer Textfelder um —
// und die geänderten Werte wieder zurück in die verschachtelte Struktur.
//
// Nur Zeichenketten sind editierbar. Zahlen, Wahrheitswerte und `null` bleiben
// unangetastet und tauchen in der Oberfläche gar nicht erst auf: Sie steuern
// Verhalten (etwa `"highlighted": false`) und sind kein Inhalt.

export type TextField = {
  /** Pfad in der Datei, z. B. `Hero.badges.0.label` */
  path: string;
  value: string;
};

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/** Alle Zeichenketten der Datei, in Dateireihenfolge. */
export function flattenStrings(input: unknown): TextField[] {
  const out: TextField[] = [];

  const walk = (node: Json, trail: string[]) => {
    if (typeof node === "string") {
      out.push({ path: trail.join("."), value: node });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, [...trail, String(i)]));
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) {
        // Ein Punkt im Schlüssel würde den Pfad mehrdeutig machen. Kommt in den
        // Sprachdateien nicht vor; wir sagen es laut, falls es je passiert.
        if (key.includes(".")) {
          throw new Error(`Schlüssel mit Punkt wird nicht unterstützt: ${[...trail, key].join(".")}`);
        }
        walk(value, [...trail, key]);
      }
    }
  };

  walk(input as Json, []);
  return out;
}

/**
 * Setzt geänderte Werte in eine frisch geladene Datei ein. Es wird immer auf
 * dem aktuellen Stand gearbeitet, damit parallele Änderungen an *anderen*
 * Feldern nicht verlorengehen.
 *
 * Wirft, wenn ein Pfad nicht existiert oder dort keine Zeichenkette steht —
 * lieber ein klarer Fehler als eine stillschweigend verbogene Datei.
 */
export function applyValues(
  document: unknown,
  changes: Record<string, string>,
): unknown {
  const copy = structuredClone(document) as Json;

  for (const [path, value] of Object.entries(changes)) {
    const segments = path.split(".");
    const lastKey = segments.pop();
    if (!lastKey) throw new Error(`Leerer Pfad`);

    let node: Json = copy;
    for (const segment of segments) {
      node = step(node, segment, path);
    }

    const container = node;
    const current = step(container, lastKey, path);
    if (typeof current !== "string") {
      throw new Error(`Feld ist kein Text: ${path}`);
    }

    if (Array.isArray(container)) container[Number(lastKey)] = value;
    else (container as { [k: string]: Json })[lastKey] = value;
  }

  return copy;
}

function step(node: Json, segment: string, path: string): Json {
  if (Array.isArray(node)) {
    const index = Number(segment);
    if (!Number.isInteger(index) || index < 0 || index >= node.length) {
      throw new Error(`Unbekannter Pfad: ${path}`);
    }
    return node[index];
  }
  if (node && typeof node === "object" && segment in node) {
    return (node as { [k: string]: Json })[segment];
  }
  throw new Error(`Unbekannter Pfad: ${path}`);
}

/**
 * Macht aus `Hero.badges.0.label` etwas Lesbares: „Hero › Badges › 1 › Label“.
 * Die Oberfläche zeigt beides — die Beschriftung zum Überfliegen, den echten
 * Pfad zum Nachschlagen, wenn man mit mir darüber spricht.
 */
export function humanizePath(path: string): string {
  return path
    .split(".")
    .map((segment) =>
      /^\d+$/.test(segment)
        ? String(Number(segment) + 1)
        : segment
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .replace(/^./, (c) => c.toUpperCase()),
    )
    .join(" › ");
}
