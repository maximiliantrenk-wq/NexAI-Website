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
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
