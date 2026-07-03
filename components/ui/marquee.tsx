import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  duration = 32,
}: {
  items: React.ReactNode[];
  className?: string;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("mask-fade-x group relative flex overflow-hidden", className)}
    >
      <div
        className="flex shrink-0 items-center gap-14 pr-14 will-change-transform motion-safe:animate-[marquee_var(--dur)_linear_infinite]"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-14 text-lg font-medium text-subtle"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
