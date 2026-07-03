import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-32 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,92,255,0.18),transparent_70%),radial-gradient(50%_50%_at_75%_10%,rgba(77,124,255,0.14),transparent_70%)]"
        />
        <div className="bg-grid absolute inset-0 opacity-30 mask-fade-b" />
      </div>

      <Container>
        <Reveal>
          <Badge dot>{eyebrow}</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted">
              {description}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
