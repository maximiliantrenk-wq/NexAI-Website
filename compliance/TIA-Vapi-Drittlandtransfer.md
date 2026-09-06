# Transfer Impact Assessment (TIA) — Vapi, Inc. (USA)

**Stand:** September 2026 (Erstfassung, 06.09.2026)
**Verantwortlicher / Auftragsverarbeiter:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Aufsichtsbehörde:** LfDI Baden-Württemberg
**Gegenstand:** Übermittlung personenbezogener Daten an **Vapi, Inc.** (San Francisco, USA) und die von Vapi eingesetzten Unterauftragsverarbeiter im Rahmen des KI-Telefonassistenten.

> ⚠️ **Kein Rechtsrat.** Diese Bewertung ist eine technisch-organisatorische und rechtliche Bestandsaufnahme zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO) und der Prüfpflicht aus Klausel 14 der EU-Standardvertragsklauseln. Sie ersetzt **keine** anwaltliche Prüfung. Vor Verwendung gegenüber Kunden oder Behörden vom Fachanwalt/DSB prüfen lassen.

**Methodik:** EDPB-Empfehlungen 01/2020 (Fassung 2.0 vom 18.06.2021) über Maßnahmen zur Ergänzung von Übermittlungstools, sechs Schritte. Grundlage sind der Live-Stand der Vapi-Konfiguration (im Dashboard geprüft 06.09.2026), das Verarbeitungsverzeichnis, die Datenschutzerklärung und die AVV Anlage B.

**Verwandte Dokumente:** [`VVT-Verarbeitungsverzeichnis.md`](VVT-Verarbeitungsverzeichnis.md) · [`AVV-Subprozessoren-Tracker.md`](AVV-Subprozessoren-Tracker.md) · [`DSGVO-AUDIT.md`](DSGVO-AUDIT.md) · `vertrag/build/docs/04_AnlageB_AVV_Auftragsverarbeitung.json`

---

## 0. Ergebnis vorweg

Die Übermittlung an Vapi lässt sich auf die **EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO)** stützen und mit ergänzenden Maßnahmen auf ein **vertretbares, aber nicht auf null reduziertes Restrisiko** bringen.

Zwei Befunde tragen dieses Ergebnis — und ein dritter begrenzt es:

1. **Risikomindernd und belegt:** Es wird **kein Audio und kein Transkript gespeichert**. Gesprächsinhalt existiert bei Vapi nur flüchtig während des Anrufs; dauerhaft gespeichert wird ausschließlich in Deutschland (Hetzner). Die übermittelten Datenkategorien sind eng (Name, Rufnummer, Anliegen, Wunschtermin).
2. **Risikomindernd, aber nur vorübergehend:** FISA 702 ist am 12.06.2026 **ausgelaufen**. Das entlastet in der Praxis jedoch **nicht** — die im März 2026 erteilten FISC-Zertifizierungen laufen weiter bis **17.03.2027**, die Überwachung geht unverändert weiter (siehe 3.1). Aus dem Auslaufen darf **keine** Erleichterung abgeleitet werden.
3. **Nicht auflösbar:** Vapi muss die Gesprächsinhalte **im Klartext verarbeiten**. Damit greift EDPB-Anwendungsfall 6 — für diese Konstellation nennen die EDPB-Empfehlungen ausdrücklich **keine wirksame technische Maßnahme**. Verschlüsselung löst das Problem hier nicht. Was trägt, sind Datenminimierung, Nichtspeicherung und vertraglich-organisatorische Maßnahmen.

**Konsequenz:** Fortführung vertretbar. Die dauerhafte Lösung ist die bereits eingeplante Ablösung durch einen selbst betriebenen Sprach-Stack (Stufe 3 der CRM-Roadmap). **Pflicht-Neubewertung vor dem 17.03.2027.**

---

## Schritt 1 — Die Übermittlung kennen

### 1.1 Zwei Rollen, zwei Module

| Fall | Rolle NexAI | Rolle Vapi | SCC-Modul |
|---|---|---|---|
| **(a)** Eigene NexAI-Rufnummer (+49 7959 3100191) — Terminanfragen an NexAI selbst | **Verantwortlicher** | Auftragsverarbeiter | **Modul 2** (Verantwortlicher → Auftragsverarbeiter) |
| **(b)** Sprachassistent im Kundenauftrag | **Auftragsverarbeiter** | **Unter**auftragsverarbeiter | **Modul 3** (AV → UAV) |

Die AVV Anlage B nennt bislang nur Modul 3. Für Fall (a) ist Modul 2 einschlägig. → offener Punkt O-1.

### 1.2 Datenlandkarte

```
Anrufer (DE) → easybell SIP (DE) → Vapi Orchestrierung (US)
                                     ├─→ Soniox STT (US, UAV von Vapi)
                                     ├─→ OpenAI LLM (IE/US)
                                     └─→ Vapi TTS, Stimme „Sid" (US)
                                   → Webhook → n8n + NexAI-CRM (Hetzner, DE)
```

Dauerhafte Speicherung findet **ausschließlich am Ende der Kette in Deutschland** statt.

| Merkmal | Ausprägung |
|---|---|
| **Betroffene** | Anrufer: Interessenten, Kunden, im Kundenfall deren Endkunden |
| **Datenkategorien** | Rufnummer, Name, Anliegen, Wunschtermin, ggf. E-Mail, technische Verbindungs-/Metadaten, Gesprächsinhalt (flüchtig) |
| **Besondere Kategorien (Art. 9)** | **Nicht vorgesehen.** Organisatorischer „Sensitivitäts-Riegel": kein Vapi-Voice für Art.-9-Branchen (Gesundheit u. ä.) → Grenze siehe 4.4 |
| **Zweck** | Entgegennahme von Terminanfragen, Terminvereinbarung |
| **Rechtsgrundlage der Verarbeitung** | Art. 6 Abs. 1 lit. b und lit. f DSGVO |
| **Art der Übermittlung** | Fortlaufend während des Anrufs (Streaming), nicht als Datenbestand |
| **Umfang** | Gering. Einzelne Anrufe pro Tag, kleine GbR, kein Massenbetrieb |
| **Speicherung beim Importeur** | **Keine** — Audio-Recording und Transkript in Vapi deaktiviert (Screenshot-Beleg 08.08.2026; Nachprüfung fällig, O-2) |
| **Speicherdauer in der EU** | Termindaten ≤ 6 Monate (CRM) |
| **Weiterübermittlung** | Vapi an Soniox (STT). Soniox steht auf der Vapi-Unterauftragsverarbeiterliste (Mitteilung nach § 3.2 Vapi-DPA) |
| **Belegenheit** | **US-Region.** Vapi hat EU-Support und Self-Serve-Wachstum bis 2027 eingefroren; EU-Residency nur über Enterprise-Onboarding via Sales, das NexAI nicht durchlaufen hat |

---

## Schritt 2 — Übermittlungswerkzeug

**Gewählt:** Standardvertragsklauseln nach **Durchführungsbeschluss (EU) 2021/914**, Module 2 bzw. 3.

- **DPA mit Vapi abgeschlossen** (Stand 06.09.2026).
- **Art. 45 DSGVO steht nicht zur Verfügung:** Vapi ist **nicht** unter dem EU-U.S. Data Privacy Framework zertifiziert. Der Angemessenheitsbeschluss für das DPF greift also nicht.
- **Soniox** benötigt kein eigenes Übermittlungsinstrument, solange kein eigener Soniox-Zugang genutzt wird: die Übermittlung erfolgt über Vapi und ist vom Vapi-DPA nebst dessen SCC gedeckt.
- **OpenAI** wird gesondert geführt (eigener DPA, Zertifizierungslage abweichend) und ist nicht Gegenstand dieses TIA.

---

## Schritt 3 — Rechtslage im Bestimmungsland (USA)

### 3.1 FISA 702 — ausgelaufen, aber praktisch fortwirkend

Der zentrale und **im September 2026 neue** Befund:

| Datum | Ereignis |
|---|---|
| 20.04.2024 | Reauthorisierung durch RISAA, Befristung bis 20.04.2026; ECSP-Definition ausgeweitet |
| März 2026 | FISC genehmigt die aktuellen Zertifizierungen |
| 20.04.2026 | Erstes Auslaufen, kurze Überbrückung durch den Kongress |
| **12.06.2026** | **Endgültiges Auslaufen** — erstmals seit 2008 |
| **bis 17.03.2027** | **Erhebung läuft unverändert weiter**: die im März 2026 erteilten Zertifizierungen und die darauf gestützten Anordnungen sind bestandsgeschützt |

**Bewertung.** Das Auslaufen ist für diese Bewertung **kein entlastender Umstand**. Erstens wirkt die Erhebung über bestandsgeschützte Zertifizierungen bis mindestens 17.03.2027 fort. Zweitens ist eine Reauthorisierung — auch rückwirkend oder in geänderter Form — jederzeit möglich; die Verhandlungen laufen. Drittens ist ein Rechtszustand im Fluss für eine Risikobewertung eher belastend als entlastend, weil er die Vorhersehbarkeit senkt, auf die Art. 44 ff. DSGVO abstellen.

**Fällt Vapi in den Anwendungsbereich?** Die durch RISAA erweiterte ECSP-Definition (50 U.S.C. § 1881(b)(4)) erfasst Anbieter, die Kommunikation übermitteln oder Zugang zu entsprechender Infrastruktur haben. Vapi übermittelt und verarbeitet Gesprächsinhalte in Echtzeit. **Es ist daher davon auszugehen, dass Vapi grundsätzlich in den Anwendungsbereich fällt.** Das Gegenteil wird hier ausdrücklich **nicht** unterstellt.

### 3.2 EO 12333

Von der Befristung des § 702 **nicht berührt** — es handelt sich um eine Anordnung der Exekutive ohne Verfallsdatum. Erfasst insbesondere die Erfassung von Kommunikation **während der Übertragung**, außerhalb der USA, ohne richterliche Einzelfallkontrolle. Für einen Sprachdienst, dessen Daten über transatlantische Strecken laufen, ist das der praktisch relevante Nebenpfad. Gegenmaßnahme ist allein Transportverschlüsselung (vorhanden, TLS/SRTP), die gegen den Zugriff **beim Anbieter selbst** jedoch nicht wirkt.

### 3.3 CLOUD Act

Ebenfalls unberührt. Verpflichtet US-Anbieter zur Herausgabe von Daten in ihrem Gewahrsam oder unter ihrer Kontrolle, **unabhängig vom Speicherort**. Praktische Reichweite hier gering, weil Vapi mangels Speicherung kaum Daten in Gewahrsam hat — die Wirksamkeit dieses Arguments hängt vollständig an Maßnahme M-1 (Nichtspeicherung).

### 3.4 EO 14086 und die DPF-Rechtsprechung

**Mildernd:** Die Executive Order 14086 (2022) bindet die US-Nachrichtendienste an Erforderlichkeit und Verhältnismäßigkeit und schafft mit dem Data Protection Review Court einen Rechtsbehelf. Diese Garantien gelten **nicht nur** für DPF-zertifizierte Empfänger, sondern für die US-Signalaufklärung insgesamt, und wirken daher auch bei SCC-gestützten Übermittlungen.

**Einschränkend:** Das EuG hat den DPF-Angemessenheitsbeschluss am 03.09.2025 bestätigt (*Latombe/Kommission*, T-553/23). Dagegen ist seit 31.10.2025 ein **Rechtsmittel beim EuGH** anhängig (C-703/25 P). Der EuGH hat sowohl Safe Harbor als auch Privacy Shield gekippt. Eine Entscheidung, die die Bewertung von EO 14086 und des DPRC ändert, würde auch diese TIA berühren, obwohl NexAI nicht auf das DPF gestützt ist. → Neubewertungsauslöser N-2.

### 3.5 Praktische Erfahrung des Importeurs

**Nicht erhoben.** Es liegen weder ein Transparenzbericht von Vapi noch eine Auskunft darüber vor, ob Vapi bislang Behördenanfragen nach FISA/CLOUD Act erhalten hat. Nach EDPB-Empfehlung 01/2020 (Rn. 43.3) ist dies ein zulässiger, aber nur **ergänzender** Faktor — er kann eine ungünstige objektive Rechtslage nicht aufwiegen. → offener Punkt O-3.

---

## Schritt 4 — Ergänzende Maßnahmen

### 4.1 Die ehrliche Grenze zuerst

Vapi benötigt die Gesprächsinhalte **im Klartext**, um sie zu transkribieren und zu beantworten. Das entspricht **Anwendungsfall 6** der EDPB-Empfehlungen („Übermittlung an Cloud-Dienste oder andere Auftragsverarbeiter, die Zugang zu Daten im Klartext benötigen"). Dazu stellt der EDPB ausdrücklich fest, dass er **keine wirksame technische Maßnahme** zu benennen vermag, die den Zugriff verhindern würde.

Verschlüsselung, Pseudonymisierung und Aufteilung scheiden für den Gesprächsinhalt aus. **Diese TIA behauptet daher nicht, das Risiko technisch gelöst zu haben.** Sie stützt sich auf Reduktion der Angriffsfläche und auf vertraglich-organisatorische Maßnahmen.

### 4.2 Technische und datenbezogene Maßnahmen (wirksam, weil sie den Bestand verkleinern)

| # | Maßnahme | Status |
|---|---|---|
| **M-1** | **Keine Anrufaufzeichnung, kein gespeichertes Transkript** bei Vapi. Gesprächsinhalt existiert nur flüchtig während des Anrufs. Entzieht CLOUD Act und Herausgabeanordnungen weitgehend den Gegenstand | ✅ verifiziert 08.08.2026 (Screenshot) — Nachprüfung fällig (O-2) |
| **M-2** | **Datenminimierung**: übermittelt werden nur die zur Terminvereinbarung nötigen Angaben | ✅ |
| **M-3** | **Persistenz ausschließlich in der EU** (n8n + CRM auf Hetzner, DE). Kein Datenbestand in den USA | ✅ |
| **M-4** | **Transportverschlüsselung** auf allen Strecken (TLS/SRTP) — wirkt gegen EO 12333 im Transit, nicht gegen Zugriff beim Anbieter | ✅ |
| **M-5** | **Löschfrist** Termindaten ≤ 6 Monate | ✅ |
| **M-6** | **Kein Art.-9-Einsatz** („Sensitivitäts-Riegel") | ⚠️ organisatorisch, nicht technisch erzwungen (4.4) |

### 4.3 Vertragliche und organisatorische Maßnahmen

| # | Maßnahme | Status |
|---|---|---|
| **M-7** | SCC nebst DPA mit Vapi abgeschlossen | ✅ 06.09.2026 |
| **M-8** | **Klausel 15 SCC**: Benachrichtigungspflicht bei Behördenzugriff, Anfechtungspflicht, Transparenzpflicht | ✅ vertraglich vorhanden |
| **M-9** | Unterauftragsverarbeiter-Kontrolle: Vapi teilt Änderungen nach § 3.2 DPA mit (so wurde Soniox bekannt) | ✅ |
| **M-10** | **Hinweis auf das KI-System zu Gesprächsbeginn** (Art. 50 AI Act) — erlaubt es Anrufern, das Gespräch zu beenden, bevor Inhalte entstehen | ✅ |
| **M-11** | Nennung aller Empfänger in DSE und AVV Anlage B | ✅ berichtigt 06.09.2026 |
| **M-12** | **Verfahren für den Fall einer Behördenanfrage** (wer wird informiert, wer widerspricht, wer benachrichtigt Kunden/Betroffene) | ❌ **fehlt** (O-4) |
| **M-13** | Ausstiegspfad: selbst betriebener Sprach-Stack (Stufe 3) | 🟡 in der Roadmap, nicht umgesetzt |

### 4.4 Bekannte Lücken, ausdrücklich benannt

- **M-6 ist eine Absichtserklärung, keine Kontrolle.** Nichts im System hindert daran, den Sprachassistenten für eine Arztpraxis einzurichten. Sobald eine Art.-9-Branche onboardet wird, ist diese TIA **hinfällig** und die Übermittlung neu zu bewerten — bei besonderen Kategorien ist das Restrisiko nach 4.1 nicht mehr vertretbar.
- **Die Region ist erschlossen, nicht bestätigt.** US-Region ist aus der Vapi-Dokumentation und dem fehlenden Enterprise-Onboarding abgeleitet, nicht im Dashboard abgelesen (O-5).
- **M-1 ist der Angelpunkt.** Fällt die Nichtspeicherung — etwa durch eine Konfigurationsänderung oder einen neuen Vapi-Standardwert —, bricht ein wesentlicher Teil dieser Bewertung weg. Deshalb ist die regelmäßige Nachprüfung Pflicht und kein Nice-to-have.

---

## Schritt 5 — Verfahrensschritte

Die Standardvertragsklauseln werden **unverändert** verwendet. Eine Genehmigung oder vorherige Konsultation der Aufsichtsbehörde nach Art. 46 Abs. 3 DSGVO ist damit **nicht erforderlich**. Diese Bewertung wird dokumentiert, im Verarbeitungsverzeichnis verlinkt und auf Verlangen der Aufsichtsbehörde oder eines Kunden vorgelegt (Klausel 14 lit. d SCC).

---

## Schritt 6 — Neubewertung

| # | Auslöser | Frist |
|---|---|---|
| **N-1** | **Ablauf der FISC-Zertifizierungen** | **zwingend vor dem 17.03.2027** |
| **N-2** | Entscheidung des EuGH in C-703/25 P (*Latombe*) | binnen 4 Wochen nach Urteil |
| **N-3** | Reauthorisierung oder Neufassung von FISA 702 | binnen 4 Wochen |
| **N-4** | Änderung der Vapi-Region, -Unterauftragsverarbeiter oder -Konfiguration (insb. Recording) | sofort |
| **N-5** | Onboarding einer Art.-9-Branche | **vor** Inbetriebnahme |
| **N-6** | Turnusmäßig, wenn kein anderer Auslöser greift | jährlich, nächste Prüfung September 2027 |

---

## Ergebnis und Restrisiko

Die Übermittlung an Vapi ist auf Grundlage der Standardvertragsklauseln und der Maßnahmen M-1 bis M-11 **fortführbar**. Ausschlaggebend ist, dass bei Vapi **kein Datenbestand entsteht**: ein Zugriff — ob nach FISA, EO 12333 oder CLOUD Act — träfe im Regelfall auf nichts Gespeichertes, sondern höchstens auf laufende Einzelgespräche von geringem nachrichtendienstlichem Wert.

**Das Restrisiko ist nicht null.** Es besteht darin, dass Gesprächsinhalte während des Anrufs im Klartext auf US-Infrastruktur verarbeitet werden und dafür nach EDPB-Bewertung **keine wirksame technische Gegenmaßnahme** existiert. Dieses Risiko wird bewusst getragen, weil die Datenkategorien eng, das Volumen gering, die Verweildauer flüchtig und die Betroffenen durch den KI-Hinweis zu Gesprächsbeginn vorgewarnt sind.

**Dauerhaft aufgelöst wird es nur durch den Ausstieg** aus dem US-Sprach-Stack (M-13, Stufe 3). Bis dahin gilt: diese Bewertung ist an M-1 gebunden und vor dem 17.03.2027 zu erneuern.

---

## Offene Punkte

| # | Punkt | Wer |
|---|---|---|
| **O-1** | AVV Anlage B um **Modul 2** für die eigene NexAI-Rufnummer ergänzen (bislang nur Modul 3) | Anwalt / NexAI |
| **O-2** | **Recording- und Transkript-Einstellung in Vapi nachprüfen** und mit Datum belegen — letzter Beleg 08.08.2026 | Max |
| **O-3** | Vapi um **Transparenzbericht / Auskunft zu Behördenanfragen** bitten (Klausel 15 SCC) | Max |
| **O-4** | **Verfahren für Behördenanfragen** schriftlich festlegen (M-12) | NexAI |
| **O-5** | **Region im Vapi-Dashboard** ablesen und hier eintragen | Max |
| **O-6** | Anwaltliche Prüfung — gemeinsam mit DSE und Vertragswerk | Anwalt |

---

## Quellen

- EDPB, Empfehlungen 01/2020 zu Maßnahmen zur Ergänzung von Übermittlungstools, Fassung 2.0, 18.06.2021 — insb. Anwendungsfall 6 und Rn. 43.3
- Durchführungsbeschluss (EU) 2021/914 der Kommission (Standardvertragsklauseln), Module 2 und 3, Klauseln 14 und 15
- Congressional Research Service, R48592, *FISA Section 702 and the 2024 Reforming Intelligence and Securing America Act*
- Brennan Center for Justice, *Section 702 Surveillance Will Continue Until March 2027* — zur Fortwirkung der FISC-Zertifizierungen nach dem Auslaufen
- EuG, Urteil vom 03.09.2025, T-553/23 (*Latombe/Kommission*); Rechtsmittel EuGH C-703/25 P, eingelegt 31.10.2025
- Executive Order 14086 vom 07.10.2022
- Vapi, *Data Flow* und *GDPR*, docs.vapi.ai/security-and-privacy — zur US-Region und zum eingefrorenen EU-Support
- Vapi Trust Center, security.vapi.ai — Unterauftragsverarbeiterliste, Mitteilung nach § 3.2 DPA (Soniox)
- Eigene Erhebung: Vapi-Dashboard und Anrufliste, 06.09.2026
