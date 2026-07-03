import {
  ArrowUpRight,
  AtSign,
  Globe,
  MessagesSquare,
  PhoneCall,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";

type ServiceItem = { name: string; description: string };
type Custom = { tag: string; title: string; description: string; cta: string };

const ICONS = [PhoneCall, MessagesSquare, AtSign, Target, Workflow, Globe];

export function Services() {
  const t = useTranslations("Home.services");
  const items = t.raw("items") as ServiceItem[];
  const custom = t.raw("custom") as Custom;

  return (
    <Section id="services-preview">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="sm:max-w-2xl"
          />
          <Reveal className="shrink-0">
            <Button href="/services" variant="secondary" size="sm" withArrow>
              {t("cta")}
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? PhoneCall;
            return (
              <RevealItem key={item.name}>
                <Link
                  href="/services"
                  className="surface-card group relative flex h-full flex-col rounded-2xl p-7 transition-colors duration-300 hover:border-white/20"
                >
                  <ArrowUpRight className="absolute right-6 top-6 size-4 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03]">
                    <Icon className="size-5 text-blue-bright" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Custom / bespoke agents — featured */}
        <Reveal className="mt-5">
          <div className="surface-card relative isolate overflow-hidden rounded-2xl p-8 sm:p-10">
            <Glow
              className="right-0 top-0 h-72 w-96 translate-x-1/3 -translate-y-1/3"
              intensity={0.28}
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-blue-bright">
                  <Sparkles className="size-3.5" />
                  {custom.tag}
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  {custom.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {custom.description}
                </p>
              </div>
              <Button href="/contact" variant="secondary" withArrow>
                {custom.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
