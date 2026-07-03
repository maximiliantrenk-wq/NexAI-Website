import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { caseSlugs } from "@/content/cases";

const BASE = "https://nex-a-i.com";

const paths = [
  "",
  "/services",
  "/cases",
  "/pricing",
  "/about",
  "/careers",
  "/contact",
  "/imprint",
  "/privacy",
  ...caseSlugs.map((s) => `/cases/${s}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
