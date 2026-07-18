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

        <RevealGroup className="mt-10 sm:mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Compass;
            return (
              <RevealItem
                key={item.title}
                className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-surface"
              >
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-muted transition-colors group-hover:text-blue-bright">
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
      </Container>
    </Section>
  );
}
