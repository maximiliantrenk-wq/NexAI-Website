import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/page-hero";
import { RoiCalculator } from "@/components/sections/roi-calculator";
import { CTASection } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Roi" });
  return { title: t("meta.title") };
}

export default async function RoiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoiContent />;
}

function RoiContent() {
  const t = useTranslations("Roi.hero");
  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <RoiCalculator />
      <CTASection />
    </>
  );
}
