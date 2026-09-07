# Sperrvermerk — keine Sprachagenten für Berufsgeheimnisträger

**Stand:** 07.09.2026 · **Entscheidung getroffen von:** Maximilian Trenk (Gesellschafter) · **Dokumentiert durch:** interne Compliance-Prüfung vom 07.09.2026

> ⚠️ **Kein Rechtsrat.** Dieses Dokument hält eine unternehmerische Entscheidung samt ihrer Gründe fest. Die zugrunde liegende strafrechtliche Bewertung ist eine Vorprüfung und steht unter Anwaltsvorbehalt.

**Verwandte Dokumente:** [`DSFA-Voice-Agent.md`](DSFA-Voice-Agent.md) · [`TIA-Vapi-Drittlandtransfer.md`](TIA-Vapi-Drittlandtransfer.md) · [`AVV-Subprozessoren-Tracker.md`](AVV-Subprozessoren-Tracker.md)

---

## 1. Die Entscheidung

**NexAI bietet Berufsgeheimnisträgern derzeit keine KI-Sprachagenten an** — weder im Verkauf noch als Demonstration, Pilot oder unentgeltlicher Test.

Betroffen sind insbesondere die in § 203 Abs. 1 StGB genannten Berufsgruppen:

| Gesperrt | Nicht gesperrt |
|---|---|
| Ärzte, Zahnärzte, Tierärzte, Apotheker | Autohäuser, Kfz-Werkstätten |
| Psychologische Psychotherapeuten, Kinder- und Jugendlichenpsychotherapeuten | Handwerksbetriebe aller Gewerke |
| Rechtsanwälte, Notare, Patentanwälte | Gastronomie, Hotellerie, Dienstleister |
| Steuerberater, Wirtschaftsprüfer | Handel und Einzelhandel |
| Ehe-, Familien-, Erziehungs- und Suchtberatungsstellen, Sozialarbeiter | **Finanzberatung und Versicherungsmakler** — siehe Abschnitt 4 |
| Private Kranken-, Unfall- und Lebensversicherer | |

Im Zweifel gilt ein Interessent als gesperrt, bis das Gegenteil geprüft ist. Die Sperre gilt für den **Sprachagenten**; über andere Leistungen (etwa reine Automatisierung ohne Zugang zu Mandanten- oder Patientendaten) ist gesondert und im Einzelfall zu entscheiden.

## 2. Der tragende Grund: § 203 StGB ist Strafrecht

Berufsgeheimnisträger unterliegen einer **strafbewehrten** Schweigepflicht. Seit der Neuregelung von 2017 dürfen sie „sonstige mitwirkende Personen" einbinden, soweit das für deren Tätigkeit erforderlich ist — dazu zählen ausdrücklich IT-, Cloud- und KI-Dienstleister. Daran hängen drei Pflichten, und die dritte ist für uns entscheidend:

1. Der Geheimnisträger muss die mitwirkende Person **zur Verschwiegenheit verpflichten**; unterlässt er es, macht er sich strafbar.
2. Die **mitwirkende Person selbst** macht sich strafbar, wenn sie ein Geheimnis unbefugt offenbart. Die Strafbarkeit erstreckt sich also auf uns, nicht nur auf die Praxis oder die Kanzlei.
3. Bindet die mitwirkende Person ihrerseits Unterauftragnehmer ein, muss sie **diese ebenfalls zur Verschwiegenheit verpflichten**.

Punkt 3 ist der Grund für diesen Sperrvermerk. Unsere Sprachkette läuft über **Vapi, Soniox und OpenAI in den Vereinigten Staaten**. Eine Verpflichtung auf die deutsche Schweigepflicht nach § 203 StGB ist von diesen Anbietern praktisch nicht zu erhalten. Damit ist die Kette nicht schließbar — nicht aus Nachlässigkeit, sondern strukturell.

**Das ist der Unterschied zu allen anderen offenen Datenschutzpunkten:** Diese führen im schlimmsten Fall zu einer Beanstandung oder einem Bußgeld. Hier steht eine Straftat im Raum, und zwar auf beiden Seiten des Vertrags.

## 3. Der zweite Grund: die Drittlandbewertung trägt es nicht

Die Bewertungen für [Vapi](TIA-Vapi-Drittlandtransfer.md) und [OpenAI](TIA-OpenAI-Drittlandtransfer.md) kommen nur deshalb zu einem vertretbaren Ergebnis, weil **keine besonderen Datenkategorien** verarbeitet werden und **nichts gespeichert** wird. Bei einer Arztpraxis ist bereits die Tatsache, dass jemand dort anruft, ein Gesundheitsdatum — unabhängig davon, was gesprochen wird. Damit fällt die Annahme, auf der die gesamte Bewertung ruht.

Hinzu käme: Die [Folgenabschätzung](DSFA-Voice-Agent.md) müsste für diesen Fall vollständig neu erstellt werden und würde mit hoher Wahrscheinlichkeit ein verbleibendes **hohes** Risiko ausweisen — mit der Folge einer vorherigen Konsultation der Aufsichtsbehörde nach Art. 36 DSGVO.

## 4. Was nicht gesperrt ist, und warum

**Finanzberatung und Versicherungsmakler** fallen in der Regel **nicht** unter § 203 Abs. 1 StGB. Die dort genannte Ausnahme betrifft Angehörige von Unternehmen der **privaten Kranken-, Unfall- oder Lebensversicherung** — ein Makler, der solche Verträge vermittelt, ist im Zweifel gesondert zu prüfen. Besondere Datenkategorien fallen bei reiner Finanz- und Vermögensberatung typischerweise nicht an.

**Praktische Folge:** Von den drei zunächst erwogenen Branchen ist dies die einzige, die mit dem heutigen Aufbau bedient werden kann. Sie sollte im Zweifel vor Arzt und Kanzlei angegangen werden — dort ist der Markt heute offen, nicht erst nach dem Umbau.

## 5. Was die Sperre praktisch bedeutet

| Bereich | Regel |
|---|---|
| **Vertrieb** | Keine Angebote, keine Demonstrationen, keine Pilotprojekte für die gesperrten Berufsgruppen. Bei Anfragen ehrlich begründen: „Für Ihre Berufsgruppe gilt die strafbewehrte Schweigepflicht; unser derzeitiger Aufbau nutzt Dienstleister außerhalb Europas, die sich darauf nicht verpflichten lassen. Wir arbeiten an einer europäischen Variante und melden uns, sobald sie steht." Das ist ein besseres Gespräch als jedes Ausweichen. |
| **Onboarding** | Mandanten der gesperrten Gruppen werden als sensibel markiert; für sie darf kein Sprachassistent und keine Rufnummer eingerichtet werden. |
| **Technik** | Der Sensitivitäts-Riegel im CRM verweigert bereits die Aufnahme von Anrufdaten sensibler Mandanten. Er greift jedoch **erst beim Speichern** und muss vor die Einrichtung gezogen werden, damit die Entscheidung technisch durchgesetzt und nicht nur erinnert wird. |
| **Partner und Vertriebspartner** | Die Sperre gehört in die Einweisung. Ein Vertriebspartner, der einen Zahnarzt gewinnt, hat nichts falsch gemacht, wenn ihm niemand gesagt hat, dass das gesperrt ist. |

## 6. Unter welcher Bedingung neu entschieden wird

Die Sperre ist **keine dauerhafte Absage an den Markt**, sondern an den heutigen technischen Aufbau. Sie wird neu bewertet, wenn **alle drei** Voraussetzungen erfüllt sind:

1. **Ein europäischer Sprach-Stack ist im Betrieb** — Spracherkennung, Sprachmodell und Sprachausgabe ohne Drittlandtransfer, betrieben auf eigener oder europäischer Infrastruktur, sodass die Verpflichtungskette nach § 203 StGB geschlossen werden kann.
2. **Die anwaltliche Bewertung liegt vor** — insbesondere zu der Frage, ob und wie wir als mitwirkende Person zu verpflichten sind, ob die Verpflichtung an Unterauftragnehmer weiterzureichen ist, und ob eine reine Terminvergabe ohne Anliegenerfassung anders zu bewerten wäre.
3. **Eine eigene Folgenabschätzung für diesen Fall ist erstellt** und, falls sie ein hohes Restrisiko ausweist, die Aufsichtsbehörde nach Art. 36 DSGVO konsultiert.

**Zuständig für die Wiedervorlage:** Geschäftsführung, gemeinsam mit der Entscheidung über den europäischen Sprach-Stack. Ohne Termin, weil er an ein Ergebnis geknüpft ist und nicht an ein Datum.

---

**Warum dieses Dokument existiert:** Eine unterlassene Verarbeitung muss man nicht begründen — aber man muss belegen können, dass sie bewusst unterblieben ist. Dieser Vermerk verwandelt eine Absicht in eine nachweisbare Entscheidung mit Datum und Grund. Er ist zugleich die Antwort auf die Frage, warum ein KI-Anbieter Gesundheitsdaten *nicht* verarbeitet — eine Frage, die im Prüfungsfall gestellt wird und auf die „haben wir nie gemacht" keine gute Antwort ist.
