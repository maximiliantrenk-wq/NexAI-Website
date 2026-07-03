import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm",
        className,
      )}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-gradient-to-r from-blue to-purple shadow-[0_0_10px_var(--color-purple)]" />
      )}
      {children}
    </span>
  );
}
