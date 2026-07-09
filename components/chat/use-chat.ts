"use client";

import { useCallback, useEffect, useState } from "react";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  /** Assistant bubble that represents a transport/backend failure. */
  error?: boolean;
};

const STORAGE_KEY = "nexai-chat-v1";
/** Client-side safety net; the server aborts n8n earlier (see /api/chat). */
const REQUEST_TIMEOUT_MS = 55_000;

type Persisted = { sessionId: string; messages: ChatMessage[] };

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback stays within the /api/chat sessionId charset (a-zA-Z0-9-, ≤64).
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

/** Read the persisted session from sessionStorage (client only, never throws). */
function loadPersisted(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Persisted>;
    return {
      sessionId:
        typeof data.sessionId === "string" ? data.sessionId : newId(),
      messages: Array.isArray(data.messages)
        ? (data.messages as ChatMessage[])
        : [],
    };
  } catch {
    return null;
  }
}

/**
 * Owns the chat conversation: a stable per-tab session id, the message list,
 * persistence to sessionStorage, and the request lifecycle against /api/chat.
 *
 * State is seeded lazily from storage (not in an effect) so there is no
 * cascading re-render; this stays hydration-safe because the transcript is only
 * ever rendered inside the panel, which is closed on the server and first
 * client render.
 */
export function useChat({
  locale,
  errorText,
}: {
  locale: string;
  errorText: string;
}) {
  // Seed the boot snapshot exactly once via a lazy initializer — the sanctioned
  // place to read an external store. `boot` never changes, so `sessionId` is
  // stable for the tab's lifetime.
  const [boot] = useState<Persisted>(
    () => loadPersisted() ?? { sessionId: newId(), messages: [] },
  );
  const sessionId = boot.sessionId;

  const [messages, setMessages] = useState<ChatMessage[]>(boot.messages);
  const [sending, setSending] = useState(false);

  // Persist after every change.
  useEffect(() => {
    try {
      const data: Persisted = { sessionId, messages };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Private mode / quota — non-fatal, chat still works in-memory.
    }
  }, [sessionId, messages]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "user", content: trimmed },
      ]);
      setSending(true);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const fail = () =>
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: errorText, error: true },
        ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: trimmed,
            locale,
          }),
          signal: controller.signal,
        });

        const data = (await res.json().catch(() => null)) as
          | { ok?: boolean; reply?: string }
          | null;

        if (
          res.ok &&
          data?.ok &&
          typeof data.reply === "string" &&
          data.reply
        ) {
          setMessages((prev) => [
            ...prev,
            { id: newId(), role: "assistant", content: data.reply as string },
          ]);
        } else {
          fail();
        }
      } catch {
        fail();
      } finally {
        clearTimeout(timeout);
        setSending(false);
      }
    },
    [locale, sending, errorText, sessionId],
  );

  return { messages, sending, send };
}
