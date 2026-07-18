import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Column = { title: string; items: string[] };

export function PartnerExample() {
  const t = useTranslations("Partner.example");
  const without = t.raw("without") as Column;
  const withNexai = t.raw("with") as Column;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-10 sm:mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="surface-card rounded-2xl p-7 sm:p-8">
            <h3 className="text-lg font-semibold tracking-tight text-muted">
              {without.title}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {without.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <X
                    className="mt-0.5 size-4 shrink-0 text-subtle"
                    strokeWidth={2.5}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="surface-card rounded-2xl p-7 sm:p-8">
            <h3 className="text-lg font-semibold tracking-tight">
              {withNexai.title}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {withNexai.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 text-[15px] text-fg"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-violet"
                    strokeWidth={2.5}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-6">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-white/[0.015] px-8 py-10 text-center sm:flex-row sm:gap-8 sm:text-left">
            <span className="text-gradient text-5xl font-semibold leading-none tracking-[-0.03em] sm:text-6xl">
              {t("resultValue")}
            </span>
            <div>
              <p className="text-[17px] font-medium">{t("resultLabel")}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {t("resultText")}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
