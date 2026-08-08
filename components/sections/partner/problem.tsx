import { CalendarX, Clock, PhoneMissed, UserMinus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Item = { title: string; description: string };

const ICONS = [PhoneMissed, Clock, CalendarX, UserMinus];

export function PartnerProblem() {
  const t = useTranslations("Partner.problem");
  const items = t.raw("items") as Item[];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-10 sm:mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? PhoneMissed;
            return (
              <RevealItem key={item.title} className="group relative">
                <Icon className="size-6 text-blue-bright" />
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12">
          <p className="mx-auto max-w-2xl text-balance text-center text-lg font-medium leading-relaxed text-fg sm:text-xl">
            {t("bridge")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
