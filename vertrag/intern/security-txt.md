# Inhalt für `/.well-known/security.txt` (nex-a-i.com)

Stand: 18.10.2026 · intern · Einbau übernimmt die Website-Sitzung (Datei `public/.well-known/security.txt`).

## Warum

- Anhang I Teil II Nr. 6 CRA: Hersteller müssen „u. a. eine Kontaktadresse für die Meldung der in dem Produkt
  mit digitalen Elementen entdeckten Schwachstellen angeben“.
- Art. 13 Abs. 17 UAbs. 2 CRA: Die zentrale Anlaufstelle muss „von den Nutzern leicht ermittelt werden“ können.
  `security.txt` ist dafür der übliche, maschinenlesbare Ort.
- Format: RFC 9116. Pflichtfelder sind `Contact` (mindestens einmal) und `Expires` (genau einmal). Das RFC
  empfiehlt, `Expires` „less than a year into the future“ zu setzen. Mehrere `Contact`-Zeilen stehen in der
  Reihenfolge der Präferenz. Die Datei muss über `https` unter `/.well-known/` liegen und als
  `text/plain; charset=utf-8` ausgeliefert werden.

Quellen: VO (EU) 2024/2847, konsolidierte Fassung vom 20.11.2024 (über `recht`, 18.10.2026);
RFC 9116 (rfc-editor.org, 18.10.2026).

## Variante B – sofort einbauen (solange security@ noch nicht existiert)

```
# Sicherheitskontakt der NexAI – Next Generation Artificial Intelligence GbR
# Richtlinie zur koordinierten Offenlegung: siehe Policy
Contact: mailto:mbt@nex-a-i.com
Contact: tel:+4917680714816
Expires: 2027-09-30T22:00:00.000Z
Preferred-Languages: de, en
Policy: https://nex-a-i.com/de/sicherheit
Canonical: https://nex-a-i.com/.well-known/security.txt
```

## Variante A – einbauen, sobald security@nex-a-i.com angelegt und getestet ist

```
# Sicherheitskontakt der NexAI – Next Generation Artificial Intelligence GbR
# Richtlinie zur koordinierten Offenlegung: siehe Policy
Contact: mailto:security@nex-a-i.com
Contact: mailto:mbt@nex-a-i.com
Contact: tel:+4917680714816
Expires: 2027-09-30T22:00:00.000Z
Preferred-Languages: de, en
Policy: https://nex-a-i.com/de/sicherheit
Canonical: https://nex-a-i.com/.well-known/security.txt
```

## Hinweise für den Einbau

1. **Policy-Pfad abstimmen.** `https://nex-a-i.com/de/sicherheit` ist ein Vorschlag. Dort muss die
   Offenlegungsrichtlinie stehen (Quelle: `vertrag/build/docs/CRA_Offenlegungsrichtlinie.json`). Liegt sie
   woanders, die `Policy`-Zeile anpassen. Der Pfad steht auch in der Richtlinie (Ziffer 7) und in der
   Nutzerinformation (Teil B Nr. 2), dort in eckigen Klammern.
2. **Kein Locale-Präfix nötig.** Der Matcher in `proxy.ts` nimmt Pfade mit Punkt (`.*\..*`) aus, also wird
   `/.well-known/security.txt` nicht nach `/de/…` umgeleitet, sondern aus `public/` ausgeliefert. Nach dem
   Ausrollen prüfen: `curl -sI https://nex-a-i.com/.well-known/security.txt` → 200 und `content-type: text/plain`.
3. **Telefon** ist nur Mo–Fr 09:00–17:00 Uhr besetzt. Die Nummer steht ohnehin im Impressum; sie erfüllt
   Art. 13 Abs. 17 UAbs. 3 CRA (Wahl des Kommunikationsmittels, „nicht auf automatisierte Instrumente
   beschränkt“).
4. **Optional, später:** `Encryption:` mit Link auf einen OpenPGP-Schlüssel, sobald einer existiert; die Datei
   kann dann auch mit OpenPGP signiert werden (RFC 9116 sieht das ausdrücklich vor).

## Pflege: `Expires`

- `2027-09-30T22:00:00.000Z` = 01.10.2027, 00:00 Uhr deutscher Zeit (knapp ein Jahr, wie empfohlen).
- **Spätestens bis 01.09.2027 erneuern** (neues Datum, wieder unter einem Jahr) und dabei Kontakte und
  Policy-Pfad prüfen. Eine abgelaufene Datei gilt nach RFC 9116 als veraltet.
- Wiedervorlage: in Max' Kalender eintragen [Termin 01.09.2027].
