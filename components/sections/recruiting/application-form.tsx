"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Booking } from "@/components/sections/booking";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { readAttribution } from "@/lib/attribution";
import { ROLES, type Role } from "@/content/commission";

const EXPERIENCE = ["none", "lt1", "1to3", "gt3"] as const;
const AVAILABILITY = ["lt10", "10to20", "20to30", "gt30"] as const;

type Submitted = { name: string; email: string; role: Role; ref?: string };

export function ApplicationForm() {
  const t = useTranslations("Recruiting.form");
  const locale = useLocale();
  const assurances = t.raw("assurances") as string[];
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2, t("errorRequired")).max(80, t("errorRequired")),
    email: z.string().trim().email(t("errorEmail")).max(120, t("errorEmail")),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9 ()/.-]{6,40}$/, t("errorPhone")),
    role: z.enum(["setter", "closer", "both"], { message: t("errorSelect") }),
    experience: z.enum(EXPERIENCE, { message: t("errorSelect") }),
    availability: z.enum(AVAILABILITY, { message: t("errorSelect") }),
    profile: z.string().trim().max(200).optional(),
    message: z.string().trim().max(2000).optional(),
    privacy: z.literal(true, { message: t("errorPrivacy") }),
    company: z.string().max(200).optional(), // Honigtopf
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "closer", experience: undefined, availability: undefined },
  });

  const role = useWatch({ control, name: "role" });

  async function onSubmit(values: FormValues) {
    const attribution = readAttribution();
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          role: values.role,
          experience: values.experience,
          availability: values.availability,
          profile: values.profile ?? "",
          message: values.message ?? "",
          privacy: true,
          locale,
          company: values.company ?? "",
          attribution: attribution ?? undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 429) {
        setError("root", { message: t("errorRateLimited") });
        return;
      }
      if (!res.ok || !data?.ok) throw new Error("request failed");
      setSubmitted({
        name: values.name,
        email: values.email,
        role: values.role,
        ref: attribution?.ref ?? attribution?.utmSource,
      });
    } catch {
      setError("root", { message: t("errorGeneric") });
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus-visible:border-blue/60 focus-visible:outline-none";
  const label = "mb-2 block text-sm font-medium text-fg";
  const errCls = "mt-1.5 text-xs text-red-400";

  const topic = submitted
    ? `Vertriebspartner-Bewerbung (${t(`roles.${submitted.role}`)})${submitted.ref ? ` · ref: ${submitted.ref}` : ""}`
    : "";

  return (
    <Section id="bewerbung">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">{t("eyebrow")}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.75rem]">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                {t("description")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3.5">
                {assurances.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-[15px]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue to-purple">
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-4">
                <Image
                  src="/team/maximilian.jpg"
                  alt={t("contactName")}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-[15px] font-medium text-fg">{t("contactName")}</p>
                  <p className="text-sm text-muted">{t("contactRole")}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: easeOutExpo }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue to-purple">
                    <Check className="size-6 text-white" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {t("successTitle", { name: submitted.name })}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t("successText", { name: submitted.name, email: submitted.email })}
                    </p>
                  </div>
                </div>
                <div id="termin">
                  <Booking
                    namespace="Recruiting.booking"
                    defaults={{ name: submitted.name, email: submitted.email, topic }}
                    hideTopic
                  />
                </div>
                <p className="text-xs text-subtle">{t("successHint")}</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="surface-card rounded-2xl p-7 sm:p-8"
              >
                <div className="grid gap-5">
                  <div>
                    <p className={label}>{t("role")}</p>
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map((r) => (
                        <label
                          key={r}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                            role === r
                              ? "border-blue/60 bg-blue/10 text-fg"
                              : "border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-fg",
                          )}
                        >
                          <input
                            type="radio"
                            value={r}
                            {...register("role")}
                            className="sr-only"
                          />
                          {t(`roles.${r}`)}
                        </label>
                      ))}
                    </div>
                    {errors.role && <p className={errCls}>{errors.role.message}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="a-name" className={label}>
                        {t("name")}
                      </label>
                      <input
                        id="a-name"
                        autoComplete="name"
                        {...register("name")}
                        placeholder={t("namePlaceholder")}
                        className={field}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className={errCls}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="a-email" className={label}>
                        {t("email")}
                      </label>
                      <input
                        id="a-email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                        placeholder={t("emailPlaceholder")}
                        className={field}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className={errCls}>{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="a-phone" className={label}>
                        {t("phone")}
                      </label>
                      <input
                        id="a-phone"
                        type="tel"
                        autoComplete="tel"
                        {...register("phone")}
                        placeholder={t("phonePlaceholder")}
                        className={field}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="a-profile" className={label}>
                        {t("profile")}
                      </label>
                      <input
                        id="a-profile"
                        {...register("profile")}
                        placeholder={t("profilePlaceholder")}
                        className={field}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="a-experience" className={label}>
                        {t("experience")}
                      </label>
                      <div className="relative">
                        <select
                          id="a-experience"
                          {...register("experience")}
                          defaultValue=""
                          aria-invalid={!!errors.experience}
                          className={cn(field, "cursor-pointer appearance-none pr-10")}
                        >
                          <option value="" disabled>
                            {t("errorSelect")}
                          </option>
                          {EXPERIENCE.map((o) => (
                            <option key={o} value={o} className="bg-elevated text-fg">
                              {t(`experienceOptions.${o}`)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                      </div>
                      {errors.experience && (
                        <p className={errCls}>{errors.experience.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="a-availability" className={label}>
                        {t("availability")}
                      </label>
                      <div className="relative">
                        <select
                          id="a-availability"
                          {...register("availability")}
                          defaultValue=""
                          aria-invalid={!!errors.availability}
                          className={cn(field, "cursor-pointer appearance-none pr-10")}
                        >
                          <option value="" disabled>
                            {t("errorSelect")}
                          </option>
                          {AVAILABILITY.map((o) => (
                            <option key={o} value={o} className="bg-elevated text-fg">
                              {t(`availabilityOptions.${o}`)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                      </div>
                      {errors.availability && (
                        <p className={errCls}>{errors.availability.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="a-message" className={label}>
                      {t("message")}
                    </label>
                    <textarea
                      id="a-message"
                      rows={4}
                      {...register("message")}
                      placeholder={t("messagePlaceholder")}
                      className={cn(field, "resize-none")}
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <input
                        type="checkbox"
                        {...register("privacy")}
                        className="mt-1 size-4 shrink-0 accent-[var(--color-blue)]"
                        aria-invalid={!!errors.privacy}
                      />
                      <span>
                        {t("privacy")}{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-bright underline-offset-4 hover:underline"
                        >
                          {t("privacyLink")}
                        </Link>
                      </span>
                    </label>
                    {errors.privacy && <p className={errCls}>{errors.privacy.message}</p>}
                  </div>

                  {/* Honigtopf gegen Bots — für Menschen nicht sichtbar und nicht fokussierbar. */}
                  <input
                    {...register("company")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
                  />

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
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
