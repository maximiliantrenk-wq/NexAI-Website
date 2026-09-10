"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);

    if (response?.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const data = await response?.json().catch(() => null);
    setError(data?.error ?? "Anmeldung fehlgeschlagen.");
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-muted">Passwort</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="rounded-md border border-line-strong bg-surface px-3 py-2.5 text-fg outline-none focus-visible:border-blue focus-visible:ring-2 focus-visible:ring-blue/30"
        />
      </label>

      {error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy || password.length === 0}
        className="rounded-md bg-blue px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-bright disabled:opacity-50"
      >
        {busy ? "Einen Moment …" : "Anmelden"}
      </button>
    </form>
  );
}
