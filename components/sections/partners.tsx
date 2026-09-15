import Image from "next/image";
import { useTranslations } from "next-intl";

type Partner = { name: string; href: string; logo: string; width: number; height: number };

/*
  Partner im ersten Bildschirm, über der Zeile „Für Unternehmen, die mit AI
  schneller wachsen wollen" (Wunsch Max, 15.09.2026 — vorher ein eigener
  Abschnitt weit unten auf der Startseite).

  Die Logos stehen im Ruhezustand einheitlich weiß und gedämpft und zeigen ihre
  Farben erst beim Überfahren. In Originalfarben nebeneinander würde das Orange
  von easybell im Kopfbereich mehr Blick ziehen als der Aufruf zum Erstgespräch.

  Ein weiterer Partner ist ein Eintrag hier plus Logo unter public/partner/.
*/
const PARTNERS: Partner[] = [
  {
    name: "PROINVEST",
    href: "https://proinvest-capital.de",
    logo: "/partner/proinvest.webp",
    width: 640,
    height: 164,
  },
  {
    name: "easybell",
    href: "https://www.easybell.de",
    logo: "/partner/easybell.webp",
    width: 640,
    height: 161,
  },
];

export function Partners() {
  const t = useTranslations("Home.partners");

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="eyebrow">{t("eyebrow")}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
        {PARTNERS.map((partner) => (
          <li key={partner.name}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("visit", { name: partner.name })}
              className="group inline-flex rounded-md p-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                sizes="160px"
                className="h-7 w-auto opacity-60 transition duration-300 [filter:brightness(0)_invert(1)] group-hover:opacity-100 group-hover:[filter:none] group-focus-visible:opacity-100 group-focus-visible:[filter:none] sm:h-8"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
