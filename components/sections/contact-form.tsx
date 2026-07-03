"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

export function ContactForm() {
  const t = useTranslations("Contact.form");

  const schema = z.object({
    name: z.string().min(1, t("errorRequired")),
    email: z.string().email(t("errorEmail")),
    company: z.string().optional(),
    message: z.string().min(10, t("errorRequired")),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      setError("root", { message: t("errorGeneric") });
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus-visible:border-blue/60 focus-visible:outline-none";
  const label = "mb-2 block text-sm font-medium text-fg";
  const errCls = "mt-1.5 text-xs text-red-400";

  if (isSubmitSuccessful && !errors.root) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: easeOutExpo }}
        className="surface-card flex flex-col items-center rounded-2xl px-8 py-16 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-blue to-purple">
          <Check className="size-7 text-white" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 text-xl font-semibold tracking-tight">
          {t("successTitle")}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{t("success")}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="surface-card rounded-2xl p-7 sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              {t("name")}
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className={field}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className={errCls}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={label}>
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className={field}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={errCls}>{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="company" className={label}>
            {t("company")}
          </label>
          <input
            id="company"
            {...register("company")}
            placeholder={t("companyPlaceholder")}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="message" className={label}>
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            placeholder={t("messagePlaceholder")}
            className={cn(field, "resize-none")}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className={errCls}>{errors.message.message}</p>}
        </div>

        <AnimatePresence>
          {errors.root && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {errors.root.message}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue via-violet to-purple text-sm font-medium text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] transition-[transform,box-shadow,filter] hover:brightness-[1.08] active:scale-[0.99] disabled:opacity-70"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
