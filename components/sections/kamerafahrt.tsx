import { useTranslations } from "next-intl";
import { KamerafahrtFilm, type KamerafahrtTexte } from "./kamerafahrt-film";

// Reihenfolge der Produkt-Links im Schlussbild: wie im Film, dann das, was
// keine eigene Station hat.
const REIHENFOLGE = [
  "voice-agent",
  "nexai-crm",
  "chat-agent",
  "nexai-app",
  "nexai-kalender",
  "mail-agent",
  "sales-assistent",
  "automatisierung",
];

export function Kamerafahrt() {
  const t = useTranslations("Home.film");
  const produkte = useTranslations("Products").raw("items") as { slug: string; title: string }[];

  const texte: KamerafahrtTexte = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    hint: t("hint"),
    loading: t("loading"),
    stationsLabel: t("stationsLabel"),
    stations: t.raw("stations"),
    end: t.raw("end"),
    products: REIHENFOLGE.flatMap((slug) => {
      const p = produkte.find((x) => x.slug === slug);
      return p ? [{ slug: p.slug, title: p.title }] : [];
    }),
  };

  return <KamerafahrtFilm texte={texte} />;
}
