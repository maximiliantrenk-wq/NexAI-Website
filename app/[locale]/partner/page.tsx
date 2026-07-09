import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Layers,
  LifeBuoy,
  PhoneCall,
  Puzzle,
  Scaling,
  Tag,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Philosophy } from "@/components/sections/philosophy";
import { FaqSection } from "@/components/sections/faq-section";
import { PartnerProblem } from "@/components/sections/partner/problem";
import { PartnerFlow } from "@/components/sections/partner/flow";
import { PartnerBenefits } from "@/components/sections/partner/benefits";
import { PartnerAudience } from "@/components/sections/partner/audience";
import { PartnerExample } from "@/components/sections/partner/example";
import { PartnerWhy } from "@/components/sections/partner/why";
import { PartnerForm } from "@/components/sections/partner/partner-form";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partner" });
  return { title: t("meta.title") };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnerContent />;
}

const btnBase =
  "group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-[transform,background,box-shadow,color,border-color] duration-200 ease-out active:scale-[0.98]";

const partnerIcons = [
  Layers,
  TrendingUp,
  Tag,
  Target,
  HeartHandshake,
  Award,
  LifeBuoy,
  Puzzle,
];

const customerIcons = [
  Clock,
  PhoneCall,
  CalendarCheck,
  Zap,
  Users,
  CheckCircle2,
  Timer,
  Scaling,
];

function PartnerContent() {
  const t = useTranslations("Partner.hero");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      >
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-wrap gap-3">
            <a
              href="#partner-form"
              className={cn(
                btnBase,
                "bg-gradient-to-r from-blue via-violet to-purple text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.9)] hover:brightness-[1.08]",
              )}
            >
              {t("primary")}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#ablauf"
              className={cn(
                btnBase,
                "border border-line-strong bg-white/[0.045] text-fg backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.08]",
              )}
            >
              {t("secondary")}
            </a>
          </div>
          <p className="text-sm text-subtle">{t("reassurance")}</p>
        </div>
      </PageHero>

      <Philosophy namespace="Partner.positioning" />
      <PartnerProblem />
      <PartnerFlow />
      <PartnerBenefits namespace="Partner.partnerBenefits" icons={partnerIcons} />
      <PartnerBenefits
        namespace="Partner.customerBenefits"
        icons={customerIcons}
      />
      <PartnerAudience />
      <PartnerExample />
      <PartnerWhy />
      <FaqSection namespace="Partner.faq" />
      <PartnerForm />
    </>
  );
}
