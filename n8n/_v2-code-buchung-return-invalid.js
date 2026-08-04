const p = $('Parse & Normalize').first().json;
let result;
if (p.past) {
  result = 'Der genannte Termin liegt in der Vergangenheit. Sag dem Anrufer freundlich, dass du nur zukünftige Termine buchen kannst, und schlage einen der von check_availability genannten Termine vor.';
} else {
  result = 'Ich habe das gewünschte Datum leider nicht sicher verstanden. Sag dem Anrufer freundlich, dass du Tag, Monat und Uhrzeit brauchst, und frag nach einem konkreten Termin, zum Beispiel: am fünfzehnten Juli um elf Uhr.';
}
return [{ json: { results: [{ toolCallId: p.toolCallId, result }] } }];
