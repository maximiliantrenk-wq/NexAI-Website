# Drittlandbewertung — Resend, Inc. (USA)

**Stand:** September 2026 (Erstfassung, 06.09.2026)
**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Kontakt Datenschutz: mbt@nex-a-i.com
**Aufsichtsbehörde:** LfDI Baden-Württemberg
**Gegenstand:** Übermittlung personenbezogener Daten an **Resend, Inc.** (San Francisco, USA) für den Versand von Formular- und Bestätigungs-E-Mails.

> ⚠️ **Kein Rechtsrat.** Bestandsaufnahme zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO). Ersetzt keine anwaltliche Prüfung.

---

## 0. Warum dies kein vollständiges TIA ist

Für Resend war eine Transfer-Folgenabschätzung vorgesehen. Die Prüfung hat ergeben, dass sie **rechtlich nicht erforderlich** ist — und ein Dokument, das eine nicht bestehende Pflicht erfüllt, verschleiert die tatsächliche Rechtslage, statt sie zu belegen.

**Resend ist unter dem EU-U.S. Data Privacy Framework zertifiziert.** Damit stützt sich die Übermittlung auf den **Angemessenheitsbeschluss nach Art. 45 DSGVO**. Eine Folgenabschätzung nach Klausel 14 der Standardvertragsklauseln setzt dagegen eine Übermittlung nach **Art. 46** voraus — die liegt hier nicht vor.

**Eigene Prüfung am 06.09.2026** in der amtlichen Liste unter dataprivacyframework.gov:

| Eintrag | Rahmen | Status | Erfasste Daten |
|---|---|---|---|
| **Resend**, San Francisco, CA | EU-U.S. Data Privacy Framework | **Active — Re-certification under Review** | Non-HR Data |
| | UK Extension to the EU-U.S. DPF | **Active — Re-certification under Review** | Non-HR Data |

„Active — Re-certification under Review" bedeutet: die Zertifizierung ist **wirksam**, während die jährliche Rezertifizierung geprüft wird. Der Angemessenheitsbeschluss greift.

**Was dieses Dokument stattdessen leistet:** es belegt die Rechtsgrundlage (Abschnitt 1–2) und hält die Bewertung für den Fall bereit, dass der Angemessenheitsbeschluss wegfällt (Abschnitt 4). Genau dieser Fall ist nicht theoretisch — dazu unten.

---

## 1. Die Übermittlung

| Merkmal | Ausprägung |
|---|---|
| **Zweck** | Versand von E-Mails: Kontaktformular, Partnerformular, Terminbestätigung, Newsletter-Double-Opt-in |
| **Auslöser im Code** | `lib/email.ts`, `lib/newsletter-token.ts`, `app/api/booking/route.ts` |
| **Betroffene** | Absender der Formulare, Newsletter-Interessenten, Terminbucher |
| **Datenkategorien** | Name, E-Mail-Adresse, Nachrichteninhalt, ggf. Telefonnummer und Terminangaben |
| **Besondere Kategorien (Art. 9)** | nicht vorgesehen — freies Nachrichtenfeld jedoch nicht kontrollierbar |
| **Rechtsgrundlage der Verarbeitung** | Art. 6 Abs. 1 lit. b und lit. f DSGVO; Newsletter: lit. a (Double-Opt-in) |
| **Umfang** | gering, anlassbezogen |
| **Rolle** | NexAI = Verantwortlicher, Resend = Auftragsverarbeiter |
| **Speicherung beim Empfänger** | E-Mail-Inhalte und Zustellprotokolle nach Resend-Vorgabe; **zu präzisieren** (O-2) |

**Nachweis des Opt-in:** Das Verarbeitungsverzeichnis nennt „Zeit/IP" als Nachweis; der Code speichert **nur den Zeitstempel**. Diese Abweichung ist bereits als offener Punkt erfasst und gehört nicht in diese Bewertung, ist hier aber der Vollständigkeit halber vermerkt.

---

## 2. Übermittlungsinstrument

- **Primär: Art. 45 DSGVO** — Angemessenheitsbeschluss der Kommission vom 10.07.2023 zum EU-U.S. Data Privacy Framework, in Verbindung mit der aktiven Zertifizierung von Resend für **Non-HR Data**.
- **Hilfsweise:** Der Resend-DPA enthält zusätzlich Standardvertragsklauseln. Sie greifen, falls die Zertifizierung endet oder der Angemessenheitsbeschluss wegfällt.
- **Unterauftragsverarbeiter:** Resend führt eine öffentliche Liste und sagt **14 Tage Vorlauf** vor Aufnahme oder Austausch zu, mit Widerspruchsmöglichkeit. Die Liste ist bislang nicht abgeglichen (O-1).

**Zu berichtigen:** Das Verarbeitungsverzeichnis führt Resend als „(US, SCC)". Zutreffend ist **DPF, hilfsweise SCC**. → berichtigt.

---

## 3. Maßnahmen

| # | Maßnahme | Status |
|---|---|---|
| **M-1** | Übermittlung auf Grundlage eines **Angemessenheitsbeschlusses** — kein Drittlandrisiko im Sinne der Art. 44 ff. | ✅ |
| **M-2** | **DPA mit Resend** abgeschlossen, enthält SCC als Rückfallebene | ✅ |
| **M-3** | **Datenminimierung** — nur die zur Zustellung nötigen Angaben | ✅ |
| **M-4** | **Transportverschlüsselung** (TLS) | ✅ |
| **M-5** | **Keine dauerhafte Datenhaltung bei Resend als Zweck** — Resend ist Versandweg, nicht Speicher; die Bestände liegen in DE | ✅ |
| **M-6** | **Unterauftragsverarbeiter-Liste abgleichen und beobachten** (14-Tage-Vorlauf nutzen) | ❌ offen (O-1) |
| **M-7** | **Aufbewahrungsdauer bei Resend** feststellen und in DSE/VVT übernehmen | ❌ offen (O-2) |

---

## 4. Rückfallbewertung — wenn der Angemessenheitsbeschluss wegfällt

Dieser Abschnitt ist **kein hypothetisches Beiwerk**. Gegen den Angemessenheitsbeschluss ist seit dem 31.10.2025 ein **Rechtsmittel beim EuGH anhängig** (C-703/25 P, *Latombe*), nachdem das EuG ihn am 03.09.2025 bestätigt hatte (T-553/23). Der EuGH hat sowohl Safe Harbor als auch Privacy Shield gekippt. Fällt der Beschluss, wechselt die Grundlage **über Nacht** auf Art. 46 — und dann ist eine Folgenabschätzung Pflicht. Sie ist deshalb hier vorbereitet.

**Es gälte dann die US-Rechtslage wie in [`TIA-Vapi-Drittlandtransfer.md`, Schritt 3](TIA-Vapi-Drittlandtransfer.md)** beschrieben: FISA 702 seit 12.06.2026 ausgelaufen, über die FISC-Zertifizierungen aber bis 17.03.2027 fortwirkend; EO 12333 und CLOUD Act unbefristet.

**Bewertung für Resend im Rückfall:**

- **Günstig:** E-Mail-Versand ist ein **Transportvorgang**, kein Datenbestand. Die Inhalte sind geschäftliche Kontaktaufnahmen ohne besondere Kategorien. Betroffene sind wenige, das Volumen ist klein.
- **Günstig:** Der Inhalt der versendeten E-Mails ist ohnehin für den Empfänger bestimmt und in aller Regel nicht vertraulich.
- **Ungünstig:** E-Mail ist von Haus aus unverschlüsselt zwischen den Servern; Transportverschlüsselung ist opportunistisch. Ein Zugriff nach EO 12333 im Transit ist nicht auszuschließen.
- **Ungünstig:** Resend hält Zustellprotokolle und teils Inhalte vor — Umfang bislang nicht festgestellt (O-2). Davon hängt ab, ob der CLOUD Act einen Gegenstand fände.

**Ergebnis des Rückfalls:** Die Übermittlung wäre auch auf SCC-Grundlage **vertretbar**, mit einem Restrisiko in ähnlicher Größenordnung wie bei OpenAI und geringer als bei Vapi. Wirksamste Gegenmaßnahme wäre ein Wechsel auf einen **EU-Versanddienst** — bei einem reinen Transportdienst ist das ein überschaubarer Austausch, anders als beim Sprach-Stack.

---

## 5. Neubewertung

| # | Auslöser | Frist |
|---|---|---|
| **N-1** | **EuGH-Entscheidung in C-703/25 P** — bei Aufhebung des Angemessenheitsbeschlusses greift Abschnitt 4 sofort | binnen 4 Wochen nach Urteil |
| **N-2** | Resend-Zertifizierung wechselt von „Active" auf einen anderen Status | bei Bekanntwerden |
| **N-3** | Resend meldet einen neuen Unterauftragsverarbeiter (14-Tage-Vorlauf) | binnen der Widerspruchsfrist |
| **N-4** | Turnusmäßig, einschließlich Prüfung des Zertifizierungsstatus | jährlich, nächste Prüfung September 2027 |

---

## Offene Punkte

| # | Punkt | Wer |
|---|---|---|
| **O-1** | **Unterauftragsverarbeiter-Liste von Resend abgleichen** und die Benachrichtigung abonnieren | Max |
| **O-2** | **Aufbewahrungsdauer** von Inhalten und Zustellprotokollen bei Resend feststellen; DSE und VVT angleichen | Max |
| **O-3** | Zertifizierungsstatus jährlich nachprüfen (derzeit „Re-certification under Review") | NexAI |
| **O-4** | Anwaltliche Prüfung gemeinsam mit DSE und Vertragswerk | Anwalt |

---

## Quellen

- Durchführungsbeschluss (EU) 2023/1795 der Kommission vom 10.07.2023 (Angemessenheit EU-U.S. DPF)
- **Data Privacy Framework List**, dataprivacyframework.gov — eigene Abfrage 06.09.2026, Eintrag „Resend, San Francisco, CA", Status „Active — Re-certification under Review" für EU-U.S. DPF und UK-Erweiterung, Non-HR Data
- Resend, *Data Processing Addendum* und *GDPR* — DPF-Zertifizierung, Unterauftragsverarbeiterliste, 14 Tage Vorlauf
- EuG, Urteil vom 03.09.2025, T-553/23 (*Latombe/Kommission*); Rechtsmittel EuGH C-703/25 P
- US-Rechtslage: siehe Quellenteil der [Vapi-TIA](TIA-Vapi-Drittlandtransfer.md)
