import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/page-hero";
import { Benefits } from "@/components/sections/benefits";
import { Jobs } from "@/components/sections/jobs";
import { CTASection } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return { title: t("meta.title") };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CareersContent />;
}

function CareersContent() {
  const t = useTranslations("Careers.hero");
  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Benefits />
      <Jobs />
      <CTASection namespace="Careers.cta" />
    </>
  );
}
