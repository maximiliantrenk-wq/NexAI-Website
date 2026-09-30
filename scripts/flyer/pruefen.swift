// Rendert jede PDF-Seite mit PDFKit, also mit genau der Engine, die Apple in
// Vorschau, iOS und der WhatsApp-Vorschau benutzt. Chrome zeigt Fehler wie
// maskierten Verlaufstext NICHT, dieser Renderer schon.
//
//   swift pruefen.swift <datei.pdf> <ausgabeordner>
import Foundation
import PDFKit
import AppKit

let a = CommandLine.arguments
guard a.count > 2, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else {
    FileHandle.standardError.write("PDF nicht lesbar\n".data(using: .utf8)!)
    exit(1)
}
let ordner = a[2]
try? FileManager.default.createDirectory(atPath: ordner, withIntermediateDirectories: true)
let skala: CGFloat = 2

for i in 0..<doc.pageCount {
    guard let seite = doc.page(at: i) else { continue }
    let r = seite.bounds(for: .mediaBox)
    let bild = NSImage(size: NSSize(width: r.width * skala, height: r.height * skala))
    bild.lockFocus()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.setFillColor(NSColor.white.cgColor)
    ctx.fill(CGRect(x: 0, y: 0, width: r.width * skala, height: r.height * skala))
    ctx.scaleBy(x: skala, y: skala)
    seite.draw(with: .mediaBox, to: ctx)
    bild.unlockFocus()
    let rep = NSBitmapImageRep(data: bild.tiffRepresentation!)!
    let png = rep.representation(using: .png, properties: [:])!
    let ziel = "\(ordner)/seite\(i + 1).png"
    try! png.write(to: URL(fileURLWithPath: ziel))
    print("  \(ziel)")
}
