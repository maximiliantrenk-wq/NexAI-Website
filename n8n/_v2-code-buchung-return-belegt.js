const s=$('Slot frei?').first().json;
let result;
if(s.alternativen&&s.alternativen.length){result='Der gewünschte Termin '+s.startLabel+' Uhr ist leider belegt. Biete dem Anrufer diese freien Alternativen an und frage, welche passt: '+s.alternativen.join(' | ')+'. Buche danach den gewählten Termin.';}
else{result='Der gewünschte Termin ist leider belegt und ich habe in den nächsten 14 Tagen keine Alternative gefunden. Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.';}
return [{ json: { results: [{ toolCallId: s.toolCallId, result }] } }];
