"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full border border-line bg-white/[0.03] p-0.5 font-mono text-[11px] uppercase tracking-[0.12em]">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={active === loc ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            active === loc
              ? "bg-white/10 text-fg"
              : "text-subtle hover:text-muted",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
