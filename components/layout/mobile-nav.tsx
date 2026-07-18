"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { easeOutExpo } from "@/lib/motion";

export function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? t("close") : t("menu")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full border border-line bg-white/[0.03] text-fg"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed inset-0 top-16 z-40 border-t border-line bg-bg/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-6 py-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, ease: easeOutExpo }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 text-2xl font-medium tracking-tight text-fg"
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col items-stretch gap-4">
                <Button
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full"
                  withArrow
                >
                  {t("cta")}
                </Button>
                <div className="flex justify-center">
                  <LocaleSwitcher />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
