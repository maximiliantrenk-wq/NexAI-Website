import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/sections/cta";
import {
  productGradients,
  productSlugs,
  type ProductItem,
} from "@/content/products";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  const items = t.raw("items") as ProductItem[];
  const item = items.find((p) => p.slug === slug);
  return { title: item ? item.title : t("meta.title") };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ProductDetail slug={slug} />;
}

function ProductDetail({ slug }: { slug: string }) {
  const t = useTranslations("Products");
  const items = t.raw("items") as ProductItem[];
  const index = items.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const item = items[index];
  const next = items[(index + 1) % items.length];
  const gradient = productGradients[index % productGradients.length];

  const blocks = [
    { label: t("labels.what"), body: item.what },
    { label: t("labels.benefit"), body: item.benefit },
    { label: t("labels.example"), body: item.example },
  ];

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-24 -z-10 h-96 opacity-70"
          style={{
            background: gradient,
            maskImage:
              "radial-gradient(80% 70% at 50% 0%, #000 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(80% 70% at 50% 0%, #000 20%, transparent 75%)",
            filter: "blur(20px)",
          }}
        />
        <Container>
          <Reveal>
            <Link
              href="/produkte"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              {t("labels.back")}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6">
              <Badge dot>{item.tag}</Badge>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {item.summary}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What it can do */}
      <Section className="py-10">
        <Container>
          <div className="surface-card rounded-3xl p-8 sm:p-10">
            <p className="eyebrow mb-6">{t("labels.canDo")}</p>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {item.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-violet"
                    strokeWidth={2.5}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Story blocks */}
      <Section className="pt-4">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {blocks.map((b) => (
              <Reveal key={b.label}>
                <div className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <p className="eyebrow pt-1">{b.label}</p>
                  <p className="text-[17px] leading-relaxed text-muted">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Next product */}
      <Section className="py-12">
        <Container>
          <Link
            href={`/produkte/${next.slug}`}
            className="surface-card group flex items-center justify-between gap-6 rounded-2xl p-7 transition-colors hover:border-white/20"
          >
            <div>
              <p className="eyebrow">{t("labels.next")}</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">
                {next.title}
              </p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-fg" />
          </Link>
        </Container>
      </Section>

      <CTASection namespace="Products.cta" />
    </>
  );
}
