import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/page-hero";
import { ServicePillars } from "@/components/sections/service-pillars";
import { Philosophy } from "@/components/sections/philosophy";
import { Capabilities } from "@/components/sections/capabilities";
import { Process } from "@/components/sections/process";
import { FaqSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("meta.title") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("Services.hero");
  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <ServicePillars />
      <Philosophy namespace="Services.philosophy" />
      <Capabilities />
      <Process />
      <FaqSection namespace="Services.faq" />
      <CTASection />
    </>
  );
}
