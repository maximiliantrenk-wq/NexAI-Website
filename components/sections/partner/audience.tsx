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
                className="group flex items-center gap-4 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-line-strong hover:bg-white/[0.03]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-muted transition-colors group-hover:text-blue-bright">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[15px] font-medium">{item.title}</span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
