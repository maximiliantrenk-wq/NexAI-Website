import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { productSlugs } from "@/content/products";
import { ROLE_PAGES } from "@/content/commission";
import fileDates from "@/content/file-dates.json";

const BASE = "https://nex-a-i.com";

// Echte Änderungsdaten je Adresse: das jüngste Datum der Dateien, die den Inhalt
// der Seite bestimmen (Seitendatei + Sprachdateien + Inhaltsdaten). Die Daten
// kommen aus content/file-dates.json (erzeugt von scripts/sitemap-dates.mjs aus
// der Git-Historie). Reine Layout-Änderungen in Komponenten zählen bewusst nicht.
const DATES: Record<string, string> = fileDates;
const messages = (ns: string) => routing.locales.map((l) => `messages/${l}/${ns}.json`);

function contentFiles(path: string): string[] {
  if (path === "") return ["app/[locale]/page.tsx", ...messages("home")];
  if (path.startsWith("/produkte/")) {
    const slug = path.slice("/produkte/".length);
    return [
      "app/[locale]/produkte/[slug]/page.tsx",
      ...messages("products"),
      "content/products.ts",
      `public/products/${slug}.webp`,
    ];
  }
  if (path.startsWith("/vertriebspartner/")) {
    return ["app/[locale]/vertriebspartner/[role]/page.tsx", ...messages("recruiting"), "content/commission.ts"];
  }
  const einfach: Record<string, string[]> = {
    "/services": ["app/[locale]/services/page.tsx", ...messages("services")],
    "/produkte": ["app/[locale]/produkte/page.tsx", ...messages("products"), "content/products.ts"],
    "/pricing": ["app/[locale]/pricing/page.tsx", ...messages("pricing")],
    "/about": ["app/[locale]/about/page.tsx", ...messages("about")],
    "/partner": ["app/[locale]/partner/page.tsx", ...messages("partner")],
    "/vertriebspartner": ["app/[locale]/vertriebspartner/page.tsx", ...messages("recruiting"), "content/commission.ts"],
    "/contact": ["app/[locale]/contact/page.tsx", ...messages("contact")],
    "/imprint": ["app/[locale]/imprint/page.tsx", ...messages("legal")],
    "/privacy": ["app/[locale]/privacy/page.tsx", ...messages("legal")],
  };
  return einfach[path] ?? [];
}

// Unbekannte Adresse → jüngstes bekanntes Datum (nie „jetzt", das wäre wieder erfunden).
const NEUESTES = Object.values(DATES).sort().at(-1) ?? "2026-01-01";

function lastModified(path: string): string {
  const stamps = contentFiles(path).map((f) => DATES[f]).filter(Boolean);
  return stamps.length ? stamps.sort().at(-1)! : NEUESTES;
}

const paths = [
  "",
  "/services",
  "/produkte",
  "/pricing",
  "/about",
  "/partner",
  "/vertriebspartner",
  ...ROLE_PAGES.map((s) => `/vertriebspartner/${s}`),
  "/contact",
  "/imprint",
  "/privacy",
  ...productSlugs.map((s) => `/produkte/${s}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: lastModified(path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
          ),
          "x-default": `${BASE}/${routing.defaultLocale}${path}`,
        },
      },
    })),
  );
}
