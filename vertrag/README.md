# NexAI – B2B-Vertragswerk

Modulares Vertragspaket für **NexAI – Next Generation Intelligence GbR** (Stand: Juli 2026).
Jedes Dokument liegt als **Word (.docx, zum Ausfüllen/Bearbeiten)** und **PDF (zum Unterschreiben)** vor.

## Inhalt (Reihenfolge)

| # | Dokument | Zweck |
|---|----------|-------|
| 01 | **Rahmen-Dienstleistungsvertrag** | Kernvertrag – gilt für alle Aufträge |
| 02 | **Auftragsformular / Leistungsschein** | Pro Kunde ausfüllen: Leistungen, Beitrag, Laufzeit, Zahlart |
| 03 | **Anlage A – Leistungsbeschreibung** | Was die Agenten leisten (und was nicht) |
| 04 | **Anlage B – AVV (Art. 28 DSGVO)** | Auftragsverarbeitung, TOMs, Subunternehmer |
| 05 | **Anlage C – SLA** | Support, Reaktionszeiten, Verfügbarkeit |
| 06 | **Anlage D – Abnahmeprotokoll** | Abnahme von Projekt-/Website-Leistungen |
| 07 | **SEPA-Firmenlastschriftmandat** | Nur bei Zahlart Lastschrift |
| 08 | **AGB (B2B)** | Allgemeine Bedingungen (widerspruchsfrei zum Rahmenvertrag) |

**Unterschrift:** Rahmenvertrag + Auftragsformular + AVV (+ ggf. SEPA-Mandat) werden von **beiden Gesellschaftern**
und dem Kunden unterzeichnet. Anlagen A, C werden mitgezeichnet; Anlage D erst bei Projektabnahme.

## Ausfüll-Checkliste (Platzhalter `____`)

Vor dem Versand an einen Kunden ausfüllen:

- **Kundendaten** (Firma, Anschrift, Vertretung, Kontakt) – im Rahmenvertrag, Auftragsformular, AVV.
- **Eigene Steuer-Angaben:** USt-IdNr. – solange nicht vorhanden, **Steuernummer** eintragen.
- **Preise:** monatlicher bzw. jährlicher Beitrag, **Freikontingent** (z. B. Freiminuten), **Overage-Preis**
  (z. B. `____ EUR/Min. netto`) – im Auftragsformular.
- **EUR-Spend-Cap** je Agent (technisches Kostenlimit) – im Auftragsformular.
- **Haftungsobergrenze** (`____ EUR` pro Fall / Jahres-Aggregat) – im Rahmenvertrag § Haftung und in den AGB.
- **SEPA:** Gläubiger-Identifikationsnummer (bei der Deutschen Bundesbank beantragen) + Mandatsreferenz.
- **Rufnummern:** mitgebracht/gestellt + Registrierungsinhaber – im Auftragsformular.

## Was das Vertragswerk absichert (Kurzüberblick)

Aufzeichnung standardmäßig AUS + Pflicht-Ansage · vollständiger AVV · KI-Transparenz (Art. 50 KI-VO) ·
gestufte, wirksame Haftungsklausel + Cap · saubere Werk-/Dienstvertrag-Trennung · Overage + Spend-Cap ·
Offboarding mit 30-Tage-Export vor Löschung · transparente Datenspeicherung intern/extern inkl. Endnutzerdaten
+ Kunden-Informationspflicht (Art. 13/14 DSGVO) + Freistellung · Akquise-Absicherung (§ 7 UWG).

## Dringende Empfehlungen (außerhalb des Vertrags)

1. **Betriebs-/Vermögensschaden-/Cyberhaftpflicht mit KI-Deckung** abschließen (GbR = persönliche Haftung!).
2. Mittelfristig **GbR → UG/GmbH** (Haftungsschutz).
3. Infrastruktur auf **Business-Accounts mit Mandantentrennung + MFA** migrieren (Grundlage der TOM-Zusagen).
4. **Technische Spend-Caps + Kill-Switch** je Agent einrichten (Schutz vor Kostenexplosion/Toll-Fraud).
5. Website-Claims („24/7") an die Vertragslage angleichen.

## Rechtlicher Hinweis

Sorgfältig erstellter, praxisnaher Entwurf auf hohem Niveau. Für die finale Verwendung sollten insbesondere
**Haftung, AVV, KI-VO und die Akquise-Klauseln** einmal von einer Fachanwältin/einem Fachanwalt geprüft werden.

---
*Technik: Die Dokumente werden aus JSON-Quellen (`build/docs/`) über zwei Renderer erzeugt
(`build/render_docx.js` → Word, `build/render_pdf.py` → PDF). Zum Neu-Erzeugen nach Textänderungen die JSON
anpassen und die Renderer erneut laufen lassen.*
