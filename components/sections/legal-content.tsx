import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";

type LegalSection = { heading: string; body: string };

export function LegalContent({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const legal = useTranslations("Legal");
  const sections = t.raw("sections") as LegalSection[];
  const hasUpdated = t.has("updated");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />
      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            {hasUpdated && (
              <p className="text-sm text-subtle">
                {t("updatedLabel")}: {t("updated")}
              </p>
            )}
            <div className="mt-4 rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-muted">
              {legal("templateNotice")}
            </div>

            <div className="mt-10 space-y-10">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {s.heading}
                  </h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
