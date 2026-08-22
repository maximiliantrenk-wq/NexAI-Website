"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
  EXAMPLE,
  HORIZONS,
  LEVELS,
  LIMITS,
  ROLES,
  activeCustomers,
  monthlyIncome,
  perCustomerYear,
  type Level,
  type Role,
} from "@/content/commission";

const MONTHS = 24;

const fieldCls =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus-visible:border-blue/60 focus-visible:outline-none";
const labelCls = "mb-2 block text-sm font-medium text-fg";

function toggleCls(active: boolean) {
  return cn(
    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    active
      ? "border-blue/60 bg-blue/10 text-fg"
      : "border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-fg",
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 text-[15px] text-fg">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue">
        <Check className="size-3 text-white" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </p>
  );
}

/** Provisions-Rechner — exakt die Rechenkette des Karrieresystems (content/commission.ts). */
export function CommissionCalculator() {
  const t = useTranslations("Recruiting.calculator");
  const locale = useLocale();

  const [role, setRole] = useState<Role>("closer");
  const [level, setLevel] = useState<Level>("senior");
  const [newPerMonth, setNewPerMonth] = useState(String(EXAMPLE.newPerMonth));
  const [netBase, setNetBase] = useState(String(EXAMPLE.netBase));

  const cf = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const num = (s: string, max: number) => {
    const n = Number(s.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return 0;
    return Math.min(n, max);
  };

  const n = num(newPerMonth, LIMITS.newPerMonth);
  const base = num(netBase, LIMITS.netBase);

  const at = (month: number) =>
    monthlyIncome({ role, level, newPerMonth: n, netBase: base, month });

  const series = Array.from({ length: MONTHS }, (_, i) => at(i + 1).total);
  const peak = Math.max(...series, 1);
  const month12 = at(12);
  const perCustomer = perCustomerYear(role, level, base);

  const reset = () => {
    setRole("closer");
    setLevel("senior");
    setNewPerMonth(String(EXAMPLE.newPerMonth));
    setNetBase(String(EXAMPLE.netBase));
  };

  return (
    <Section id="provision">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Eingaben */}
          <Reveal className="surface-card rounded-2xl p-6 sm:p-8">
            <p className={labelCls}>{t("roleLabel")}</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={toggleCls(role === r)}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>

            <p className={cn(labelCls, "mt-6")}>{t("levelLabel")}</p>
            <div className="flex gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={cn(toggleCls(level === l), "flex-1")}
                >
                  {t(`levels.${l}`)}
                </button>
              ))}
            </div>
            {level === "junior" && (
              <p className="mt-2 text-[13px] text-subtle">{t("juniorHint")}</p>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="cc-new" className={labelCls}>
                  {t("newLabel")}
                </label>
                <input
                  id="cc-new"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={LIMITS.newPerMonth}
                  step={1}
                  value={newPerMonth}
                  onChange={(e) => setNewPerMonth(e.target.value)}
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor="cc-base" className={labelCls}>
                  {t("baseLabel")}
                </label>
                <input
                  id="cc-base"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={LIMITS.netBase}
                  step={100}
                  value={netBase}
                  onChange={(e) => setNetBase(e.target.value)}
                  className={fieldCls}
                />
                <p className="mt-2 text-[13px] text-subtle">{t("baseHint")}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-6 text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {t("reset")}
            </button>
          </Reveal>

          {/* Ergebnis */}
          <Reveal delay={0.08}>
            <div className="surface-card flex h-full flex-col rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-medium text-muted">{t("resultLabel")}</p>
              <p className="mt-3 text-[2.75rem] font-semibold leading-none tracking-tight text-blue-bright sm:text-[3.25rem]">
                {cf.format(month12.total)}
              </p>
              <p className="mt-2 text-sm text-subtle">
                {t("breakdown", {
                  oneTime: cf.format(month12.oneTime),
                  recurring: cf.format(month12.recurring),
                })}
              </p>

              <div className="mt-6 space-y-2.5">
                {[1, ...HORIZONS].map((m) => (
                  <CheckLine key={m}>
                    {t("monthLine", { n: m, value: cf.format(at(m).total) })}
                    <span className="text-subtle">
                      {" · "}
                      {t("customers", { n: activeCustomers(n, m) })}
                    </span>
                  </CheckLine>
                ))}
                <CheckLine>{t("perCustomer", { value: cf.format(perCustomer) })}</CheckLine>
              </div>

              {/* Verlauf über 24 Monate */}
              <div className="mt-6">
                <p className="text-xs text-subtle">{t("chartLabel")}</p>
                <svg
                  viewBox={`0 0 ${MONTHS * 10} 56`}
                  className="mt-2 h-14 w-full"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  {series.map((v, i) => {
                    const h = Math.max(2, Math.round((v / peak) * 52));
                    const month = i + 1;
                    const highlight = (HORIZONS as readonly number[]).includes(month);
                    return (
                      <rect
                        key={month}
                        x={i * 10 + 1}
                        y={56 - h}
                        width={8}
                        height={h}
                        rx={1.5}
                        className={highlight ? "fill-blue-bright" : "fill-blue/35"}
                      />
                    );
                  })}
                </svg>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-subtle">{t("note")}</p>

              <div className="mt-auto pt-6">
                <a
                  href="#bewerbung"
                  className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue via-violet to-purple px-5 text-sm font-medium text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] transition-[transform,box-shadow,filter] hover:brightness-[1.08] active:scale-[0.99] sm:w-auto"
                >
                  {t("cta")}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-[13px] text-muted">{t("ctaHint")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
