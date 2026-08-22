import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Booking } from "@/components/sections/booking";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// Zielseite des Termin-Links aus der Bestätigungsmail — bewusst nicht indexiert.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Recruiting.termin" });
  return { title: t("meta.title"), robots: { index: false, follow: false } };
}

export default async function TerminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TerminContent />;
}

function TerminContent() {
  const t = useTranslations("Recruiting.termin");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Booking namespace="Recruiting.booking" />
            <Link
              href="/vertriebspartner"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              {t("back")}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
