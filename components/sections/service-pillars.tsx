import {
  AtSign,
  Check,
  Globe,
  MessagesSquare,
  PhoneCall,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type ServiceDetail = {
  name: string;
  summary: string;
  features: string[];
};

const ICONS = [
  PhoneCall,
  MessagesSquare,
  AtSign,
  Target,
  Workflow,
  Sparkles,
  Globe,
];

export function ServicePillars() {
  const t = useTranslations("Services.list");
  const items = t.raw("items") as ServiceDetail[];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-14 space-y-5">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <Reveal key={item.name}>
                <article className="surface-card grid gap-8 rounded-2xl p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03]">
                        <Icon className="size-5 text-blue-bright" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    <p className="eyebrow mb-4">{t("capabilitiesLabel")}</p>
                    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {item.features.map((f) => (
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
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
