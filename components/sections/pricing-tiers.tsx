import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

export function PricingTiers() {
  const t = useTranslations("Pricing");
  const tiers = t.raw("tiers") as Tier[];

  return (
    <Section className="pt-8 sm:pt-10">
      <Container>
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8",
                  tier.highlighted
                    ? "border-transparent bg-elevated shadow-[0_30px_80px_-40px_rgba(124,92,255,0.8)]"
                    : "surface-card",
                )}
              >
                {tier.highlighted && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-blue/60 via-violet/40 to-purple/50 p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]"
                    />
                    <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-blue to-purple px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
                      {t("popular")}
                    </span>
                  </>
                )}

                <h3 className="text-lg font-semibold tracking-tight">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-subtle">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {tier.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-violet"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Button
                    href="/contact"
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className="w-full"
                    withArrow
                  >
                    {t("cta")}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
