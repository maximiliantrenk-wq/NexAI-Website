import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { productSlugs } from "@/content/products";

const BASE = "https://nex-a-i.com";

const paths = [
  "",
  "/services",
  "/produkte",
  "/pricing",
  "/about",
  "/careers",
  "/contact",
  "/imprint",
  "/privacy",
  ...productSlugs.map((s) => `/produkte/${s}`),
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
