# Newsletter — Double-Opt-In (DSGVO)

Der Newsletter im Footer nutzt ein **echtes Double-Opt-In**: Nach der Anmeldung
bekommt der Interessent eine Bestätigungs-E-Mail und wird erst als „angemeldet"
gezählt, wenn er den Link darin anklickt. Genau das verspricht die
Datenschutzerklärung (§ 8).

## Ablauf

1. Besucher trägt seine E-Mail im Footer ein → `POST /api/subscribe`.
2. Der Server erzeugt ein signiertes, 3 Tage gültiges Token (kein Datenbank­eintrag —
   das Token trägt E-Mail + Ablauf in sich, HMAC-signiert) und schickt dem
   **Interessenten** eine Bestätigungs-E-Mail.
3. Der Interessent öffnet den Link → Seite `/<locale>/newsletter/confirm?token=…`
   → klickt **„Anmeldung bestätigen"** → `POST /api/subscribe/confirm`.
4. Der Server prüft das Token und schickt **dir** (`CONTACT_TO`) eine Notiz
   „Newsletter bestätigt: …" mit Zeitstempel — das ist der Einwilligungs-Nachweis.

Der Bestätigungs-Button (statt eines reinen Klick-Links) verhindert, dass
E-Mail-Scanner die Anmeldung durch automatisches Vorab-Laden versehentlich bestätigen.

## ⚠️ Damit die Bestätigungsmail beim Interessenten ankommt

Die Bestätigungsmail geht an eine **fremde Adresse**. Der Resend-Standardabsender
`onboarding@resend.dev` stellt aber **nur an den Resend-Kontoinhaber** (mbt@…) zu.
**Ohne verifizierte Absender-Domain funktioniert das DOI in der Praxis nicht.**

Einmalig zu erledigen:

1. In **Resend** die Domain `nex-a-i.com` verifizieren (DNS-Records SPF/DKIM setzen).
   → https://resend.com/domains
2. In **Vercel** die Env-Variable setzen (Production + Preview):
   - `CONTACT_FROM` = z. B. `NEXAI <newsletter@nex-a-i.com>`  ← verifizierter Absender
   - danach **redeploy**.

Das ist derselbe Schritt, der auch das Kontakt-/Partnerformular auf einen
Marken-Absender hebt.

## Env-Variablen

| Variable | Pflicht | Default | Zweck |
|---|---|---|---|
| `RESEND_API_KEY` | ja | – | Mailversand (Resend) |
| `CONTACT_FROM` | **faktisch ja** | `onboarding@resend.dev` | Absender; muss verifiziert sein, sonst erreicht die Bestätigung keine fremde Adresse |
| `CONTACT_TO` | nein | `mbt@nex-a-i.com` | Empfänger der internen „bestätigt"-Notiz |
| `NEXT_PUBLIC_SITE_URL` | nein | `https://nex-a-i.com` | Basis-URL für den Bestätigungslink in der Mail |
| `NEWSLETTER_SECRET` | nein | fällt auf `RESEND_API_KEY` zurück | HMAC-Schlüssel für das Bestätigungs-Token |

## Grenzen (bewusst, ohne Datenbank)

- Es gibt **keinen Verteiler** — bestätigte Anmeldungen landen als E-Mail bei dir.
  Für echten Versand später ein Tool anbinden (Brevo/Mailchimp) und die
  bestätigte Adresse dort eintragen.
- Ein doppelter Klick auf den Bestätigungslink löst eine zweite interne Notiz aus
  (kein Status gespeichert) — unkritisch.
