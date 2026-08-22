import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { PartnerBenefits } from "@/components/sections/partner/benefits";
import { PartnerExample } from "@/components/sections/partner/example";
import { PartnerFlow } from "@/components/sections/partner/flow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import {
  CalendarCheck,
  Database,
  LayoutDashboard,
  ListChecks,
  PhoneCall,
  Presentation,
  UserCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DATE_POSTED, ROLE_PAGES, ROLE_PAGE_KEY, type RolePage } from "@/content/commission";

const BASE = "https://nex-a-i.com";

// Rollen-Unterseiten für die Suchbegriffe der Zielgruppe (Closer Job, Setter Job,
// Handelsvertreter). Inhalt in messages/*/recruiting.json → Recruiting.pages.<key>;
// Closer und Setter tragen ein eigenes JobPosting, die Handelsvertreter-Seite nicht
// (gleiche Position wie Closer, Google soll keine Dublette sehen).
export function generateStaticParams() {
  return ROLE_PAGES.map((role) => ({ role }));
}

function isRolePage(value: string): value is RolePage {
  return (ROLE_PAGES as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; role: string }>;
}): Promise<Metadata> {
  const { locale, role } = await params;
  if (!isRolePage(role)) return {};
  const t = await getTranslations({ locale, namespace: `Recruiting.pages.${ROLE_PAGE_KEY[role]}.meta` });
  const title = t("title");
  const description = t("description");
  const path = `/vertriebspartner/${role}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { de: `/de${path}`, en: `/en${path}`, "x-default": `/de${path}` },
    },
    openGraph: {
      type: "website",
      siteName: "NEXAI",
      locale: locale === "de" ? "de_DE" : "en_US",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RolePageRoute({
  params,
}: {
  params: Promise<{ locale: string; role: string }>;
}) {
  const { locale, role } = await params;
  if (!isRolePage(role)) notFound();
  setRequestLocale(locale);

  const key = ROLE_PAGE_KEY[role];
  const page = await getTranslations({ locale, namespace: `Recruiting.pages.${key}` });
  const jobPosting = page.has("jsonld.title")
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: page("jsonld.title"),
        description: page("jsonld.description"),
        datePosted: DATE_POSTED,
        employmentType: ["CONTRACTOR"],
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: [
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Austria" },
          { "@type": "Country", name: "Switzerland" },
        ],
        hiringOrganization: {
          "@type": "Organization",
          name: "NEXAI",
          sameAs: BASE,
          logo: `${BASE}/opengraph-image`,
        },
        identifier: { "@type": "PropertyValue", name: "NEXAI", value: `vertriebspartner-${role}` },
        industry: "Software / AI",
        inLanguage: locale,
        url: `${BASE}/${locale}/vertriebspartner/${role}`,
        directApply: true,
        responsibilities: page("jsonld.responsibilities"),
        qualifications: page("jsonld.qualifications"),
        incentiveCompensation: page("jsonld.incentive"),
      }
    : null;

  return (
    <>
      {jobPosting && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPosting).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <RoleContent role={role} />
    </>
  );
}

const btnBase =
  "group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-[transform,background,box-shadow,color,border-color] duration-200 ease-out active:scale-[0.98]";

const supportIcons = [
  ListChecks,
  CalendarCheck,
  PhoneCall,
  Presentation,
  LayoutDashboard,
  Database,
  Users,
  UserCheck,
];

function RoleContent({ role }: { role: RolePage }) {
  const key = ROLE_PAGE_KEY[role];
  const ns = `Recruiting.pages.${key}`;
  const t = useTranslations(ns);
  const more = useTranslations("Recruiting.more");
  const siblings = (more.raw("items") as { slug: RolePage; title: string; description: string }[]).filter(
    (item) => item.slug !== role,
  );

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")}>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vertriebspartner#bewerbung"
            className={cn(
              btnBase,
              "bg-gradient-to-r from-blue via-violet to-purple text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.9)] hover:brightness-[1.08]",
            )}
          >
            {t("cta.primary")}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/vertriebspartner#positionen"
            className={cn(
              btnBase,
              "border border-blue/30 bg-white/[0.045] text-fg backdrop-blur-sm hover:border-blue/50 hover:bg-white/[0.08]",
            )}
          >
            {t("cta.secondary")}
          </Link>
        </div>
      </PageHero>

      {/* Positionierung der Rolle */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                {t("intro.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-muted lg:pt-2">{t("intro.body")}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <PartnerFlow namespace={`${ns}.day`} id="woche" />
      <PartnerBenefits namespace="Recruiting.support" icons={supportIcons} />
      <PartnerExample namespace={`${ns}.fit`} />
      <FaqSection namespace={`${ns}.faq`} />

      {/* Abschluss-CTA + andere Rollen */}
      <Section className="overflow-hidden">
        <Glow className="left-1/2 top-1/2 h-[420px] w-[min(90vw,760px)] -translate-x-1/2 -translate-y-1/2" intensity={0.3} />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/vertriebspartner#bewerbung" size="lg" withArrow>
                {t("cta.primary")}
              </Button>
              <Button href="/vertriebspartner" size="lg" variant="secondary">
                {t("cta.secondary")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-16">
            <p className="eyebrow text-center">{more("eyebrow")}</p>
            <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
              {siblings.map((item) => (
                <Link
                  key={item.slug}
                  href={`/vertriebspartner/${item.slug}`}
                  className="group rounded-2xl border border-line p-5 transition-colors hover:border-blue/40"
                >
                  <p className="text-[17px] font-semibold tracking-tight transition-colors group-hover:text-blue-bright">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
