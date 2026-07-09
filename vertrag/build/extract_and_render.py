#!/usr/bin/env python3
# Liest die Workflow-Ausgabedatei, extrahiert die 8 Dokument-JSONs und rendert je .docx + .pdf.
# Aufruf: python3 extract_and_render.py <workflow_output_file.json>
import json, sys, subprocess, os, pathlib

out_file = sys.argv[1]
data = json.load(open(out_file, encoding='utf-8'))
docs = data.get('result', {}).get('docs') or data.get('docs')
if not docs:
    print('KEINE docs im Ergebnis gefunden'); sys.exit(1)

build = pathlib.Path(__file__).resolve().parent
outdir = build.parent
docsdir = build / 'docs'; docsdir.mkdir(exist_ok=True)
env = dict(os.environ); env['PATH'] = os.path.expanduser('~/.local/opt/node/bin') + ':' + env.get('PATH', '')

results = []
for d in docs:
    name = d['filename']
    jp = docsdir / (name + '.json')
    json.dump(d, open(jp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    docx = outdir / (name + '.docx')
    pdf = outdir / (name + '.pdf')
    subprocess.run(['node', str(build / 'render_docx.js'), str(jp), str(docx)], check=True, env=env)
    subprocess.run(['python3', str(build / 'render_pdf.py'), str(jp), str(pdf)], check=True)
    nblocks = len(d.get('blocks', []))
    results.append((name, nblocks))
    print('OK', name, '(', nblocks, 'blocks )')

print('\nFertig:', len(results), 'Dokumente ->', outdir)
