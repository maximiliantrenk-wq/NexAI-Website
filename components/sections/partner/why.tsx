import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function PartnerWhy() {
  const t = useTranslations("Partner.why");
  const items = t.raw("items") as string[];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-12 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {items.map((it) => (
            <RevealItem
              key={it}
              className="flex items-start gap-3 border-b border-line py-4 text-[15px]"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-violet"
                strokeWidth={2.5}
              />
              <span className="text-fg">{it}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
