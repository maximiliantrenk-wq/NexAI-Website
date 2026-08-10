import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewsletterConfirm } from "@/components/sections/newsletter-confirm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Newsletter" });
  return { title: t("confirmMeta"), robots: { index: false } };
}

export default async function NewsletterConfirmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Suspense>
      <NewsletterConfirm />
    </Suspense>
  );
}
