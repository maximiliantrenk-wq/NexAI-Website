"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { type ChatMessage, useChat } from "./use-chat";

const QUICK_REPLY_KEYS = ["services", "appointment", "human"] as const;

export function ChatWidget() {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const { messages, sending, send } = useChat({
    locale,
    errorText: t("error"),
  });

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Focus the input when the panel opens; lock body scroll on the mobile sheet.
  useEffect(() => {
    if (!open) return;
    const focus = window.setTimeout(() => inputRef.current?.focus(), 60);
    const isMobileSheet = window.matchMedia("(max-width: 639px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (isMobileSheet) document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focus);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages, sending]);

  // ESC to close + a lightweight focus trap while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], textarea, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || sending) return;
      setDraft("");
      void send(value);
      inputRef.current?.focus();
    },
    [send, sending],
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(draft);
    }
  };

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: easeOutExpo };

  const showQuickReplies = messages.length === 0;

  return (
    <>
      {/* Launcher — sits below the mobile-nav overlay (z-40) on purpose. */}
      <motion.button
        ref={launcherRef}
        type="button"
        aria-label={open ? t("close") : t("launcher")}
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full text-white",
          "bg-gradient-to-r from-blue via-violet to-purple",
          "shadow-[0_10px_34px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.9)]",
          "transition-shadow duration-200 hover:brightness-[1.06]",
          "outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "[padding-bottom:env(safe-area-inset-bottom)]",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={reduceMotion ? false : { opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, rotate: 30 }}
            transition={{ duration: 0.18, ease: easeOutExpo }}
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={panelTransition}
            style={{ transformOrigin: "bottom right" }}
            className={cn(
              "surface-card fixed z-[60] flex flex-col overflow-hidden bg-surface/95 backdrop-blur-xl",
              // Mobile: full-screen sheet. Desktop: anchored floating card.
              "inset-0 rounded-none",
              "sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-7rem))] sm:w-[400px] sm:max-w-[calc(100vw-2.5rem)] sm:rounded-3xl",
            )}
          >
            <Header title={t("title")} status={t("status")} onClose={close} />

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
            >
              <Bubble role="assistant" content={t("greeting")} />
              {messages.map((m) => (
                <Bubble
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  isError={m.error}
                />
              ))}
              {sending && <TypingIndicator label={t("typing")} reduceMotion={reduceMotion} />}
            </div>

            <div className="border-t border-line bg-surface/80 px-4 pt-3 [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))]">
              {showQuickReplies && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {QUICK_REPLY_KEYS.map((key) => {
                    const label = t(`quickReplies.${key}`);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => submit(label)}
                        disabled={sending}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg disabled:pointer-events-none disabled:opacity-50"
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(draft);
                }}
                className="flex items-end gap-2 rounded-[1.4rem] border border-line-strong bg-white/[0.04] px-3 py-2 focus-within:border-white/25"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  onFocus={() => {
                    // iOS: dvh doesn't shrink for the keyboard — re-pin to bottom.
                    const el = scrollRef.current;
                    if (el) el.scrollTop = el.scrollHeight;
                  }}
                  placeholder={t("placeholder")}
                  aria-label={t("placeholder")}
                  className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-[14px] text-fg placeholder:text-subtle focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={t("send")}
                  disabled={!draft.trim() || sending}
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full text-white transition-[transform,box-shadow,opacity] duration-200",
                    "bg-gradient-to-r from-blue via-violet to-purple",
                    "shadow-[0_8px_24px_-10px_rgba(124,58,237,0.8)] active:scale-95",
                    "disabled:pointer-events-none disabled:opacity-40",
                  )}
                >
                  <Send className="size-4" />
                </button>
              </form>

              <p className="mt-2 text-center text-[11px] text-subtle">
                {t("disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Header({
  title,
  status,
  onClose,
}: {
  title: string;
  status: string;
  onClose: () => void;
}) {
  const t = useTranslations("Chat");
  return (
    <div className="flex items-center gap-3 border-b border-line bg-surface/80 px-4 py-3.5">
      <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white/[0.04]">
        <LogoMark className="size-5" />
        <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-surface bg-gradient-to-r from-blue to-purple shadow-[0_0_8px_var(--color-purple)]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-fg">
          {title}
        </p>
        <p className="truncate text-[12px] text-muted">{status}</p>
      </div>
      <button
        type="button"
        aria-label={t("minimize")}
        onClick={onClose}
        className="grid size-9 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-white/[0.05] hover:text-fg"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

function Bubble({
  role,
  content,
  isError,
}: {
  role: ChatMessage["role"];
  content: string;
  isError?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-2.5", isUser && "justify-end")}>
      {!isUser && (
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center self-end rounded-full border border-line bg-white/[0.04]">
          <LogoMark className="size-4" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed",
          isUser
            ? "rounded-tr-sm border border-line-strong bg-white/[0.07] text-fg"
            : "rounded-tl-sm border border-line bg-elevated text-fg",
          isError && "border-[#ff6b6b]/25 text-muted",
        )}
      >
        {content}
      </div>
    </div>
  );
}

function TypingIndicator({
  label,
  reduceMotion,
}: {
  label: string;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="flex gap-2.5" aria-live="polite" aria-label={label}>
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center self-end rounded-full border border-line bg-white/[0.04]">
        <LogoMark className="size-4" />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-elevated px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-subtle"
            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}
