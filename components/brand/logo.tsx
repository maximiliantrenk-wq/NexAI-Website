import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** The NEXAI "N" mark — line-art N with a blue→violet gradient dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={cn("size-8 text-fg", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="nexai-dot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4d7cff" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <g
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M31 71V27l34 44" />
        <path d="M65 71V34" />
        <path d="M38 47l18 22" />
      </g>
      <circle cx="65" cy="26" r="6.5" fill="url(#nexai-dot)" />
    </svg>
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
