import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

/** Flache Querverweis-Zeile zwischen zwei Seiten (z. B. Partnerprogramm ↔ Vertriebspartner). */
export function CrossLink({
  namespace,
  href,
}: {
  namespace: string;
  href: string;
}) {
  const t = useTranslations(namespace);

  return (
    <section className="relative border-y border-line py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("eyebrow")}</p>
              <h2 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {t("description")}
              </p>
            </div>
            <Button href={href} variant="secondary" size="lg" withArrow>
              {t("cta")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
