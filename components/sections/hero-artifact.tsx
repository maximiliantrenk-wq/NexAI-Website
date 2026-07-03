"use client";

import { motion } from "motion/react";
import { Check, CornerDownLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { easeOutExpo } from "@/lib/motion";

export function HeroArtifact() {
  const t = useTranslations("Hero.console");
  const steps = t.raw("steps") as string[];

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* ambient glow under the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-10 top-6 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(124,92,255,0.25),transparent_70%)] blur-2xl"
      />

      <div className="surface-card overflow-hidden rounded-2xl text-left">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-xs text-subtle">
              {t("label")}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            <span className="size-1.5 animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue to-purple" />
            {t("status")}
          </span>
        </div>

        {/* body */}
        <div className="space-y-3.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
          <div className="flex items-start gap-2 text-fg">
            <span className="select-none text-blue">›</span>
            <span>{t("prompt")}</span>
            <CornerDownLeft className="ml-auto size-3.5 shrink-0 text-subtle" />
          </div>

          <div className="space-y-2.5 border-l border-line pl-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 + i * 0.35,
                  duration: 0.5,
                  ease: easeOutExpo,
                }}
                className="flex items-center gap-2.5 text-muted"
              >
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue to-purple">
                  <Check className="size-2.5 text-white" strokeWidth={3} />
                </span>
                {step}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + steps.length * 0.35, ease: easeOutExpo }}
            className="mt-1 flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-fg"
          >
            <span className="text-gradient font-semibold">✓</span>
            <span className="text-[12.5px] text-muted">{t("result")}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
