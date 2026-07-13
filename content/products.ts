/** Product slugs — shared across locales; content lives in messages/<locale>/products.json */
export const productSlugs = [
  "voice-agent",
  "chat-agent",
  "social-media-agent",
  "vertriebs-agent",
  "automatisierung",
] as const;

export type ProductSlug = (typeof productSlugs)[number];

export type ProductItem = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  result: string;
  what: string;
  benefit: string;
  example: string;
  features: string[];
};

export const productGradients = [
  "conic-gradient(from 200deg at 40% 30%, #3a6bff, #a855f7, #22d3ee, #7c3aed, #3a6bff)",
  "conic-gradient(from 40deg at 60% 40%, #a855f7, #3a6bff, #38d0e8, #7c3aed, #a855f7)",
  "conic-gradient(from 120deg at 50% 60%, #38d0e8, #7c3aed, #3a6bff, #a855f7, #38d0e8)",
  "conic-gradient(from 300deg at 35% 45%, #7c3aed, #4d7cff, #a855f7, #22d3ee, #7c3aed)",
  "conic-gradient(from 80deg at 55% 35%, #4d7cff, #22d3ee, #a855f7, #6d28d9, #4d7cff)",
  "conic-gradient(from 160deg at 45% 55%, #a855f7, #38d0e8, #4d7cff, #7c3aed, #a855f7)",
];
