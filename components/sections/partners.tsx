import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Partner = { name: string; href: string; logo: string; width: number; height: number };

// Bewusst als einzelne Nennung gestaltet, nicht als Logo-Leiste: Bei einem
// einzigen Partner sähe ein Raster nach fehlenden Kacheln aus. Kommen weitere
// dazu, trägt dasselbe Layout sie mit — die Liste wird dann einfach länger.
const PARTNERS: Partner[] = [
  {
    name: "PROINVEST",
    href: "https://proinvest-capital.de",
    logo: "/partner/proinvest.webp",
    width: 640,
    height: 164,
  },
];

export function Partners() {
  const t = useTranslations("Home.partners");

  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
              {t("eyebrow")}
            </p>
            <p className="max-w-xl text-balance text-muted">{t("intro")}</p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("visit", { name: partner.name })}
                  className="group inline-flex rounded-md p-2 opacity-80 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    sizes="(min-width: 640px) 260px, 200px"
                    className="h-auto w-[200px] sm:w-[260px]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
