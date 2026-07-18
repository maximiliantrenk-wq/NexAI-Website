import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Aurora } from "@/components/sections/aurora";
import { ChatWidget } from "@/components/chat/chat-widget";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL("https://nex-a-i.com"),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: "NEXAI",
      locale: locale === "de" ? "de_DE" : "en_US",
      title: t("titleDefault"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        {/* Subtle site-wide animated aurora backdrop (reuses the hero shader,
            heavily dimmed) so inner pages aren't a flat, heavy black. Fixed =
            calm ambient; the homepage hero paints its own, more present aurora
            on top within its own stacking context. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <Aurora mobileStatic className="opacity-[0.45] md:opacity-[0.3]" />
          <div className="absolute inset-0 bg-[radial-gradient(150%_115%_at_50%_0%,transparent_55%,var(--color-bg)_100%)] md:bg-[radial-gradient(125%_90%_at_50%_0%,transparent_42%,var(--color-bg)_92%)]" />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NEXAI",
              url: "https://nex-a-i.com",
              description:
                "AI agency building digital employees — voice agents, chatbots, sales agents and custom automations.",
              email: "mbt@nex-a-i.com",
              telephone: "+49 176 80714816",
              areaServed: "DE",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Untere Bergstraße 13",
                postalCode: "74586",
                addressLocality: "Frankenhardt",
                addressCountry: "DE",
              },
              sameAs: [
                "https://www.linkedin.com",
                "https://x.com",
                "https://github.com",
              ],
            }),
          }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
