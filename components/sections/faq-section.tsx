import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Faq } from "@/components/ui/faq";

type Item = { q: string; a: string };

export function FaqSection({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Item[];

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
          <div className="mt-10">
            <Faq items={items} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
