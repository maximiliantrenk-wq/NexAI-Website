"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavLink } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Menuepunkt mit Klappe (Partner). Oeffnet per Klick, damit er auch auf
 *  Touch-Geraeten funktioniert; schliesst bei Klick daneben, Escape und
 *  nach einem Seitenwechsel. */
export function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly NavLink[];
}) {
  const t = useTranslations("Nav");
  const [offen, setOffen] = useState(false);
  const huelle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!offen) return;
    const beiKlick = (e: MouseEvent) => {
      if (!huelle.current?.contains(e.target as Node)) setOffen(false);
    };
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    document.addEventListener("mousedown", beiKlick);
    document.addEventListener("keydown", beiTaste);
    return () => {
      document.removeEventListener("mousedown", beiKlick);
      document.removeEventListener("keydown", beiTaste);
    };
  }, [offen]);

  return (
    <div ref={huelle} className="relative">
      <button
        type="button"
        aria-expanded={offen}
        aria-haspopup="true"
        onClick={() => setOffen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-fg"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            offen && "rotate-180",
          )}
        />
      </button>

      {offen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[280px] rounded-2xl border border-line bg-bg/95 p-1.5 shadow-[0_18px_44px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {items.map((eintrag) => (
            <Link
              key={eintrag.href}
              href={eintrag.href}
              onClick={() => setOffen(false)}
              className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <span className="block text-sm font-medium text-fg">
                {t(eintrag.key)}
              </span>
              <span className="mt-0.5 block text-xs text-subtle">
                {t(`${eintrag.key}Hint`)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
