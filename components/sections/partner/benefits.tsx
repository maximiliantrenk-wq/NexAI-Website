import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Item = { title: string; description: string };

/** Reusable icon-card benefit grid, driven by a namespace + icon set.
 *  Used for both the partner benefits and the end-customer benefits. */
export function PartnerBenefits({
  namespace,
  icons,
}: {
  namespace: string;
  icons: LucideIcon[];
}) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as Item[];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem key={item.title} className="group">
                <Icon className="size-6 text-blue-bright" />
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight transition-colors group-hover:text-blue-bright">
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
