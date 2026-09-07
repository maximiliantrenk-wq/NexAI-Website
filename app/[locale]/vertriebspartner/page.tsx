import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CalendarCheck,
  Database,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Phone,
  PhoneCall,
  Presentation,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Philosophy } from "@/components/sections/philosophy";
import { FaqSection } from "@/components/sections/faq-section";
import { PartnerBenefits } from "@/components/sections/partner/benefits";
import { PartnerExample } from "@/components/sections/partner/example";
import { PartnerFlow } from "@/components/sections/partner/flow";
import { Roles } from "@/components/sections/recruiting/roles";
import { Path } from "@/components/sections/recruiting/path";
import { Demo } from "@/components/sections/recruiting/demo";
import { ApplicationForm } from "@/components/sections/recruiting/application-form";
import { SourceCapture } from "@/components/sections/recruiting/source-capture";
import { MoreLinks } from "@/components/sections/recruiting/more-links";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DATE_POSTED } from "@/content/commission";

const BASE = "https://nex-a-i.com";
const PATH = "/vertriebspartner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Recruiting.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${PATH}`,
      languages: {
        de: `/de${PATH}`,
        en: `/en${PATH}`,
        "x-default": `/de${PATH}`,
      },
    },
    // Seiten-openGraph ersetzt das Layout-openGraph komplett → Basisfelder wiederholen.
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

export default async function VertriebspartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const j = await getTranslations({ locale, namespace: "Recruiting.jsonld" });
  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j("title"),
    description: j("description"),
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
    identifier: {
      "@type": "PropertyValue",
      name: "NEXAI",
      value: "vertriebspartner-setter-closer",
    },
    industry: "Software / AI",
    inLanguage: locale,
    url: `${BASE}/${locale}${PATH}`,
    directApply: true,
    responsibilities: j("responsibilities"),
    qualifications: j("qualifications"),
    incentiveCompensation: j("incentive"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPosting).replace(/</g, "\\u003c"),
        }}
      />
      <SourceCapture />
      <RecruitingContent />
    </>
  );
}

const btnBase =
  "group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-[transform,background,box-shadow,color,border-color] duration-200 ease-out active:scale-[0.98]";

const productIcons = [Phone, MessageSquare, CalendarCheck, Workflow];
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

function RecruitingContent() {
  const t = useTranslations("Recruiting.hero");
  const facts = t.raw("facts") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      >
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-wrap gap-3">
            <a
              href="#bewerbung"
              className={cn(
                btnBase,
                "bg-gradient-to-r from-blue via-violet to-purple text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.9)] hover:brightness-[1.08]",
              )}
            >
              {t("primary")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#positionen"
              className={cn(
                btnBase,
                "border border-blue/30 bg-white/[0.045] text-fg backdrop-blur-sm hover:border-blue/50 hover:bg-white/[0.08]",
              )}
            >
              {t("secondary")}
            </a>
          </div>
          <p className="text-sm text-subtle">{t("reassurance")}</p>
          <div className="flex flex-wrap gap-2">
            {facts.map((f) => (
              <Badge key={f}>{f}</Badge>
            ))}
          </div>
        </div>
      </PageHero>

      <Philosophy namespace="Recruiting.positioning" />
      <PartnerBenefits namespace="Recruiting.product" icons={productIcons} />
      <Roles />
      <MoreLinks />
      <Path />
      <PartnerBenefits namespace="Recruiting.support" icons={supportIcons} />
      <Demo />
      <PartnerExample namespace="Recruiting.honest" />
      <PartnerFlow namespace="Recruiting.process" id="ablauf" />
      <FaqSection namespace="Recruiting.faq" />
      <ApplicationForm />
    </>
  );
}
