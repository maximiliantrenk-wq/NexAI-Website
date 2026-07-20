"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { ArrowLeft, CalendarClock, Check, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type Slot = { startISO: string; endISO: string; label: string };
type Day = { date: string; weekday: number; slots: Slot[] };

/** "unavailable" deckt sowohl "noch nicht eingerichtet" als auch Störungen ab. */
type Status = "idle" | "loading" | "ready" | "empty" | "unavailable";

export function Booking() {
  const t = useTranslations("Contact.booking");
  const locale = useLocale();

  const [status, setStatus] = useState<Status>("idle");
  const [days, setDays] = useState<Day[]>([]);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [booked, setBooked] = useState<string | null>(null);

  // Bewusst erst auf Klick statt beim Rendern: so wird der Google-Kalender nur
  // abgefragt, wenn jemand wirklich buchen will — nicht bei jedem Seitenaufruf.
  // Passt ausserdem zur Projektkonvention, in Effekten nicht zu laden.
  async function loadSlots() {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "slots" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok || !Array.isArray(data.days)) {
        setStatus("unavailable");
        return;
      }
      setDays(data.days);
      setDayIndex(0);
      setStatus(data.days.length ? "ready" : "empty");
    } catch {
      setStatus("unavailable");
    }
  }

  const fmtDay = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      timeZone: "UTC", // date ist bereits ein reines Kalenderdatum
    }).format(new Date(`${iso}T12:00:00Z`));

  const fmtFull = (startISO: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Berlin",
    }).format(new Date(startISO));

  // ------------------------------------------------------------- Erfolg
  if (booked) {
    return (
      <Shell t={t}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: easeOutExpo }}
          className="flex flex-col items-center py-10 text-center"
        >
          <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-blue to-purple">
            <Check className="size-7 text-white" strokeWidth={2.5} />
          </span>
          <h3 className="mt-6 text-xl font-semibold tracking-tight">
            {t("successTitle")}
          </h3>
          <p className="mt-2 text-[15px] font-medium text-blue-bright">
            {fmtFull(booked)}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {t("success")}
          </p>
        </motion.div>
      </Shell>
    );
  }

  // ------------------------------------------------------------- Startpunkt
  if (status === "idle") {
    return (
      <Shell t={t}>
        <button
          type="button"
          onClick={loadSlots}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue via-violet to-purple px-7 text-sm font-medium text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] transition-[transform,box-shadow,filter] hover:brightness-[1.08] active:scale-[0.99]"
        >
          <CalendarClock className="size-4" />
          {t("showSlots")}
        </button>
      </Shell>
    );
  }

  // ------------------------------------------------------- Nicht verfügbar
  if (status === "unavailable" || status === "empty") {
    return (
      <Shell t={t}>
        <p className="py-6 text-sm leading-relaxed text-muted">
          {status === "empty" ? t("empty") : t("unavailable")}
        </p>
      </Shell>
    );
  }

  if (status === "loading") {
    return (
      <Shell t={t}>
        <p className="flex items-center gap-2.5 py-6 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" />
          {t("loading")}
        </p>
      </Shell>
    );
  }

  // ------------------------------------------------------------- Formular
  if (slot) {
    return (
      <Shell t={t}>
        <button
          type="button"
          onClick={() => setSlot(null)}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          {t("back")}
        </button>
        <p className="mt-4 text-[15px] font-medium text-blue-bright">
          {fmtFull(slot.startISO)}
        </p>
        <BookingForm
          slot={slot}
          locale={locale}
          onBooked={(iso) => setBooked(iso)}
          onTaken={async () => {
            setSlot(null);
            await loadSlots();
          }}
        />
      </Shell>
    );
  }

  // --------------------------------------------------------- Terminauswahl
  const day = days[dayIndex];

  return (
    <Shell t={t}>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {days.map((d, i) => (
          <button
            key={d.date}
            type="button"
            onClick={() => setDayIndex(i)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              i === dayIndex
                ? "border-transparent bg-white/[0.10] font-medium text-fg"
                : "border-line text-muted hover:text-fg",
            )}
          >
            {fmtDay(d.date)}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {day.slots.map((s) => (
          <button
            key={s.startISO}
            type="button"
            onClick={() => setSlot(s)}
            className="rounded-xl border border-line bg-white/[0.02] py-2.5 text-sm text-fg transition-colors hover:border-blue/60 hover:bg-white/[0.05]"
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-subtle">{t("tzNote")}</p>
    </Shell>
  );
}

function Shell({
  t,
  children,
}: {
  t: ReturnType<typeof useTranslations>;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card rounded-2xl p-7 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{t("title")}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t("description")}
      </p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function BookingForm({
  slot,
  locale,
  onBooked,
  onTaken,
}: {
  slot: Slot;
  locale: string;
  onBooked: (startISO: string) => void;
  onTaken: () => void;
}) {
  const t = useTranslations("Contact.booking");

  const schema = z.object({
    name: z.string().min(2, t("errorRequired")),
    email: z.string().email(t("errorEmail")),
    topic: z.string().optional(),
    company: z.string().optional(), // Honigtopf
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "book",
          startISO: slot.startISO,
          name: values.name,
          email: values.email,
          topic: values.topic ?? "",
          company: values.company ?? "",
          locale,
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.status === 409 || data?.reason === "taken") {
        setError("root", { message: t("errorTaken") });
        setTimeout(onTaken, 1800);
        return;
      }
      if (!res.ok || !data?.ok) throw new Error("request failed");
      onBooked(slot.startISO);
    } catch {
      setError("root", { message: t("errorGeneric") });
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus-visible:border-blue/60 focus-visible:outline-none";
  const label = "mb-2 block text-sm font-medium text-fg";
  const errCls = "mt-1.5 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="b-name" className={label}>
            {t("name")}
          </label>
          <input
            id="b-name"
            {...register("name")}
            placeholder={t("namePlaceholder")}
            className={field}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="b-email" className={label}>
            {t("email")}
          </label>
          <input
            id="b-email"
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
        <label htmlFor="b-topic" className={label}>
          {t("topic")}
        </label>
        <textarea
          id="b-topic"
          rows={3}
          {...register("topic")}
          placeholder={t("topicPlaceholder")}
          className={cn(field, "resize-none")}
        />
      </div>

      {/* Honigtopf gegen Bots — für Menschen nicht sichtbar und nicht fokussierbar. */}
      <input
        {...register("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
      />

      {errors.root && <p className="text-sm text-red-400">{errors.root.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue via-violet to-purple text-sm font-medium text-white shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] transition-[transform,box-shadow,filter] hover:brightness-[1.08] active:scale-[0.99] disabled:opacity-70"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
