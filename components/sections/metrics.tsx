import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Metric = { value: string; label: string };

export function Metrics() {
  const t = useTranslations("Home.metrics");
  const items = t.raw("items") as Metric[];

  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 py-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {items.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              className="text-center lg:text-left"
            >
              <div className="text-gradient whitespace-nowrap text-[2.75rem] font-semibold leading-none tracking-[-0.03em] sm:text-5xl">
                {m.value}
              </div>
              <p className="mt-3 text-sm leading-snug text-muted">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
