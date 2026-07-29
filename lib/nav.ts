export const navItems = [
  { href: "/services", key: "services" },
  { href: "/produkte", key: "products" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/partner", key: "partner" },
] as const;

export const footerNav = {
  product: [
    { href: "/services", key: "services" },
    { href: "/produkte", key: "products" },
    { href: "/pricing", key: "pricing" },
  ],
  company: [
    { href: "/about", key: "about" },
    { href: "/partner", key: "partner" },
    { href: "/contact", key: "contact" },
  ],
  legal: [
    { href: "/imprint", key: "imprint" },
    { href: "/privacy", key: "privacy" },
  ],
} as const;
