import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Value = { title: string; description: string };

export function Values() {
  const t = useTranslations("About.values");
  const items = t.raw("items") as Value[];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v) => (
            <RevealItem
              key={v.title}
              className="bg-bg p-7 transition-colors duration-300 hover:bg-surface"
            >
              <span className="block size-2 rounded-full bg-gradient-to-r from-blue to-purple shadow-[0_0_12px_var(--color-purple)]" />
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {v.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
