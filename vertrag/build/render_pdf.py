#!/usr/bin/env python3
# Rendert ein Dokument-JSON (Block-Schema) zu einer .pdf via reportlab.
# Aufruf: python3 render_pdf.py <input.json> <output.pdf>
import json, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
                                Table, TableStyle, PageBreak, HRFlowable, KeepTogether)
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas

INK = colors.HexColor('#1A1A1A'); HEAD = colors.HexColor('#0B0B0F'); MUTED = colors.HexColor('#6B7280')
ACCENT = colors.HexColor('#1F3A8A'); LINE = colors.HexColor('#D1D5DB'); HEADBG = colors.HexColor('#F3F4F6')
F, FB, FI = 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique'

in_path, out_path = sys.argv[1], sys.argv[2]
doc = json.load(open(in_path, encoding='utf-8'))

MARGIN = 22 * mm
PW, PH = A4
CONTENT_W = PW - 2 * MARGIN

def esc(t):
    return (str('' if t is None else t)
            .replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))

def inline(t):
    s = esc(t)
    # **bold** -> <b>bold</b>
    parts = s.split('**'); out = ''
    for i, p in enumerate(parts):
        out += ('<b>' + p + '</b>') if (i % 2 == 1) else p
    return out

def sanitize(t):
    return (str('' if t is None else t)
            .replace('☐', '[   ]').replace('☑', '[ X ]').replace('☒', '[ X ]'))

body = ParagraphStyle('body', fontName=F, fontSize=10.5, leading=15, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=6)
bodyL = ParagraphStyle('bodyL', parent=body, alignment=TA_LEFT)
h1 = ParagraphStyle('h1', fontName=FB, fontSize=12.5, leading=16, textColor=HEAD, spaceBefore=14, spaceAfter=5, keepWithNext=1)
h2 = ParagraphStyle('h2', fontName=FB, fontSize=10.8, leading=14, textColor=HEAD, spaceBefore=9, spaceAfter=4, keepWithNext=1)
title = ParagraphStyle('title', fontName=FB, fontSize=20, leading=24, textColor=HEAD, spaceAfter=4)
subtitle = ParagraphStyle('subtitle', fontName=F, fontSize=12, leading=15, textColor=MUTED, spaceAfter=6)
meta = ParagraphStyle('meta', fontName=F, fontSize=9, leading=12, textColor=MUTED, spaceAfter=10)
note = ParagraphStyle('note', fontName=FI, fontSize=9, leading=12.5, textColor=MUTED, spaceBefore=4, spaceAfter=7)
bullet = ParagraphStyle('bullet', parent=bodyL, leftIndent=14, bulletIndent=2, spaceAfter=2)
numst = ParagraphStyle('num', parent=body, leftIndent=18, firstLineIndent=-18, spaceAfter=4)
cbst = ParagraphStyle('cb', parent=bodyL, leftIndent=8, spaceAfter=3)
cellst = ParagraphStyle('cell', fontName=F, fontSize=9.5, leading=12.5, textColor=INK)
cellhd = ParagraphStyle('cellhd', fontName=FB, fontSize=9.5, leading=12.5, textColor=HEAD)
sigrole = ParagraphStyle('sigrole', fontName=FB, fontSize=9.5, leading=12, textColor=HEAD, spaceBefore=3)
sigline = ParagraphStyle('sigline', fontName=F, fontSize=9, leading=12, textColor=MUTED)
signame = ParagraphStyle('signame', fontName=F, fontSize=9, leading=12, textColor=INK)

story = []

def P(t, st): return Paragraph(sanitize_inline(t), st)

def sanitize_inline(t):
    return sanitize(inline(t))

for b in doc.get('blocks', []):
    t = b.get('t')
    if t == 'title':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), title))
        story.append(HRFlowable(width='100%', thickness=2, color=ACCENT, spaceBefore=2, spaceAfter=10))
    elif t == 'subtitle':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), subtitle))
    elif t == 'meta':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), meta))
    elif t == 'h1':
        num = ('<font color="#1F3A8A"><b>%s</b></font>  ' % esc(b['num'])) if b.get('num') else ''
        story.append(Paragraph(num + sanitize_inline(b.get('text', '')), h1))
    elif t == 'h2':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), h2))
    elif t == 'p':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), body))
    elif t == 'note':
        story.append(Paragraph(sanitize_inline(b.get('text', '')), note))
    elif t == 'bullets':
        for it in b.get('items', []):
            story.append(Paragraph(sanitize_inline(it), bullet, bulletText='•'))
    elif t == 'num':
        for i, it in enumerate(b.get('items', [])):
            story.append(Paragraph('(%d)&nbsp;&nbsp;%s' % (i + 1, sanitize_inline(it)), numst))
    elif t == 'checkbox':
        box = '[ X ]' if b.get('checked') else '[   ]'
        story.append(Paragraph('%s&nbsp;&nbsp;%s' % (box, sanitize_inline(b.get('text', ''))), cbst))
    elif t == 'fill':
        val = b.get('value')
        tail = esc(val) if val else ('<font color="#9CA3AF">' + '_' * 46 + '</font>')
        story.append(Paragraph('<b>%s:</b> %s' % (esc(b.get('label', '')), tail), ParagraphStyle('fill', parent=bodyL, spaceAfter=6)))
    elif t == 'hr':
        story.append(HRFlowable(width='100%', thickness=0.6, color=LINE, spaceBefore=4, spaceAfter=8))
    elif t == 'spacer':
        story.append(Spacer(1, float(b.get('h', 8))))
    elif t == 'pagebreak':
        story.append(PageBreak())
    elif t == 'table':
        header = b.get('header') or []
        rows = b.get('rows') or []
        ncols = len(header) if header else (len(rows[0]) if rows else 1)
        cw = CONTENT_W / ncols
        data = []
        if header:
            data.append([Paragraph(sanitize_inline(h), cellhd) for h in header])
        for r in rows:
            data.append([Paragraph(sanitize_inline(r[i]) if i < len(r) else '', cellst) for i in range(ncols)])
        tbl = Table(data, colWidths=[cw] * ncols, repeatRows=1 if header else 0)
        ts = [('GRID', (0, 0), (-1, -1), 0.5, LINE),
              ('VALIGN', (0, 0), (-1, -1), 'TOP'),
              ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
              ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5)]
        if header:
            ts.append(('BACKGROUND', (0, 0), (-1, 0), HEADBG))
        tbl.setStyle(TableStyle(ts))
        story.append(tbl)
        story.append(Spacer(1, 6))
    elif t == 'sig':
        cols = b.get('cols', [])
        n = len(cols) or 1
        cw = CONTENT_W / n
        cells = []
        for c in cols:
            inner = [Paragraph(sanitize_inline(c.get('role', '')), sigrole),
                     Spacer(1, 24),
                     HRFlowable(width=cw - 16, thickness=0.7, color=colors.HexColor('#9CA3AF'), spaceAfter=3)]
            lines = c.get('lines', [])
            for i, ln in enumerate(lines):
                inner.append(Paragraph(sanitize_inline(ln), signame if i == len(lines) - 1 else sigline))
            cells.append(inner)
        tbl = Table([cells], colWidths=[cw] * n)
        tbl.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                                 ('LEFTPADDING', (0, 0), (0, 0), 0),
                                 ('RIGHTPADDING', (0, 0), (-1, -1), 10)]))
        story.append(KeepTogether(tbl))

# ---- Seitenzahlen + Fußzeile (zwei Durchläufe) ----
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *a, **k):
        canvas.Canvas.__init__(self, *a, **k)
        self._saved = []
    def showPage(self):
        self._saved.append(dict(self.__dict__))
        self._startPage()
    def save(self):
        total = len(self._saved)
        for st in self._saved:
            self.__dict__.update(st)
            self._footer(total)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)
    def _footer(self, total):
        self.saveState()
        self.setStrokeColor(LINE); self.setLineWidth(0.5)
        self.line(MARGIN, 14 * mm, PW - MARGIN, 14 * mm)
        self.setFont(F, 7.5); self.setFillColor(MUTED)
        self.drawString(MARGIN, 10.5 * mm, 'NexAI – Next Generation Intelligence GbR')
        self.drawRightString(PW - MARGIN, 10.5 * mm, 'Seite %d / %d' % (self._pageNumber, total))
        self.restoreState()

frame = Frame(MARGIN, MARGIN, CONTENT_W, PH - 2 * MARGIN, id='n',
              leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
tmpl = PageTemplate(id='main', frames=[frame])
bd = BaseDocTemplate(out_path, pagesize=A4, pageTemplates=[tmpl],
                     title=doc.get('doc_title', ''), author='NexAI',
                     leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=MARGIN)
bd.build(story, canvasmaker=NumberedCanvas)
print('pdf ->', out_path)
