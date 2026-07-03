import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/page-hero";
import { Values } from "@/components/sections/values";
import { Team } from "@/components/sections/team";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/sections/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("meta.title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const hero = useTranslations("About.hero");
  const mission = useTranslations("About.mission");

  return (
    <>
      <PageHero
        eyebrow={hero("eyebrow")}
        title={hero("title")}
        description={hero("description")}
      />

      {/* Mission */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow">{mission("eyebrow")}</p>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                  {mission("title")}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-muted lg:pt-2">
                {mission("body")}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Values />
      <Team />
      <CTASection />
    </>
  );
}
