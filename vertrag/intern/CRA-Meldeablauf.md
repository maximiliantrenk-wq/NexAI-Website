# CRA-Meldeablauf (Art. 14) – eine Seite

Stand: 18.10.2026 · intern · Norm: VO (EU) 2024/2847, konsolidierte Fassung vom 20.11.2024 (über `recht`).

**Greift erst, wenn ein erfasstes Produkt auf dem Markt ist:** erste CRM-Kauflizenz beim Kunden installiert
oder erste App im Store (dann auch ihr Backend, EG 11). Reines SaaS ist nicht erfasst (EG 12).
**Stand 18.10.2026: nichts davon auf dem Markt → heute keine Meldepflicht.** Der Ablauf muss trotzdem
bereitstehen: Art. 14 gilt seit 11.09.2026 (Art. 71 Abs. 2 UAbs. 2) und auch für Produkte, die vor dem
11.12.2027 in Verkehr kommen (Art. 69 Abs. 3).

## 1. Was löst die Meldung aus?

| Auslöser | Definition (Wortlaut) |
|---|---|
| **aktiv ausgenutzte Schwachstelle** (Abs. 1) | Art. 3 Nr. 42: „verlässliche Nachweise dafür vorliegen, dass ein böswilliger Akteur sie in einem System ohne Zustimmung des Systemeigners ausgenutzt hat“ |
| **schwerwiegender Sicherheitsvorfall** (Abs. 3) | Abs. 5: wirkt sich negativ aus auf die Fähigkeit, „Verfügbarkeit, Authentizität, Integrität oder Vertraulichkeit von sensiblen oder wichtigen Daten oder Funktionen zu schützen“, oder führt zu „Ausführung eines böswilligen Codes“ |

Eine bloß gemeldete, nicht ausgenutzte Schwachstelle löst **keine** Pflichtmeldung aus → Offenlegungsrichtlinie
(`CRA_Offenlegungsrichtlinie`), freiwillige Meldung möglich (Art. 15).

## 2. Wer?

- **Verantwortlich:** Maximilian Trenk. **Vertretung** bei Urlaub und Krankheit: Jason Brian Merklein (intern „Brian“), festgelegt von Max am 18.10.2026.
- Wer zuerst davon erfährt (auch Bote, Wächter, Kundenanruf), schreibt sofort **Uhrzeit der Kenntnis** ins
  Vorgangsprotokoll [Ablage: …]. **Ab da laufen die Fristen.**

## 3. Wohin?

- **Einheitliche Meldeplattform der ENISA** (Art. 16), über den Endpunkt des koordinierenden CSIRT des
  Mitgliedstaats der Hauptniederlassung (Art. 14 Abs. 7) = **Deutschland → BSI** (§ 5 Abs. 1 Satz 2 BSIG:
  „Das Bundesamt ist dabei der nationale Koordinator …“). Meldung geht „gleichzeitig“ an CSIRT und ENISA.
- **Konto legt Max an** (vorher, nicht im Ernstfall). Adresse der Plattform: [beim Anlegen eintragen].
  Zugangsdaten nur im Passwortspeicher.

## 4. Fristen und Inhalt

| Stufe | Schwachstelle (Abs. 2) | Schwerer Vorfall (Abs. 4) | Inhalt |
|---|---|---|---|
| **Frühwarnung** | „innerhalb von 24 Stunden“ nach Kenntnis | „innerhalb von 24 Stunden“ | Mitgliedstaaten, in denen das Produkt bereitgestellt ist; beim Vorfall: Verdacht auf rechtswidrige/böswillige Handlung? |
| **Meldung** | „innerhalb von 72 Stunden“ | „innerhalb von 72 Stunden“ | Produkt, Art der Ausnutzung bzw. des Vorfalls, ergriffene Maßnahmen, was Nutzer tun können, Sensibilität |
| **Abschlussbericht** | „spätestens 14 Tage, nachdem eine Korrektur- oder Risikominderungsmaßnahme zur Verfügung steht“ | „innerhalb eines Monats nach Übermittlung der Meldung“ (72-h-Meldung) | Beschreibung, Schwere, Auswirkung; Täter (falls bekannt) bzw. Ursache; Update/Abhilfe |

Das CSIRT kann einen Zwischenbericht verlangen (Abs. 6).

**Kleinstunternehmen (Art. 64 Abs. 10 lit. a):** Für das Versäumen der **24-h-Frist** (Abs. 2 lit. a, Abs. 4
lit. a) gibt es keine Geldbuße. NexAI ist Kleinstunternehmen (weniger als 10 Beschäftigte, Umsatz/Bilanz
höchstens 2 Mio. EUR, Empf. 2003/361/EG Anhang Art. 2 Abs. 3). **Die Pflicht bleibt**, und für die
**72-h-Meldung und den Abschlussbericht gilt die Ausnahme nicht** (Bußgeld bis 15 Mio. EUR / 2,5 %,
Art. 64 Abs. 2).

## 5. Nutzer informieren (Abs. 8)

- Nach Kenntnis die **betroffenen Kunden** informieren, „gegebenenfalls alle Nutzer“, mit
  Risikominderungs- und Korrekturmaßnahmen, die sie selbst ergreifen können.
- Dafür nötig: **Lizenzregister** (Kunde, technische Kontaktadresse, installierte Version, Mitgliedstaat)
  [Ablage: …]. Ohne Register sind weder Abs. 8 noch die Mitgliedstaaten-Angabe der Frühwarnung erfüllbar.
- Versäumt NexAI das, darf das CSIRT die Nutzer selbst informieren.

## 6. Daneben nicht vergessen

- **Fremdkomponente betroffen** → Schwachstelle auch dem Hersteller/Betreuer melden (Art. 13 Abs. 6).
- **Personenbezogene Daten betroffen:** Bei der Kauflizenz ist der Kunde Verantwortlicher; NexAI meldet ihm
  eine Verletzung, die es als Auftragsverarbeiter (Wartungszugriff) bemerkt, „unverzüglich“ (Art. 33 Abs. 2
  DSGVO). Bei NexAIs eigenen Diensten meldet NexAI selbst der Aufsichtsbehörde, „möglichst binnen 72 Stunden“
  (Art. 33 Abs. 1 DSGVO). Das ist ein **zweiter, getrennter** Meldeweg.
- **Dokumentieren:** jede Schwachstelle und jeden Vorfall im Vorgang festhalten, Risikobewertung
  aktualisieren (Art. 13 Abs. 7); nach Behebung Sicherheitshinweis veröffentlichen (Anhang I Teil II Nr. 4).

## 7. Vorbereitung (einmalig, Max)

1. security@nex-a-i.com anlegen und testen; dann `security.txt` Variante A (`vertrag/intern/security-txt.md`).
2. Konto auf der ENISA-Meldeplattform anlegen; Jason Brian Merklein als Vertretung ebenfalls berechtigen.
3. Lizenzregister anlegen, bevor die erste Kauflizenz ausgeliefert wird.
4. Diesen Ablauf beim ersten Verkauf einmal trocken durchspielen (Uhrzeit → 24 h → 72 h).
