"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Check, Loader2, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function NewsletterConfirm() {
  const t = useTranslations("Newsletter");
  const token = useSearchParams().get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  // A real click (not an email prefetch) drives the POST — that is what makes
  // this a genuine opt-in confirmation.
  async function confirm() {
    if (!token || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  // Missing token → nothing to confirm. Otherwise the button state drives the view.
  const view = token ? status : "notoken";
  const busy = view === "loading";
  const done = view === "ok" || view === "error" || view === "notoken";

  return (
    <Section className="grid min-h-[70vh] place-items-center">
      <Container className="max-w-md text-center">
        {view === "ok" ? (
          <IconBadge tone="ok">
            <Check className="size-6" strokeWidth={2.5} />
          </IconBadge>
        ) : view === "error" || view === "notoken" ? (
          <IconBadge tone="warn">
            <AlertCircle className="size-6" strokeWidth={2.5} />
          </IconBadge>
        ) : (
          <IconBadge tone="brand">
            <Mail className="size-6" strokeWidth={2} />
          </IconBadge>
        )}

        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          {view === "ok"
            ? t("successTitle")
            : view === "error"
              ? t("errorTitle")
              : view === "notoken"
                ? t("noTokenTitle")
                : t("confirmTitle")}
        </h1>

        <p className="mt-4 text-[17px] leading-relaxed text-muted">
          {view === "ok"
            ? t("successBody")
            : view === "error"
              ? t("errorBody")
              : view === "notoken"
                ? t("noTokenBody")
                : t("confirmBody")}
        </p>

        <div className="mt-8 flex justify-center">
          {done ? (
            <Button href="/" variant="secondary">
              {t("backHome")}
            </Button>
          ) : (
            <Button onClick={confirm} disabled={busy} withArrow={!busy}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : t("confirmCta")}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}

function IconBadge({
  tone,
  children,
}: {
  tone: "brand" | "ok" | "warn";
  children: React.ReactNode;
}) {
  const tones = {
    brand: "bg-blue/15 text-blue-bright",
    ok: "bg-blue/15 text-blue-bright",
    warn: "bg-amber-400/15 text-amber-400",
  } as const;
  return (
    <span
      className={`mx-auto grid size-14 place-items-center rounded-2xl ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
