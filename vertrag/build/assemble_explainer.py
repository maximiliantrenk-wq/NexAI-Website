#!/usr/bin/env python3
# Baut aus der Erklär-Workflow-Ausgabe EIN Dokument "einfach erklärt" und rendert docx + pdf.
# Aufruf: python3 assemble_explainer.py <workflow_output_file.json>
import json, sys, subprocess, os, pathlib

out_file = sys.argv[1]
data = json.load(open(out_file, encoding='utf-8'))
parts = data.get('result', {}).get('explained') or data.get('explained')
if not parts:
    print('KEINE Erklärungen gefunden'); sys.exit(1)

# nach Dateinummer sortieren (01..08)
parts.sort(key=lambda p: p.get('file', ''))

blocks = [
    {"t": "title", "text": "NexAI-Vertragswerk – einfach erklärt"},
    {"t": "meta", "text": "Stand: Juli 2026 · Jeder Paragraph in 3 Sätzen, ohne Juristendeutsch"},
    {"t": "note", "text": "Diese Fassung erklärt das Vertragswerk in einfacher Sprache. Rechtlich verbindlich sind allein die unterschriebenen Vertragsdokumente."},
    {"t": "hr"},
]
for i, p in enumerate(parts):
    if i > 0:
        blocks.append({"t": "pagebreak"})
    blocks.extend(p.get('blocks', []))

doc = {"filename": "NexAI-Vertragswerk_einfach-erklaert", "doc_title": "NexAI-Vertragswerk – einfach erklärt", "blocks": blocks}

build = pathlib.Path(__file__).resolve().parent
outdir = build.parent
jp = build / 'docs' / 'einfach-erklaert.json'
json.dump(doc, open(jp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

env = dict(os.environ); env['PATH'] = os.path.expanduser('~/.local/opt/node/bin') + ':' + env.get('PATH', '')
docx = outdir / 'NexAI-Vertragswerk_einfach-erklaert.docx'
pdf = outdir / 'NexAI-Vertragswerk_einfach-erklaert.pdf'
subprocess.run(['node', str(build / 'render_docx.js'), str(jp), str(docx)], check=True, env=env)
subprocess.run(['python3', str(build / 'render_pdf.py'), str(jp), str(pdf)], check=True)
print('Fertig:', pdf, '(', len(blocks), 'Blöcke,', len(parts), 'Dokumente )')
