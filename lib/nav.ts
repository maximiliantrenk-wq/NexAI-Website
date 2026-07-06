export const navItems = [
  { href: "/services", key: "services" },
  { href: "/produkte", key: "products" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/careers", key: "careers" },
] as const;

export const footerNav = {
  product: [
    { href: "/services", key: "services" },
    { href: "/produkte", key: "products" },
    { href: "/pricing", key: "pricing" },
  ],
  company: [
    { href: "/about", key: "about" },
    { href: "/careers", key: "careers" },
    { href: "/contact", key: "contact" },
  ],
  legal: [
    { href: "/imprint", key: "imprint" },
    { href: "/privacy", key: "privacy" },
  ],
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "GitHub", href: "https://github.com" },
] as const;
