import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PROMOTION } from "@/content/commission";

type Column = { role: string; metric: string; extra: string };

/** Aufstieg Junior → Senior: die öffentlichen Wochenkriterien aus dem Karrieresystem. */
export function Path() {
  const t = useTranslations("Recruiting.path");
  const columns = t.raw("columns") as Column[];
  const senior = t.raw("senior") as string[];
  const weeks: readonly (readonly number[])[] = [
    PROMOTION.setter.calls,
    PROMOTION.closer.appointments,
  ];

  return (
    <Section id="aufstieg">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-2">
          {columns.map((col, ci) => (
            <RevealItem key={col.role} className="border-t border-line pt-6">
              <h3 className="text-xl font-semibold tracking-tight">{col.role}</h3>
              <p className="mt-1 text-sm text-muted">{col.metric}</p>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {weeks[ci].map((value, wi) => (
                  <div key={wi} className="border-l border-line pl-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                      {t("weekLabel", { n: wi + 1 })}
                    </p>
                    <p className="text-gradient mt-1 text-3xl font-semibold tracking-tight">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">{col.extra}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-muted">{t("bothNote")}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h3 className="text-lg font-semibold tracking-tight">{t("seniorTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {senior.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-fg">
                  <Check className="mt-0.5 size-4 shrink-0 text-blue-bright" strokeWidth={2.5} />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-sm leading-relaxed text-muted">{t("note")}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
