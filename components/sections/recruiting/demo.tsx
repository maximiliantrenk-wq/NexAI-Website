import { PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { DEMO_PHONE } from "@/content/commission";

/** Der stärkste Beweis ohne Testimonials: das Produkt selbst anrufen. */
export function Demo() {
  const t = useTranslations("Recruiting.demo");

  return (
    <Section id="demo" className="overflow-hidden">
      <Glow className="left-1/2 top-1/2 h-[420px] w-[min(90vw,760px)] -translate-x-1/2 -translate-y-1/2" intensity={0.3} />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button href={DEMO_PHONE.href} size="lg">
              <PhoneCall className="size-4" />
              {t("cta")}
            </Button>
            <a
              href={DEMO_PHONE.href}
              className="font-mono text-sm tracking-[0.08em] text-blue-bright hover:underline"
            >
              {DEMO_PHONE.display}
            </a>
          </div>
          <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-subtle">
            {t("hint")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
