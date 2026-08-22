import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Item = { slug: string; title: string; description: string };

/** Verweise auf die Rollen-Unterseiten (Closer Job, Setter Job, Handelsvertreter). */
export function MoreLinks() {
  const t = useTranslations("Recruiting.more");
  const items = t.raw("items") as Item[];

  return (
    <Section id="rollen">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <RevealGroup className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
          {items.map((item) => (
            <RevealItem key={item.slug}>
              <Link
                href={`/vertriebspartner/${item.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-blue/40"
              >
                <p className="text-[17px] font-semibold tracking-tight transition-colors group-hover:text-blue-bright">
                  {item.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-bright">
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
