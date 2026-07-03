import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Step = { n: string; title: string; description: string };

export function Process() {
  const t = useTranslations("Home.process");
  const steps = t.raw("steps") as Step[];

  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <RevealItem key={step.n} className="relative">
              <div className="flex items-center gap-3">
                <span className="text-gradient font-mono text-sm font-semibold">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
