import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/sections/cta";
import { caseGradients, caseSlugs, type CaseItem } from "@/content/cases";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Cases" });
  const items = t.raw("items") as CaseItem[];
  const item = items.find((c) => c.slug === slug);
  return { title: item ? item.title : t("meta.title") };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <CaseDetail slug={slug} />;
}

function CaseDetail({ slug }: { slug: string }) {
  const t = useTranslations("Cases");
  const items = t.raw("items") as CaseItem[];
  const index = items.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const item = items[index];
  const next = items[(index + 1) % items.length];
  const gradient = caseGradients[index % caseGradients.length];

  const blocks = [
    { label: t("labels.challenge"), body: item.challenge },
    { label: t("labels.approach"), body: item.approach },
    { label: t("labels.outcome"), body: item.outcome },
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
              href="/cases"
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

      {/* Metrics */}
      <Section className="py-12">
        <Container>
          <div className="grid gap-8 rounded-3xl border border-line bg-white/[0.015] px-8 py-10 sm:grid-cols-3 sm:px-12">
            {item.metrics.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <div className="text-gradient text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
                  {m.value}
                </div>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story blocks */}
      <Section className="pt-4">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {blocks.map((b) => (
              <Reveal key={b.label}>
                <div className="grid gap-3 sm:grid-cols-[180px_1fr] sm:gap-8">
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

      {/* Next case */}
      <Section className="py-12">
        <Container>
          <Link
            href={`/cases/${next.slug}`}
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

      <CTASection namespace="Cases.cta" />
    </>
  );
}
