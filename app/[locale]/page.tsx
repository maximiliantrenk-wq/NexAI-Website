import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Capabilities } from "@/components/sections/capabilities";
import { Process } from "@/components/sections/process";
import { Metrics } from "@/components/sections/metrics";
import { ProductHighlights } from "@/components/sections/product-highlights";
import { Testimonial } from "@/components/sections/testimonial";
import { CTASection } from "@/components/sections/cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Capabilities />
      <Process />
      <Metrics />
      <ProductHighlights />
      <Testimonial />
      <CTASection />
    </>
  );
}
