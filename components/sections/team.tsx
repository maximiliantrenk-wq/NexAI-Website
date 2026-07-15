import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Member = { name: string; role: string; image?: string };

export function Team() {
  const t = useTranslations("About.team");
  const members = t.raw("members") as Member[];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <RevealGroup className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {members.map((m) => (
            <RevealItem key={m.name} className="group">
              <div className="surface-card overflow-hidden rounded-2xl p-6">
                <div className="relative mx-auto grid aspect-square w-full place-items-center overflow-hidden rounded-xl border border-line">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-70 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          background:
                            "radial-gradient(120% 100% at 30% 20%, rgba(124,92,255,0.5), transparent 60%), radial-gradient(120% 100% at 80% 90%, rgba(77,124,255,0.45), transparent 60%), #0c0d15",
                        }}
                      />
                      <span className="relative text-3xl font-semibold text-white/90">
                        {m.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{m.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
