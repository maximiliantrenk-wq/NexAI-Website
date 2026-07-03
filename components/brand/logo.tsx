import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-blue via-violet to-purple shadow-[0_4px_18px_-6px_rgba(124,58,237,0.85)]",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/20" />
      <svg viewBox="0 0 32 32" className="relative size-[18px]" fill="none">
        <path
          d="M9 23V9l14 14V9"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NEXAI — Home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">NEXAI</span>
    </Link>
  );
}
