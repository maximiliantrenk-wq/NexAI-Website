// Erzeugt den Wert für ADMIN_PASSWORD_HASH.
//
//   node scripts/admin-password.mjs "mein-passwort"
//
// Ausgabe in Coolify als Umgebungsvariable eintragen. Das Passwort selbst wird
// nirgends gespeichert — aus dem Hash lässt es sich nicht zurückrechnen.

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Bitte ein Passwort mit mindestens 12 Zeichen angeben:");
  console.error('  node scripts/admin-password.mjs "…"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log("\nADMIN_PASSWORD_HASH=" + `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`);
console.log("ADMIN_SESSION_SECRET=" + randomBytes(32).toString("hex") + "\n");
