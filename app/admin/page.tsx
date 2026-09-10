import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/shell";
import { SignOut } from "@/components/admin/sign-out";
import { flattenStrings, humanizePath } from "@/lib/admin/fields";
import { LOCALES, SECTIONS, type Locale } from "@/lib/admin/sections";
import { loadBundled, storageMode } from "@/lib/admin/store";
import { isSignedIn } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

type Hit = { section: string; sectionTitle: string; locale: Locale; path: string; value: string };

async function search(query: string): Promise<Hit[]> {
  const needle = query.toLowerCase();
  const hits: Hit[] = [];

  for (const section of SECTIONS) {
    for (const locale of LOCALES) {
      const document = await loadBundled(locale, section.id);
      for (const field of flattenStrings(document)) {
        if (field.value.toLowerCase().includes(needle)) {
          hits.push({
            section: section.id,
            sectionTitle: section.title,
            locale,
            path: field.path,
            value: field.value,
          });
        }
      }
    }
    if (hits.length > 60) break;
  }
  return hits.slice(0, 60);
}

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  if (!(await isSignedIn())) redirect("/admin/login");

  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const hits = query.length >= 2 ? await search(query) : [];
  const mode = storageMode();

  return (
    <AdminShell action={<SignOut />}>
      <h1 className="text-2xl font-semibold tracking-tight">Texte der Website</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Jeder Text der Website steht in einem dieser Bereiche — deutsch und englisch nebeneinander.
        Änderungen werden gesammelt und erst beim Speichern übernommen.
      </p>

      {mode === "off" ? (
        <p className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          Es ist kein Zugang zum Repository hinterlegt (<code className="font-mono">GITHUB_TOKEN</code>).
          Bearbeiten ist deshalb abgeschaltet. Siehe <code className="font-mono">ADMIN.md</code>.
        </p>
      ) : null}
      {mode === "local" ? (
        <p className="mt-6 rounded-lg border border-blue/30 bg-blue/10 p-4 text-sm text-blue-bright">
          Lokale Entwicklung: Änderungen werden direkt in die Dateien auf der Platte geschrieben,
          nicht nach GitHub.
        </p>
      ) : null}

      <form method="get" className="mt-8 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Satz oder Wort suchen, z. B. „Erstgespräch“"
          className="w-full rounded-md border border-line-strong bg-surface px-3 py-2.5 text-fg outline-none focus-visible:border-blue focus-visible:ring-2 focus-visible:ring-blue/30"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
        >
          Suchen
        </button>
      </form>

      {query.length >= 2 ? (
        <section className="mt-8">
          <h2 className="text-sm font-medium tracking-[0.14em] text-subtle uppercase">
            {hits.length === 0
              ? "Nichts gefunden"
              : `${hits.length}${hits.length === 60 ? "+" : ""} Fundstellen`}
          </h2>
          <p className="mt-2 text-xs text-subtle">
            Die Suche arbeitet auf dem zuletzt veröffentlichten Stand. Gerade gespeicherte, noch nicht
            veröffentlichte Änderungen sind hier noch nicht zu sehen.
          </p>
          <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
            {hits.map((hit) => (
              <li key={`${hit.section}-${hit.locale}-${hit.path}`}>
                <Link
                  href={`/admin/${hit.section}#${encodeURIComponent(hit.path)}`}
                  className="block px-4 py-3 transition-colors hover:bg-elevated"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-sm font-medium">{hit.sectionTitle}</span>
                    <span className="font-mono text-[11px] tracking-wide text-subtle uppercase">
                      {hit.locale}
                    </span>
                    <span className="text-xs text-subtle">{humanizePath(hit.path)}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{hit.value}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-sm font-medium tracking-[0.14em] text-subtle uppercase">Bereiche</h2>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <li key={section.id} className="bg-bg">
              <Link
                href={`/admin/${section.id}`}
                className="flex h-full flex-col gap-1 p-4 transition-colors hover:bg-elevated"
              >
                <span className="flex items-center gap-2 font-medium">
                  {section.title}
                  {section.caution ? (
                    <span className="rounded-sm bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-medium text-amber-300">
                      Vorsicht
                    </span>
                  ) : null}
                </span>
                <span className="text-sm text-subtle">{section.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
