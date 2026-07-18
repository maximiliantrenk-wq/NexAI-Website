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

        <RevealGroup className="mt-10 sm:mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? PhoneMissed;
            return (
              <RevealItem
                key={item.title}
                className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-surface"
              >
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-subtle transition-colors group-hover:text-blue-bright">
                  <Icon className="size-[18px]" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
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
