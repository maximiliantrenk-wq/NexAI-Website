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
        <div className="grid gap-10 rounded-3xl border border-line bg-white/[0.015] px-8 py-12 sm:grid-cols-2 sm:px-12 lg:grid-cols-4 lg:px-16">
          {items.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              className="text-center lg:text-left"
            >
              <div className="text-gradient text-[2.75rem] font-semibold leading-none tracking-[-0.03em] sm:text-5xl">
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
