import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { productGradients } from "@/content/products";

type Item = { slug: string; tag: string; title: string; result: string };

export function ProductHighlights() {
  const t = useTranslations("Home.products");
  const items = t.raw("items") as Item[];

  return (
    <Section id="products-preview">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="sm:max-w-2xl"
          />
          <Reveal className="shrink-0">
            <Button href="/produkte" variant="secondary" size="sm" withArrow>
              {t("cta")}
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3">
          {items.map((c, i) => (
            <RevealItem key={c.slug}>
              <Link
                href={`/produkte/${c.slug}`}
                className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: productGradients[i % productGradients.length],
                      maskImage:
                        "radial-gradient(120% 90% at 50% 20%, #000 45%, transparent 92%)",
                      WebkitMaskImage:
                        "radial-gradient(120% 90% at 50% 20%, #000 45%, transparent 92%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <span className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-white/15 bg-black/30 text-fg backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    {c.tag}
                  </span>
                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-gradient mt-auto pt-5 text-2xl font-semibold tracking-tight">
                    {c.result}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
