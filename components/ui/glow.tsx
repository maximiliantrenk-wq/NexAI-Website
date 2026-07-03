import { cn } from "@/lib/utils";

/** Soft radial brand glow used behind key elements. Purely decorative. */
export function Glow({
  className,
  from = "var(--color-violet)",
  via = "var(--color-blue)",
  intensity = 0.4,
}: {
  className?: string;
  from?: string;
  via?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-[110px]",
        className,
      )}
      style={{
        background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${from} ${Math.round(
          intensity * 100,
        )}%, transparent), color-mix(in oklab, ${via} ${Math.round(
          intensity * 55,
        )}%, transparent) 45%, transparent 70%)`,
      }}
    />
  );
}
