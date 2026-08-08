import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Member = {
  name: string;
  role: string;
  tasks?: string;
  image?: string;
  instagram?: string;
};

/** Inline Instagram glyph — lucide-react (v1) no longer ships brand icons. */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const frameClass =
  "relative mx-auto grid aspect-square w-full place-items-center overflow-hidden rounded-xl border border-line";

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
        <RevealGroup className="mx-auto mt-10 sm:mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {members.map((m) => {
            const photo = m.image ? (
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
            );

            return (
              <RevealItem key={m.name} className="group">
                <div className="overflow-hidden rounded-2xl p-6">
                  {m.instagram ? (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} auf Instagram`}
                      className={`${frameClass} cursor-pointer`}
                    >
                      {photo}
                      <span className="pointer-events-none absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <InstagramGlyph className="size-4" />
                      </span>
                    </a>
                  ) : (
                    <div className={frameClass}>{photo}</div>
                  )}
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-blue-bright">
                    {m.role}
                  </p>
                  {m.tasks && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {m.tasks}
                    </p>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
