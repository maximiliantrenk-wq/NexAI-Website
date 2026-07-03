import { ArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

type Role = { title: string; type: string; location: string };

export function Jobs() {
  const t = useTranslations("Careers.roles");
  const roles = t.raw("items") as Role[];

  return (
    <Section id="roles">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-12 border-t border-line">
          {roles.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.04}>
              <Link
                href="/contact"
                className="group flex flex-col gap-3 border-b border-line py-6 transition-colors hover:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:px-2"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-blue-bright">
                    {role.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-4 text-sm text-muted">
                    <span>{role.type}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {role.location}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-fg">
                  {t("applyLabel")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
