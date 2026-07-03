import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Philosophy({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);

  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t("eyebrow")}</p>
          <p className="mt-7 text-2xl font-medium text-subtle sm:text-[1.75rem]">
            {t("lead")}
          </p>
          <p className="text-gradient mt-1 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.75rem]">
            {t("headline")}
          </p>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {t("body")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
