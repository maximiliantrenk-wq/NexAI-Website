export const meta = {
  name: 'nexai-vertrag-erklaeren',
  description: 'Erklärt jedes der 8 Vertragsdokumente Paragraph für Paragraph in einfachem Deutsch (je 3 Sätze)',
  phases: [{ title: 'Erklären', detail: 'Ein Erklär-Agent je Dokument, liest den echten Text' }],
}

const DIR = '/Users/deineshit/Desktop/NexAI-Website/vertrag/build/docs'
const DOCS = [
  { file: '01_Rahmen-Dienstleistungsvertrag.json', short: '01 · Rahmen-Dienstleistungsvertrag' },
  { file: '02_Auftragsformular_Leistungsschein.json', short: '02 · Auftragsformular / Leistungsschein' },
  { file: '03_AnlageA_Leistungsbeschreibung.json', short: '03 · Anlage A – Leistungsbeschreibung' },
  { file: '04_AnlageB_AVV_Auftragsverarbeitung.json', short: '04 · Anlage B – AVV (Datenschutz)' },
  { file: '05_AnlageC_SLA.json', short: '05 · Anlage C – SLA (Support)' },
  { file: '06_AnlageD_Abnahmeprotokoll.json', short: '06 · Anlage D – Abnahmeprotokoll' },
  { file: '07_SEPA-Firmenlastschriftmandat.json', short: '07 · SEPA-Firmenlastschriftmandat' },
  { file: '08_AGB_B2B.json', short: '08 · AGB (B2B)' },
]

const BLOCK = {
  type: 'object', additionalProperties: false,
  properties: {
    t: { type: 'string', enum: ['h1', 'h2', 'p', 'note', 'spacer', 'hr'] },
    text: { type: 'string' }, num: { type: 'string' }, h: { type: 'number' },
  },
  required: ['t'],
}
const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { file: { type: 'string' }, blocks: { type: 'array', items: BLOCK } },
  required: ['file', 'blocks'],
}

function prompt(d) {
  return `Lies die Datei ${DIR}/${d.file} mit dem Read-Tool. Sie enthält den echten Text eines NexAI-Vertragsdokuments
als JSON-Blöcke (Felder: t, text, num, items ...).

AUFGABE: Erkläre dieses Dokument **Paragraph für Paragraph / Abschnitt für Abschnitt** in EINFACHEM Deutsch, so
dass zwei Nicht-Juristen (die beiden NexAI-Gründer) es sofort verstehen. Für JEDEN Paragraphen (§) bzw. nummerierten
Abschnitt: **genau 3 kurze, klare Sätze** — (1) was drin steht, (2) was das praktisch für NexAI bedeutet, (3) worauf
ihr achten müsst / warum es drin ist. Kein Juristendeutsch, keine Paragrafenzitate erklären müssen; sprich die
Gründer mit "ihr" an. Fasse reine Ausfüll-/Unterschriftsblöcke knapp zusammen (nicht jedes Feld einzeln).

AUSGABE als Blöcke:
- Beginne mit einem "h1"-Block, text = "${d.short}".
- Optional ein "p"-Block: ein Satz, worum es in diesem Dokument insgesamt geht.
- Dann je Paragraph/Abschnitt: ein "h2"-Block (text = die Original-Überschrift, z. B. "§ 1 Vertragsgegenstand ..."
  bzw. "1. ...") und danach ein "p"-Block mit **genau 3 Sätzen** einfacher Erklärung.
- Gehe der Reihe nach durch ALLE Paragraphen/Abschnitte des Dokuments, lass keinen aus.

Gib nur das strukturierte Objekt zurück (file = "${d.file}", blocks).`
}

const results = await pipeline(
  DOCS,
  (d) => agent(prompt(d), { schema: SCHEMA, phase: 'Erklären', label: 'erklaeren:' + d.file, effort: 'high' })
)

const explained = results.filter(Boolean)
log(`${explained.length}/${DOCS.length} Dokumente erklärt`)
return { explained }
