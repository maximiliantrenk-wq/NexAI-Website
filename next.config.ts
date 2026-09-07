import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Standalone server bundle for the Docker/Coolify deploy on Hetzner. Vercel ignores this.
  output: "standalone",
  // Kurzlinks für Social/DM — Query-Parameter (?ref=…) werden durchgereicht.
  async redirects() {
    return [
      { source: "/closer", destination: "/de/vertriebspartner", permanent: false },
      { source: "/setter", destination: "/de/vertriebspartner", permanent: false },
      // Produkte umbenannt (07.09.2026): alte Adressen dauerhaft weiterleiten.
      { source: "/:locale(de|en)/produkte/vertriebs-agent", destination: "/:locale/produkte/nexai-crm", permanent: true },
      { source: "/:locale(de|en)/produkte/social-media-agent", destination: "/:locale/produkte/nexai-kalender", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
