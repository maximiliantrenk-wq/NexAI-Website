import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { productGradients, type ProductItem } from "@/content/products";

export function ProductGrid() {
  const t = useTranslations("Products");
  const items = t.raw("items") as ProductItem[];

  return (
    <Section className="pt-8 sm:pt-10">
      <Container>
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <RevealItem key={p.slug}>
              <Link
                href={`/produkte/${p.slug}`}
                className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: productGradients[i % productGradients.length],
                      maskImage:
                        "radial-gradient(120% 90% at 50% 15%, #000 45%, transparent 92%)",
                      WebkitMaskImage:
                        "radial-gradient(120% 90% at 50% 15%, #000 45%, transparent 92%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-black/30 text-fg backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    {p.tag}
                  </span>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.summary}
                  </p>
                  <p className="text-gradient mt-auto pt-6 text-2xl font-semibold tracking-tight">
                    {p.result}
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
