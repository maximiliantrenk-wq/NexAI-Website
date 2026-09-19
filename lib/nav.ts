export type NavLink = { href: string; key: string };
export type NavEntry = NavLink | { key: string; children: readonly NavLink[] };

export const navItems: readonly NavEntry[] = [
  { href: "/services", key: "services" },
  { href: "/produkte", key: "products" },
  { href: "/pricing", key: "pricing" },
  { href: "/roi-rechner", key: "roiRechner" },
  { href: "/about", key: "about" },
  {
    key: "partner",
    children: [
      { href: "/partner", key: "geschaeftspartner" },
      { href: "/vertriebspartner", key: "vertriebspartner" },
    ],
  },
] as const;

export const footerNav = {
  product: [
    { href: "/services", key: "services" },
    { href: "/produkte", key: "products" },
    { href: "/pricing", key: "pricing" },
  ],
  company: [
    { href: "/about", key: "about" },
    { href: "/partner", key: "geschaeftspartner" },
    { href: "/vertriebspartner", key: "vertriebspartner" },
    { href: "/contact", key: "contact" },
  ],
  legal: [
    { href: "/imprint", key: "imprint" },
    { href: "/privacy", key: "privacy" },
  ],
} as const;
