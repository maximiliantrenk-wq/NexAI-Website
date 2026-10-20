# NexAI – B2B-Vertragswerk

Modulares Vertragspaket für **NexAI – Next Generation Artificial Intelligence GbR** (Stand: Oktober 2026).
Jedes Dokument liegt als **Word (.docx, zum Ausfüllen/Bearbeiten)** und **PDF (zum Unterschreiben)** vor.

## Inhalt (Reihenfolge)

| # | Dokument | Zweck |
|---|----------|-------|
| 01 | **Rahmen-Dienstleistungsvertrag** | Kernvertrag – gilt für alle Aufträge |
| 02 | **Auftragsformular / Leistungsschein** | Pro Kunde ausfüllen: Leistungen, Beitrag, Laufzeit, Zahlart |
| 03 | **Anlage A – Leistungsbeschreibung** | Was die Agenten und Anwendungen (CRM, Kalender, App, Mailagent) leisten (und was nicht) |
| 04 | **Anlage B – AVV (Art. 28 DSGVO)** | Auftragsverarbeitung, TOMs, Subunternehmer, Speicher- und Löschfristen (Anhang 3) |
| 05 | **Anlage C – SLA** | Support, Reaktionszeiten, Verfügbarkeit (98 % als Beschaffenheit), Datensicherung, Pflege bei Kauflizenz |
| 06 | **Anlage D – Abnahmeprotokoll** | Abnahme von Projektleistungen (Ersteinrichtung, Anwendungen) |
| 07 | **SEPA-Firmenlastschriftmandat** | Nur bei Zahlart Lastschrift |
| 08 | **AGB (B2B)** | Allgemeine Bedingungen (widerspruchsfrei zum Rahmenvertrag) |
| 10 | **Anlage E – Kauflizenz und Projektanwendungen** | Nur bei CRM-Kauflizenz oder Festpreis-App: dauerhaftes Nutzungsrecht, 7 Jahre Sicherheitsupdates, Pflege, Wartungszugang |

**Unterschrift:** Rahmenvertrag + Auftragsformular + AVV unterschreibt für NexAI **ein Gesellschafter** (gegenseitige Ermächtigung nach § 720 Abs. 2 BGB) **oder eine bevollmächtigte Person** (Closer nach Vertriebspartnervertrag 3.1 § 13 bzw. Vollmachtsurkunde, Vertriebsleitung nach ihrem Vertrag), dazu der Kunde; das SEPA-Mandat (falls Lastschrift) unterschreibt nur der Kunde. Die Vollmacht der Closer deckt nur unveränderte, freigegebene Vorlagen zu Listenpreisen; die Vertriebsleitung vertritt NexAI wie ein Gesellschafter, mit Rabatten bis 10 % unter Listenpreis. Anlage D (Abnahme) und Anlage E (Kauflizenz/Festpreis-App) unterschreiben nur Gesellschafter oder die Vertriebsleitung. Der Hinweis dazu steht im Leistungsschein Ziffer 16. Anlagen A und C (und bei Kauflizenz oder Festpreis-App E) werden mitgezeichnet; Anlage D erst bei Projektabnahme.

`09_Vertriebspartnervertrag_Setter-Closer` gehört nicht zum Kundenvertragswerk.

## Ausfüll-Checkliste (Platzhalter `____`)

Vor dem Versand an einen Kunden ausfüllen:

- **Kundendaten** (Firma, Anschrift, Vertretung, Kontakt) – im Rahmenvertrag, Auftragsformular, AVV.
- **Rechnungs-E-Mail-Adresse** des Kunden – im Auftragsformular (Rechnungen gehen per E-Mail, siehe § 7 Rahmenvertrag / § 4 AGB).
- **Einrichtungsgebühr** (falls vereinbart) – als einmalige Position in der Tabelle des Auftragsformulars.
- **Preise:** monatlicher bzw. jährlicher Beitrag, **Freikontingent** (z. B. Freiminuten), **Overage-Preis**
  (z. B. `____ EUR/Min. netto`) – im Auftragsformular.
- **EUR-Spend-Cap** je Agent (technisches Kostenlimit) – im Auftragsformular.
- **Haftungsobergrenze**: 25.000 EUR je Schadensfall bzw. die höhere Auftragssumme (Rahmenvertrag § 12 Abs. 2, AGB § 11 Abs. 2), von Max am 18.10.2026 bestätigt; ein Jahres-Aggregat gibt es nicht.
- **Eckige Klammern** `[…]` und **`[setzt voraus: …]`**: offene Werte bzw. Zusagen, die erst mit der genannten technischen Voraussetzung gelten. Liste: `~/Developer/recht/pruefungen/2026-10-17-welle-2.md`, Abschnitt „Umsetzung 18.10.2026 (SaaS/SLA)“.
- **Mailagent** (Ziffer 3.3 des Auftragsformulars) und **Kauflizenz / Festpreis-App** (Ziffer 3.4, Enddatum der Sicherheitsupdates Monat/Jahr).
- **SEPA:** Gläubiger-Identifikationsnummer (bei der Deutschen Bundesbank beantragen) + Mandatsreferenz.
- **Rufnummern:** mitgebracht/gestellt + Registrierungsinhaber – im Auftragsformular.

## Was das Vertragswerk absichert (Kurzüberblick)

Aufzeichnung standardmäßig AUS + Pflicht-Ansage · vollständiger AVV · KI-Transparenz (Art. 50 KI-VO) ·
gestufte, wirksame Haftungsklausel + Cap · saubere Werk-/Dienstvertrag-Trennung · Overage + Spend-Cap ·
Offboarding mit 30-Tage-Export vor Löschung · transparente Datenspeicherung intern/extern inkl. Endnutzerdaten
+ Kunden-Informationspflicht (Art. 13/14 DSGVO) + Freistellung · Absicherung bei ausgehender Ansprache durch den Kunden (§ 7 UWG).

## Dringende Empfehlungen (außerhalb des Vertrags)

1. **Betriebs-/Vermögensschaden-/Cyberhaftpflicht mit KI-Deckung** abschließen (GbR = persönliche Haftung!).
2. Mittelfristig **GbR → UG/GmbH** (Haftungsschutz).
3. Infrastruktur auf **Business-Accounts mit Mandantentrennung + MFA** migrieren (Grundlage der TOM-Zusagen).
4. **Technische Spend-Caps + Kill-Switch** je Agent einrichten (Schutz vor Kostenexplosion/Toll-Fraud).
5. Website-Claims („24/7") an die Vertragslage angleichen.

## Rechtlicher Hinweis

Fassung Oktober 2026: Entwurf, von NexAI erstellt; die anwaltliche Prüfung folgt. Zuerst prüfen lassen:
**Haftung (§ 12), Verfügbarkeit/Minderung (Anlage C Ziffer 7), AVV und die Akquise-Klausel (§ 15)**.

---
*Technik: Die Dokumente werden aus JSON-Quellen (`build/docs/`) über zwei Renderer erzeugt
(`build/render_docx.js` → Word, `build/render_pdf.py` → PDF). Zum Neu-Erzeugen nach Textänderungen die JSON
anpassen und die Renderer erneut laufen lassen.*
