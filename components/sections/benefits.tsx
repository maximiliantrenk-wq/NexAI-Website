import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Benefit = { title: string; description: string };

export function Benefits() {
  const t = useTranslations("Careers.benefits");
  const items = t.raw("items") as Benefit[];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <RevealItem
              key={b.title}
              className="surface-card rounded-2xl p-7"
            >
              <span className="block size-2 rounded-full bg-gradient-to-r from-blue to-purple shadow-[0_0_12px_var(--color-purple)]" />
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {b.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
