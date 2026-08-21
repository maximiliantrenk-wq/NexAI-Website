# PBX — Asterisk zwischen easybell und Vapi

Sicherung der Asterisk-Konfiguration von **178.105.12.207** (gleiche Box wie das CRM).
Stand: **20.08.2026**, seit diesem Tag im Produktivbetrieb.

Die `.conf`-Dateien sind eine **wortgleiche Kopie vom Server** — mit einer Ausnahme:
`password=` in `pjsip.conf` ist durch einen Platzhalter ersetzt. Das echte SIP-Passwort
steht ausschließlich auf dem Server (`/etc/asterisk/pjsip.conf`, `chmod 600`).

> Zwei Kopfkommentare in `pjsip.conf` („nur ausgehend", „KEINE Registrierung") stammen aus
> dem ursprünglichen Entwurf und sind überholt. Sie stehen bewusst noch drin, damit die
> Sicherung dem Server exakt entspricht. Es gilt, was hier beschrieben ist.

## Warum es diese Anlage überhaupt gibt

Vapi kann zwei Dinge nicht, die wir brauchen:

1. **Ausgehende Anrufe.** Vapi sendet nachweislich *kein einziges Paket* an ein konfiguriertes
   eigenes Outbound-Gateway — geprüft mit nackter IP, mit Hostname und mit einem frisch
   angelegten Credential, jedes Mal 0 Pakete im `tcpdump` bei offenem Port.
   Vapis Anrufprotokoll meldet dabei `no-answer` — **das sieht aus wie „hat geklingelt",
   bedeutet hier aber „es wurde nie etwas gesendet".**
2. **Die Absender-Identität setzen.** easybell prüft den From-User-Part gegen den
   SIP-Benutzernamen `K4061981T1`; Vapi leitet ihn aus der Rufnummer ab → dauerhaft `407`.
   Asterisk kann es (`from_user`), easybell hat den Mechanismus schriftlich bestätigt.

Asterisk übernimmt deshalb die Carrier-Seite komplett.

## Wie ein Anruf läuft

```
Eingehend
  Anrufer → easybell → (SIP-Registrierung) → Asterisk
          → Dial(PJSIP/+4979593100191@vapi-out) → Vapi → Assistent

Weiterleitung
  Vapi schickt REFER → landet bei Asterisk (nicht bei easybell, das kann kein REFER)
          → Kontext from-vapi → Weiche auf "gruppe"
          → Dial(PJSIP/<Max>@easybell & PJSIP/<Jason>@easybell, 30)
          → beide Handys klingeln parallel
```

## Rufgruppe: Asterisk wählt selbst

Früher ging der Transfer an easybells Rufgruppen-Nummer `…196`, und **easybell** verteilte
auf die Handys. Über dessen Verhalten hatten wir keine Kontrolle: Sobald ein Ziel den Ruf
beendete, war der ganze Ruf beendet.

Jetzt entscheidet eine Weiche in `[from-vapi]`: Ist das Transfer-Ziel `004979593100196`,
springt der Ruf nach `gruppe` und Asterisk wählt **beide Handys direkt und parallel**.
Lehnt ein Ziel ab, laufen die übrigen weiter. Auf Paketebene bestätigt — im Mitschnitt eines
echten Transfers gehen INVITEs an beide Handynummern raus, nicht mehr an `…196`.
Die easybell-Rufgruppe bleibt bestehen und greift, falls je direkt dorthin gewählt wird.

## ⚠️ Die Mailbox gewinnt jede Rufgruppe

Ein Handy, das man **wegdrückt**, lehnt den Anruf nicht ab — es leitet ihn per
*Rufumleitung bei besetzt* sofort auf die Mailbox, und **die nimmt ab**. Für jede Rufgruppe
sieht das aus wie „jemand ist rangegangen": es wird dorthin verbunden, alle anderen
Telefone verstummen. Ein echter Kunde landet dann auf einer privaten Mailbox.

**Kein System kann von außen unterscheiden, ob ein Mensch oder ein Anrufbeantworter
abgenommen hat.** Das ist weder ein Asterisk- noch ein easybell-Fehler.

Gelöst am 21.08. durch **Löschen der Rufumleitungen auf beiden Handys** (`##67#` bei besetzt,
`##61#` bei Nichtannahme, `##62#` bei Handy aus; `##002#` löscht alles, Kontrolle per
`*#67#`). Preis: auf diesen Handys gibt es dadurch **gar keine Mailbox mehr**, auch privat nicht.

*Alternative, falls die Mailbox je zurück soll:* Annahme-Bestätigung in der Anlage —
`Dial(...,30,U(annahme^s^1))` mit einer Ansage „zum Annehmen bitte die Eins drücken".
Eine Mailbox drückt keine Eins und fällt damit raus; die privaten Mailboxen können bleiben.

## Roboter-Testanruf

`[robo-test]` löst den kompletten Transfer **ohne menschlichen Anrufer** aus: Asterisk wählt
über easybell die eigene DID, der Agent geht ran, und nach 11 Sekunden spielt Asterisk die
Ansage „Ich möchte bitte einen Mitarbeiter sprechen" ab.

```bash
asterisk -rx 'channel originate PJSIP/004979593100191@easybell extension s@robo-test'
```

Die Ansage liegt als `/var/lib/asterisk/sounds/nexai-wunsch.wav` (8 kHz, 16 Bit, mono).
Neu erzeugen auf einem Mac:

```bash
say -v Anna -r 165 -o w.aiff "Ich möchte bitte einen Mitarbeiter sprechen."
afconvert -f WAVE -d LEI16@8000 -c 1 w.aiff nexai-wunsch.wav
```

Der Testruf dreht eine Schleife über easybell und belegt mehrere Sprachkanäle.
**Ein fehlgeschlagener Testruf ist kein Beweis für einen Produktionsfehler** — genau das hat
am 21.08. beinahe zu einem unnötigen Rollback geführt.

## ⚠️ `rtp_keepalive=1` — der Schalter, ohne den es still bleibt

**Vapis Medienserver und easybell senden beide erst RTP, wenn sie selbst zuerst RTP empfangen.**
Asterisk als reiner Vermittler hat von sich aus nichts zu senden → jede Seite wartet auf die
andere → **Gespräch steht, aber niemand hört etwas.**

Nachgewiesen mit identischen Anrufen, bei denen nur die Anwendung getauscht wurde:

| Asterisk-Anwendung | RTP von Vapi |
|---|---|
| `Milliwatt` (sendet sofort Ton) | 1346 Pakete |
| `Wait 20` (schweigt) | **0** |
| `Wait 20` **mit `rtp_keepalive=1`** | **990** |

`rtp_keepalive=1` steht deshalb an **beiden** Endpoints (`[easybell]`, `[vapi-out]`).
**Nicht entfernen** — die Anlage wird sonst wieder stumm.

## Was auf der Vapi-Seite dazu passen muss

- Nummer **`+4979593100191`** (Ressource `872b5299`) liegt auf Credential
  **`18824f20`** — genau dem, an das `vapi-out` sendet. Liegt sie woanders, nimmt Vapi den
  Anruf an, sendet ~1,7 s Medien, legt auf und **legt nicht einmal einen Anrufeintrag an**.
- Credential `18824f20` erlaubt eingehend `178.105.12.207/32` sowie easybells
  `195.185.187.0/27` und `195.52.221.128/27`; **`sipRegisterPlan` muss `null` bleiben**.
- Transfer-Tool `452469aa`: **`sipVerb: refer`** (der `fallbackPlan` bleibt als Rückfallebene).
- `[vapi-out]` braucht **`context=from-vapi`**, sonst findet das REFER kein Ziel im Dialplan.

## Betrieb

- **easybell „Eingehende Anrufe" steht auf SIP-Passwort** (Registrierung), nicht auf FQDN.
- **Kein automatischer Rückfall:** easybell kennt nur einen Eingangsmodus. Fällt Asterisk aus,
  ist das Telefon tot, bis im Portal wieder auf FQDN umgestellt wird — und das geht nur,
  solange die FQDN-Integration (9,95 €/Mon.) gebucht ist. Deshalb vorerst **nicht kündigen**.
- Überwacht wird die Registrierung über `/usr/local/bin/asterisk-health.py`
  (systemd-Dienst `asterisk-health`, Port 9101): `200` solange registriert, sonst `503`.
  Der CRM-Wächter fragt diese URL ab und mailt bei Ausfall und Rückkehr.
- Registrierung prüfen: `asterisk -rx "pjsip show registrations"` → muss `Registered` zeigen.

## Wiederherstellen

```bash
scp pbx/*.conf root@178.105.12.207:/etc/asterisk/
# echtes SIP-Passwort in /etc/asterisk/pjsip.conf eintragen, dann:
ssh root@178.105.12.207 'chmod 600 /etc/asterisk/pjsip.conf && systemctl restart asterisk && sleep 8 && asterisk -rx "pjsip show registrations"'
```

## Diagnose, die sich bewährt hat

| Werkzeug | wofür |
|---|---|
| `asterisk -rx "pjsip show channelstats"` | Rx/Tx-Zähler pro Bein **während** des Gesprächs — trennt echtes Problem von Messfehler |
| `channel originate PJSIP/<ziel> application Milliwatt` | Medientest **ohne** echten Anruf und ohne Produktionsrisiko |
| dasselbe mit `application Wait 20` | Gegenprobe: sendet die Gegenstelle auch, wenn wir schweigen? |
| `tcpdump -n -i any 'udp and not port 53'` | **breit** filtern — ein enger Filter kann „kein RTP" nicht von „RTP woanders" unterscheiden |
