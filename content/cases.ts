/** Case slugs — shared across locales; content lives in messages/<locale>/cases.json */
export const caseSlugs = [
  "voice-agent-terminbuchung",
  "vertriebsagent-leadrecherche",
  "prozess-automatisierung",
] as const;

export type CaseSlug = (typeof caseSlugs)[number];

export type CaseItem = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  result: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
};

export const caseGradients = [
  "conic-gradient(from 200deg at 40% 30%, #3a6bff, #a855f7, #22d3ee, #7c3aed, #3a6bff)",
  "conic-gradient(from 40deg at 60% 40%, #a855f7, #3a6bff, #38d0e8, #7c3aed, #a855f7)",
  "conic-gradient(from 120deg at 50% 60%, #38d0e8, #7c3aed, #3a6bff, #a855f7, #38d0e8)",
];
