"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "money" | "time";
type Period = "day" | "week" | "month" | "year";

const PERIODS: Period[] = ["day", "week", "month", "year"];
// Simple, head-checkable chain (identical to the sales deck):
// 5 working days = 1 week · 4 weeks = 1 month · 12 months = 1 year.
const YEAR_FACTOR: Record<Period, number> = { day: 240, week: 48, month: 12, year: 1 };
const MONTH_FACTOR: Record<Period, number> = { day: 20, week: 4, month: 1, year: 1 / 12 };

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
    <p className="flex items-center gap-2.5 text-[15px] text-fg">
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue">
        <Check className="size-3 text-white" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </p>
  );
}

export function RoiCalculator() {
  const t = useTranslations("Roi");
  const locale = useLocale();

  const [mode, setMode] = useState<Mode>("money");
  const [period, setPeriod] = useState<Period>("day");

  // money inputs
  const [missed, setMissed] = useState("20");
  const [value, setValue] = useState("50");
  const [rate, setRate] = useState("75");
  // time inputs
  const [calls, setCalls] = useState("20");
  const [duration, setDuration] = useState("5");

  const nf = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const cf = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const num = (s: string) => {
    const n = Number(s.replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const factor = YEAR_FACTOR[period];
  const monthFactor = MONTH_FACTOR[period];
  // Show the intermediate "per month" rung only when the input is per day/week.
  const showMonth = period === "day" || period === "week";
  const periodLabel = t(`periods.${period}`);
  const isMoney = mode === "money";

  // Money: gross loss (calls × value) is the headline; the voice agent recovers
  // gross × capture-rate.
  const grossPer = num(missed) * num(value);
  const recoveredPer = grossPer * (num(rate) / 100);
  // Time: minutes saved (calls × duration).
  const timePerMin = num(calls) * num(duration);

  const fmtDuration = (min: number) => {
    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);
    const hu = t("units.h");
    const mu = t("units.min");
    if (h > 0 && m > 0) return `${nf.format(h)} ${hu} ${nf.format(m)} ${mu}`;
    if (h > 0) return `${nf.format(h)} ${hu}`;
    return `${nf.format(m)} ${mu}`;
  };

  const bigResult = isMoney ? cf.format(grossPer) : fmtDuration(timePerMin);
  const timeYearValue = `${nf.format(Math.round((timePerMin * factor) / 60))} ${t("units.h")}`;
  const timeMonthValue = `${nf.format(Math.round((timePerMin * monthFactor) / 60))} ${t("units.h")}`;
  const workdays = nf.format(Math.round((timePerMin * factor) / 60 / 8));

  const numberInput = (
    v: string,
    set: (s: string) => void,
    labelText: string,
    max?: number,
  ) => (
    <div>
      <label className={labelCls}>{labelText}</label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        value={v}
        onChange={(e) => set(e.target.value)}
        className={fieldCls}
      />
    </div>
  );

  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Controls */}
          <Reveal className="surface-card rounded-2xl p-6 sm:p-8">
            <p className={labelCls}>{t("modeLabel")}</p>
            <div className="flex gap-2">
              {(["money", "time"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(toggleCls(mode === m), "flex-1")}
                >
                  {t(`mode.${m}`)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[13px] text-subtle">{t(`modeHint.${mode}`)}</p>

            <p className={cn(labelCls, "mt-6")}>{t("periodLabel")}</p>
            <div className="flex flex-wrap gap-2">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={toggleCls(period === p)}
                >
                  {t(`periods.${p}`)}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {isMoney ? (
                <>
                  {numberInput(missed, setMissed, t("money.callsLabel", { period: periodLabel }))}
                  {numberInput(value, setValue, t("money.valueLabel"))}
                  {numberInput(rate, setRate, t("money.rateLabel"), 100)}
                </>
              ) : (
                <>
                  {numberInput(calls, setCalls, t("time.callsLabel", { period: periodLabel }))}
                  {numberInput(duration, setDuration, t("time.durationLabel"))}
                </>
              )}
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.08}>
            <div className="surface-card flex h-full flex-col rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-medium text-muted">
                {isMoney ? t("money.resultLabel") : t("time.resultLabel")}
              </p>
              <p className="mt-3 text-[2.75rem] font-semibold leading-none tracking-tight text-blue-bright sm:text-[3.25rem]">
                {bigResult}
              </p>
              <p className="mt-2 text-sm text-subtle">
                {t("resultPer", { period: periodLabel })}
              </p>

              <div className="mt-6 space-y-2.5">
                {isMoney ? (
                  <>
                    <CheckLine>
                      {t("money.recovered", {
                        value: cf.format(recoveredPer),
                        rate: num(rate),
                      })}
                    </CheckLine>
                    {showMonth && (
                      <CheckLine>
                        {t("money.perMonth", {
                          value: cf.format(recoveredPer * monthFactor),
                        })}
                      </CheckLine>
                    )}
                    {period !== "year" && (
                      <CheckLine>
                        {t("money.perYear", {
                          value: cf.format(recoveredPer * factor),
                        })}
                      </CheckLine>
                    )}
                  </>
                ) : (
                  <>
                    {showMonth && (
                      <CheckLine>
                        {t("time.perMonth", { value: timeMonthValue })}
                      </CheckLine>
                    )}
                    {period !== "year" && (
                      <CheckLine>
                        {t("time.perYear", { value: timeYearValue })}
                      </CheckLine>
                    )}
                    <CheckLine>{t("time.workdays", { days: workdays })}</CheckLine>
                  </>
                )}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-subtle">{t("note")}</p>

              <div className="mt-auto pt-6">
                <Button href="/contact" withArrow className="w-full sm:w-auto">
                  {t("cta")}
                </Button>
                <p className="mt-3 text-[13px] text-muted">{t("ctaHint")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
