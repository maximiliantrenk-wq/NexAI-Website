// Coolify-Zugang für den „Veröffentlichen“-Knopf. Optional: Ohne die drei
// Variablen bleibt der Knopf aus und die Oberfläche erklärt den Weg von Hand.

export function deployConfigured(): boolean {
  return Boolean(
    process.env.COOLIFY_URL?.trim() &&
      process.env.COOLIFY_TOKEN?.trim() &&
      process.env.COOLIFY_APP_UUID?.trim(),
  );
}
