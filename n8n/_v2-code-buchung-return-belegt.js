const s = $('Slot frei?').first().json;
const alt = (s.alternativen && s.alternativen.length) ? s.alternativen.join(' | ') : '';
let result;
if (s.ausserhalb) {
  result = 'Der gewünschte Zeitpunkt ' + s.startLabel + ' liegt außerhalb der Beratungszeiten. '
    + 'Wir beraten Montag bis Freitag von 9 bis 17 Uhr und samstags von 9 bis 12 Uhr. '
    + (alt
      ? 'Nenne dem Anrufer freundlich die Zeiten und biete diese freien Termine an: ' + alt + '. Buche danach den gewählten Termin.'
      : 'Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.');
} else if (s.zuKurzfristig) {
  result = 'Der gewünschte Termin ' + s.startLabel + ' ist zu kurzfristig, wir brauchen mindestens zwei Stunden Vorlauf. '
    + (alt
      ? 'Biete dem Anrufer diese freien Termine an und frage, welcher passt: ' + alt + '. Buche danach den gewählten Termin.'
      : 'Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.');
} else if (alt) {
  result = 'Der gewünschte Termin ' + s.startLabel + ' Uhr ist leider belegt. Biete dem Anrufer diese freien Alternativen an und frage, welche passt: ' + alt + '. Buche danach den gewählten Termin.';
} else {
  result = 'Der gewünschte Termin ist leider belegt und ich habe in den nächsten 14 Tagen keine Alternative gefunden. Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.';
}
return [{ json: { results: [{ toolCallId: s.toolCallId, result }] } }];
