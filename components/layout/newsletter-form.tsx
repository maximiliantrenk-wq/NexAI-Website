"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("request failed");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p className="mt-3 flex items-center gap-2 text-sm text-fg">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue">
          <Check className="size-3 text-white" strokeWidth={3} />
        </span>
        {t("newsletterSuccess")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 max-w-sm">
      <div className="flex items-center gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletterPlaceholder")}
          aria-label={t("newsletterPlaceholder")}
          className="h-10 min-w-0 flex-1 rounded-full border border-line bg-white/[0.03] px-4 text-sm text-fg placeholder:text-subtle focus-visible:border-blue/60"
        />
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="grid h-10 shrink-0 place-items-center rounded-full bg-white/10 px-4 text-sm font-medium text-fg transition-colors hover:bg-white/15 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            t("newsletterCta")
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">{t("newsletterError")}</p>
      )}
    </form>
  );
}
