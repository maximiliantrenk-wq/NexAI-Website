import { Activity, Compass, Gauge, Plug, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Capability = { title: string; description: string };

const ICONS = [Compass, Zap, ShieldCheck, Gauge, Plug, Activity];

export function Capabilities() {
  const t = useTranslations("Home.capabilities");
  const items = t.raw("items") as Capability[];

  return (
    <Section id="capabilities">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <RevealGroup className="mt-10 sm:mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Compass;
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
      </Container>
    </Section>
  );
}
