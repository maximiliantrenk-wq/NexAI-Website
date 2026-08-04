import Image from "next/image";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Testimonial() {
  const t = useTranslations("Home.testimonial");

  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-line bg-white/[0.03]">
            <Quote className="size-5 text-blue-bright" />
          </span>
          <blockquote className="mt-8 text-balance text-[1.6rem] font-medium leading-[1.35] tracking-[-0.01em] sm:text-[2rem]">
            {t("quote")}
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-3">
            {t.has("image") ? (
              <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-line">
                <Image
                  src={t("image")}
                  alt={t("author")}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-blue to-purple text-sm font-semibold text-white">
                {t("author").charAt(0)}
              </span>
            )}
            <div className="text-left">
              <div className="text-sm font-semibold">{t("author")}</div>
              <div className="text-sm text-muted">
                {t("role")} · {t("company")}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
