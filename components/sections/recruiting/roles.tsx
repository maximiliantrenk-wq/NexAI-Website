import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Role } from "@/content/commission";

type Item = {
  key: Role;
  name: string;
  tagline: string;
  tasks: string;
  promotion: string;
  fit: string;
};

const dt = "font-mono text-[11px] uppercase tracking-[0.14em] text-subtle";

/** Die drei Positionen — bewusst ohne Provisionszahlen (die stehen nur im Karrieresystem-Deck). */
export function Roles() {
  const t = useTranslations("Recruiting.roles");
  const items = t.raw("items") as Item[];
  const rules = t.raw("rules") as string[];

  return (
    <Section id="positionen">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-10 grid gap-x-8 gap-y-10 sm:mt-14 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.key} className="border-t border-line pt-6">
              <p className="eyebrow">{item.tagline}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {item.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.tasks}
              </p>

              <dl className="mt-7 space-y-5">
                <div>
                  <dt className={dt}>{t("labels.pay")}</dt>
                  <dd className="mt-2 space-y-2">
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-fg">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-bright" strokeWidth={2.5} />
                      {t("labels.oneTime")}
                    </p>
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-fg">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-bright" strokeWidth={2.5} />
                      {t("labels.monthly")}
                    </p>
                    <p className="pl-[26px] text-xs text-subtle">{t("labels.monthlyJunior")}</p>
                  </dd>
                </div>
                <div>
                  <dt className={dt}>{t("labels.promotion")}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {item.promotion}
                  </dd>
                </div>
                <div>
                  <dt className={dt}>{t("labels.fit")}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {item.fit}
                  </dd>
                </div>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-3">
          <Reveal>
            <h3 className="text-lg font-semibold tracking-tight">{t("basisTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("basisNote")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="text-lg font-semibold tracking-tight">{t("rulesTitle")}</h3>
            <ul className="mt-3 space-y-3">
              {rules.map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-blue-bright" strokeWidth={2.5} />
                  {rule}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-lg font-semibold tracking-tight">{t("customersTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("customersText")}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
