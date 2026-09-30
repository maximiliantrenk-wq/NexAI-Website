import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";

/**
 * „Sie haben eine besondere Idee?" — der Weg fuer alles, was keine unserer
 * fertigen Loesungen ist.
 *
 * Stand bis 30.09. im Produktblock der Startseite. Der ist weg (die Produkte
 * stehen unter /produkte ohnehin vollstaendig), der Kasten gehoert aber genau
 * dorthin: ans Ende der Produktliste, wo jemand merkt, dass sein Fall nicht
 * dabei ist.
 */
export function CustomAgent() {
  const t = useTranslations("Products.custom");

  // Ohne oberen Abstand: haengt direkt am Produktraster darueber.
  return (
    <Section className="pt-0">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl p-8 sm:p-10">
            <Glow
              className="right-0 top-0 h-72 w-96 translate-x-1/3 -translate-y-1/3"
              intensity={0.28}
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-blue-bright">
                  <Sparkles className="size-3.5" />
                  {t("tag")}
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                  {t("title")}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {t("description")}
                </p>
              </div>
              <Button href="/contact" variant="secondary" withArrow>
                {t("cta")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
