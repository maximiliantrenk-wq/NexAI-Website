"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type Row = { path: string; label: string; de: string; en: string };
type Locale = "de" | "en";
type Draft = Record<Locale, Record<string, string>>;

const empty: Draft = { de: {}, en: {} };

export function SectionEditor({
  sectionId,
  title,
  description,
  caution,
  rows,
  canDeploy,
  local,
}: {
  sectionId: string;
  title: string;
  description: string;
  caution?: string;
  rows: Row[];
  canDeploy: boolean;
  local: boolean;
}) {
  const [draft, setDraft] = useState<Draft>(empty);
  const [filter, setFilter] = useState("");
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "saving" }
    | { kind: "saved"; url?: string }
    | { kind: "deploying" }
    | { kind: "deployed" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const changedCount = Object.keys(draft.de).length + Object.keys(draft.en).length;
  const dirty = changedCount > 0;

  // Ungespeicherte Änderungen sollen nicht still verschwinden, wenn der Tab
  // geschlossen wird.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const groups = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    const visible = needle
      ? rows.filter(
          (row) =>
            row.de.toLowerCase().includes(needle) ||
            row.en.toLowerCase().includes(needle) ||
            row.label.toLowerCase().includes(needle),
        )
      : rows;

    const byGroup = new Map<string, Row[]>();
    for (const row of visible) {
      const key = row.path.split(".")[0];
      const list = byGroup.get(key);
      if (list) list.push(row);
      else byGroup.set(key, [row]);
    }
    return [...byGroup.entries()];
  }, [rows, filter]);

  function edit(locale: Locale, row: Row, value: string) {
    setState({ kind: "idle" });
    setDraft((prev) => {
      const next = { ...prev, [locale]: { ...prev[locale] } };
      if (value === row[locale]) delete next[locale][row.path];
      else next[locale][row.path] = value;
      return next;
    });
  }

  async function save() {
    setState({ kind: "saving" });
    const response = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        changes: { [sectionId]: draft },
        note: `Texte geändert: ${title}`,
      }),
    }).catch(() => null);

    const data = await response?.json().catch(() => null);
    if (!response?.ok) {
      setState({ kind: "error", message: data?.error ?? "Speichern fehlgeschlagen." });
      return;
    }
    setDraft(empty);
    setState({ kind: "saved", url: data?.url });
  }

  async function publish() {
    setState({ kind: "deploying" });
    const response = await fetch("/api/admin/deploy", { method: "POST" }).catch(() => null);
    if (!response?.ok) {
      const data = await response?.json().catch(() => null);
      setState({ kind: "error", message: data?.error ?? "Neubau konnte nicht gestartet werden." });
      return;
    }
    setState({ kind: "deployed" });
  }

  return (
    <div className="pb-28">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{description}</p>

      {caution ? (
        <p className="mt-4 max-w-2xl rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          {caution}
        </p>
      ) : null}

      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`In „${title}“ filtern …`}
        className="mt-6 w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-fg outline-none focus-visible:border-blue focus-visible:ring-2 focus-visible:ring-blue/30"
      />

      <div className="mt-8 flex flex-col gap-10">
        {groups.map(([key, groupRows]) => (
          <section key={key}>
            <h2 className="sticky top-[57px] z-10 -mx-5 border-y border-line bg-bg/95 px-5 py-2 font-mono text-xs tracking-[0.16em] text-subtle uppercase backdrop-blur">
              {key}
            </h2>
            <div className="mt-4 flex flex-col gap-6">
              {groupRows.map((row) => (
                <Field
                  key={row.path}
                  row={row}
                  draft={draft}
                  onEdit={(locale, value) => edit(locale, row, value)}
                />
              ))}
            </div>
          </section>
        ))}
        {groups.length === 0 ? (
          <p className="text-muted">Kein Feld enthält „{filter}“.</p>
        ) : null}
      </div>

      <StatusBar
        changedCount={changedCount}
        state={state}
        canDeploy={canDeploy}
        local={local}
        onSave={save}
        onPublish={publish}
      />
    </div>
  );
}

function Field({
  row,
  draft,
  onEdit,
}: {
  row: Row;
  draft: Draft;
  onEdit: (locale: Locale, value: string) => void;
}) {
  const changed = row.path in draft.de || row.path in draft.en;

  return (
    <div
      id={row.path}
      className={`scroll-mt-32 rounded-lg border p-4 transition-colors ${
        changed ? "border-blue/50 bg-blue/[0.06]" : "border-line bg-surface/40"
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-sm font-medium">{row.label}</span>
        <code className="font-mono text-[11px] text-faint">{row.path}</code>
        {changed ? (
          <span className="ml-auto rounded-sm bg-blue/20 px-1.5 py-0.5 text-[11px] font-medium text-blue-bright">
            geändert
          </span>
        ) : null}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <TextInput
          locale="de"
          value={draft.de[row.path] ?? row.de}
          onChange={(value) => onEdit("de", value)}
        />
        <TextInput
          locale="en"
          value={draft.en[row.path] ?? row.en}
          onChange={(value) => onEdit("en", value)}
        />
      </div>
    </div>
  );
}

function TextInput({
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Höhe folgt dem Inhalt: kurze Beschriftungen bleiben einzeilig, ein
  // Datenschutzabsatz bekommt den Platz, den er braucht.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
        {locale === "de" ? "Deutsch" : "Englisch"}
      </span>
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        lang={locale}
        className="resize-none rounded-md border border-line-strong bg-surface px-3 py-2 text-sm leading-relaxed text-fg outline-none focus-visible:border-blue focus-visible:ring-2 focus-visible:ring-blue/30"
      />
    </label>
  );
}

function StatusBar({
  changedCount,
  state,
  canDeploy,
  local,
  onSave,
  onPublish,
}: {
  changedCount: number;
  state: { kind: string; message?: string; url?: string };
  canDeploy: boolean;
  local: boolean;
  onSave: () => void;
  onPublish: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
        <p className="text-sm text-muted">
          {changedCount === 0
            ? "Keine offenen Änderungen"
            : `${changedCount} ${changedCount === 1 ? "Änderung" : "Änderungen"} noch nicht gespeichert`}
        </p>

        {state.kind === "error" ? (
          <p role="alert" className="w-full text-sm text-red-400 md:w-auto">
            {state.message}
          </p>
        ) : null}

        {state.kind === "saved" ? (
          <p className="w-full text-sm text-green-400 md:w-auto">
            Gespeichert.{" "}
            {local
              ? "Die Dateien auf der Platte sind aktualisiert."
              : canDeploy
                ? "Jetzt noch veröffentlichen, damit es live geht."
                : "Zum Livegehen in Coolify auf „Redeploy“."}
          </p>
        ) : null}

        {state.kind === "deployed" ? (
          <p className="w-full text-sm text-green-400 md:w-auto">
            Neubau gestartet. In ein paar Minuten ist der neue Text auf der Website.
          </p>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          {state.kind === "saved" && canDeploy && !local ? (
            <button
              type="button"
              onClick={onPublish}
              className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-bright"
            >
              Veröffentlichen
            </button>
          ) : null}

          <button
            type="button"
            onClick={onSave}
            disabled={changedCount === 0 || state.kind === "saving"}
            className="rounded-md bg-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-bright disabled:opacity-40"
          >
            {state.kind === "saving" ? "Speichert …" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
