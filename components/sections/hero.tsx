import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Aurora } from "./aurora";
import { HeroArtifact } from "./hero-artifact";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate overflow-hidden">
      {/* Signature aurora background */}
      <div className="absolute inset-0 -z-10">
        <Aurora className="absolute inset-0 h-full w-full" />
        <div className="bg-grid absolute inset-0 opacity-40 mask-fade-b" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg via-bg/85 to-transparent" />
      </div>

      <Container className="relative flex flex-col items-center pb-14 pt-28 text-center sm:pb-24 sm:pt-48">
        <Reveal>
          <Badge dot>{t("eyebrow")}</Badge>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 max-w-4xl text-balance text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-8 w-full sm:mt-9">
          <div className="mx-auto flex max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button
              href="/contact"
              size="lg"
              className="w-full sm:w-auto"
              withArrow
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              href="tel:+4979593100191"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Phone className="size-4" />
              {t("ctaDemo")}
            </Button>
            <Button
              href="/services"
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-4 text-[13px] text-subtle">
            <a
              href="tel:+4979593100191"
              className="font-mono text-muted transition-colors hover:text-blue-bright"
            >
              {t("demoPhone")}
            </a>
            {" · "}
            {t("demoHint")}
          </p>
        </Reveal>

        <Reveal delay={0.26} className="mt-12 w-full sm:mt-20">
          <HeroArtifact />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow mt-10 sm:mt-14">{t("trust")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
