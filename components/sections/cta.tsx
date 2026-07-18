import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";

export function CTASection({
  namespace = "Home.cta",
}: {
  namespace?: string;
}) {
  const t = useTranslations(namespace);
  const hasSecondary = t.has("secondary");

  return (
    <Section>
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-6 py-12 text-center sm:px-16 sm:py-24">
          <Glow
            className="left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2"
            intensity={0.34}
          />
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30 mask-fade-b"
          />
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[17px] leading-relaxed text-muted">
              {t("description")}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" size="lg" withArrow>
                {t("primary")}
              </Button>
              {hasSecondary && (
                <Button href="/services" size="lg" variant="secondary">
                  {t("secondary")}
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
