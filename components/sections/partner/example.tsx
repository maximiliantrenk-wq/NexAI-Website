import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Column = { title: string; items: string[] };

export function PartnerExample({
  namespace = "Partner.example",
}: {
  namespace?: string;
} = {}) {
  const t = useTranslations(namespace);
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
          <Reveal>
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

          <Reveal delay={0.08}>
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
                    className="mt-0.5 size-4 shrink-0 text-blue-bright"
                    strokeWidth={2.5}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-6">
          <div className="rounded-2xl px-8 py-10 text-center">
            <p className="text-[17px] font-medium">{t("resultLabel")}</p>
            <p className="mx-auto mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
              {t("resultText")}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
