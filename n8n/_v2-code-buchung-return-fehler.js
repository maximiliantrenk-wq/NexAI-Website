const p = $('Parse & Normalize').first().json;
const result = 'Es tut mir leid, bei der Buchung gab es gerade ein technisches Problem. Sag dem Anrufer freundlich, dass du seinen Wunsch aufgenommen hast und sich das Team zeitnah bei ihm meldet, um den Termin zu bestätigen.';
return [{ json: { results: [{ toolCallId: p.toolCallId, result }] } }];
