import {
  Briefcase,
  Building2,
  Code2,
  Cog,
  Database,
  Layers,
  Megaphone,
  MousePointerClick,
  Palette,
  PhoneCall,
  Search,
  Server,
  Share2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Item = { title: string };

const ICONS = [
  Megaphone,
  Search,
  MousePointerClick,
  Share2,
  Palette,
  Layers,
  Server,
  Code2,
  Database,
  Briefcase,
  Cog,
  PhoneCall,
  Building2,
];

export function PartnerAudience() {
  const t = useTranslations("Partner.audience");
  const items = t.raw("items") as Item[];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <RevealGroup className="mt-10 sm:mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <RevealItem
                key={item.title}
                className="group flex items-center gap-4 rounded-xl p-4"
              >
                <Icon className="size-6 shrink-0 text-blue-bright" />
                <span className="text-[15px] font-medium transition-colors group-hover:text-blue-bright">
                  {item.title}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
