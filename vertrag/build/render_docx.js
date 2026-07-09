// Rendert ein Dokument-JSON (Block-Schema) zu einer .docx via docx-js.
// Aufruf: node render_docx.js <input.json> <output.docx>
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, Footer, PageNumber, TabStopType, TabStopPosition,
} = require('docx');

const INK = '1A1A1A', HEAD = '0B0B0F', MUTED = '6B7280', ACCENT = '1F3A8A', LINE = 'D1D5DB';
const FONT = 'Arial';
const PAGE_W = 11906, PAGE_H = 16838; // A4 in twips
const MARGIN = 1250; // ~2.2cm
const CONTENT_W = PAGE_W - 2 * MARGIN;

const [, , inPath, outPath] = process.argv;
const doc = JSON.parse(fs.readFileSync(inPath, 'utf8'));

// ---- Inline-Bold Parser (**fett**) ----
function runs(text, opts = {}) {
  const out = [];
  const parts = String(text == null ? '' : text).split('**');
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '') continue;
    out.push(new TextRun({ text: parts[i], bold: (i % 2 === 1) || !!opts.bold, italics: !!opts.italics, size: opts.size || 21, color: opts.color || INK, font: FONT }));
  }
  if (out.length === 0) out.push(new TextRun({ text: '', size: opts.size || 21, font: FONT }));
  return out;
}

function para(children, extra = {}) { return new Paragraph({ children, spacing: { line: 276, after: 120, ...(extra.spacing || {}) }, ...extra, ...(extra.spacing ? { spacing: { line: 276, after: 120, ...extra.spacing } } : {}) }); }

const children = [];

function push(p) { children.push(p); }

function ruleParagraph() {
  return new Paragraph({ spacing: { after: 120 }, border: { bottom: { color: LINE, space: 2, style: BorderStyle.SINGLE, size: 6 } } });
}

for (const b of doc.blocks || []) {
  switch (b.t) {
    case 'title':
      push(new Paragraph({ spacing: { before: 60, after: 80 }, alignment: AlignmentType.LEFT, children: runs(b.text, { bold: true, size: 40, color: HEAD }) }));
      push(new Paragraph({ spacing: { after: 160 }, border: { bottom: { color: ACCENT, space: 4, style: BorderStyle.SINGLE, size: 18 } } }));
      break;
    case 'subtitle':
      push(new Paragraph({ spacing: { after: 120 }, children: runs(b.text, { size: 24, color: MUTED }) }));
      break;
    case 'meta':
      push(new Paragraph({ spacing: { after: 200 }, children: runs(b.text, { size: 18, color: MUTED }) }));
      break;
    case 'h1':
      push(new Paragraph({
        spacing: { before: 260, after: 100 }, keepNext: true, heading: HeadingLevel.HEADING_1,
        children: [
          ...(b.num ? [new TextRun({ text: b.num + '  ', bold: true, size: 24, color: ACCENT, font: FONT })] : []),
          ...runs(b.text, { bold: true, size: 24, color: HEAD }),
        ],
      }));
      break;
    case 'h2':
      push(new Paragraph({ spacing: { before: 160, after: 80 }, keepNext: true, heading: HeadingLevel.HEADING_2, children: runs(b.text, { bold: true, size: 21, color: HEAD }) }));
      break;
    case 'p':
      push(new Paragraph({ spacing: { line: 276, after: 120 }, alignment: AlignmentType.JUSTIFIED, children: runs(b.text) }));
      break;
    case 'note':
      push(new Paragraph({ spacing: { before: 80, after: 140 }, children: runs(b.text, { italics: true, size: 18, color: MUTED }) }));
      break;
    case 'bullets':
      (b.items || []).forEach((it) => push(new Paragraph({ bullet: { level: 0 }, spacing: { line: 264, after: 40 }, children: runs(it) })));
      break;
    case 'num':
      (b.items || []).forEach((it, i) => push(new Paragraph({
        spacing: { line: 276, after: 80 }, indent: { left: 360, hanging: 360 }, alignment: AlignmentType.JUSTIFIED,
        children: [new TextRun({ text: '(' + (i + 1) + ')\t', color: INK, size: 21, font: FONT }), ...runs(it)],
      })));
      break;
    case 'checkbox':
      push(new Paragraph({ spacing: { after: 60 }, indent: { left: 200 }, children: [new TextRun({ text: (b.checked ? '☒' : '☐') + '  ', size: 24, font: FONT }), ...runs(b.text)] }));
      break;
    case 'fill': {
      const kids = [new TextRun({ text: (b.label || '') + ': ', bold: true, size: 21, color: INK, font: FONT })];
      kids.push(new TextRun({ text: b.value ? b.value : ' '.repeat(48), size: 21, color: b.value ? INK : MUTED, underline: b.value ? undefined : {}, font: FONT }));
      push(new Paragraph({ spacing: { after: 120 }, children: kids }));
      break;
    }
    case 'hr':
      push(ruleParagraph());
      break;
    case 'spacer':
      push(new Paragraph({ spacing: { after: Math.round((b.h || 8) * 20) }, children: [new TextRun({ text: '', size: 2 })] }));
      break;
    case 'pagebreak':
      push(new Paragraph({ children: [new TextRun({ text: '', break: 0 })], pageBreakBefore: true }));
      break;
    case 'table': {
      const cols = (b.header && b.header.length) || (b.rows && b.rows[0] && b.rows[0].length) || 1;
      const colW = Math.floor(CONTENT_W / cols);
      const widths = Array(cols).fill(colW);
      const mkCell = (txt, opts = {}) => new TableCell({
        width: { size: colW, type: WidthType.DXA },
        margins: { top: 60, bottom: 60, left: 90, right: 90 },
        shading: opts.head ? { type: 'clear', fill: 'F3F4F6' } : undefined,
        children: [new Paragraph({ spacing: { after: 0, line: 264 }, children: runs(txt, { bold: !!opts.head, size: 20, color: opts.head ? HEAD : INK }) })],
      });
      const rows = [];
      if (b.header && b.header.length) rows.push(new TableRow({ tableHeader: true, children: b.header.map((h) => mkCell(h, { head: true })) }));
      (b.rows || []).forEach((r) => rows.push(new TableRow({ children: Array.from({ length: cols }, (_, i) => mkCell(r[i] == null ? '' : r[i])) })));
      push(new Table({
        columnWidths: widths, width: { size: CONTENT_W, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: LINE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
          left: { style: BorderStyle.SINGLE, size: 4, color: LINE }, right: { style: BorderStyle.SINGLE, size: 4, color: LINE },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINE }, insideVertical: { style: BorderStyle.SINGLE, size: 4, color: LINE },
        },
        rows,
      }));
      push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: '', size: 2 })] }));
      break;
    }
    case 'sig': {
      const cols = b.cols || [];
      const n = cols.length || 1;
      const colW = Math.floor(CONTENT_W / n);
      const mkCell = (c) => {
        const kids = [
          new Paragraph({ spacing: { after: 0 }, children: runs(c.role, { bold: true, size: 19, color: HEAD }) }),
          new Paragraph({ spacing: { before: 360, after: 0 }, border: { bottom: { color: '9CA3AF', style: BorderStyle.SINGLE, size: 6, space: 2 } }, children: [new TextRun({ text: '', size: 2 })] }),
        ];
        (c.lines || []).forEach((ln, i) => kids.push(new Paragraph({ spacing: { after: 20 }, children: runs(ln, { size: 18, color: i === (c.lines.length - 1) ? INK : MUTED }) })));
        return new TableCell({ width: { size: colW, type: WidthType.DXA }, margins: { right: 160, top: 60 }, borders: noBorders(), children: kids });
      };
      push(new Table({ columnWidths: Array(n).fill(colW), width: { size: CONTENT_W, type: WidthType.DXA }, borders: noBorders(), rows: [new TableRow({ children: cols.map(mkCell) })] }));
      break;
    }
    default:
      break;
  }
}

function noBorders() {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
}

const footer = new Footer({
  children: [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
      border: { top: { color: LINE, style: BorderStyle.SINGLE, size: 4, space: 6 } },
      children: [
        new TextRun({ text: 'NexAI – Next Generation Intelligence GbR', size: 15, color: MUTED, font: FONT }),
        new TextRun({ text: '\t', size: 15, font: FONT }),
        new TextRun({ children: ['Seite ', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES], size: 15, color: MUTED, font: FONT }),
      ],
    }),
  ],
});

const document = new Document({
  creator: 'NexAI',
  title: doc.doc_title || '',
  styles: { default: { document: { run: { font: FONT, size: 21, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
    footers: { default: footer },
    children,
  }],
});

Packer.toBuffer(document).then((buf) => { fs.writeFileSync(outPath, buf); console.log('docx ->', outPath, buf.length, 'bytes'); });
