import { notFound, redirect } from "next/navigation";
import { SectionEditor, type Row } from "@/components/admin/editor";
import { AdminShell } from "@/components/admin/shell";
import { SignOut } from "@/components/admin/sign-out";
import { deployConfigured } from "@/lib/admin/deploy";
import { flattenStrings, humanizePath } from "@/lib/admin/fields";
import { findSection } from "@/lib/admin/sections";
import { loadSection, storageMode } from "@/lib/admin/store";
import { isSignedIn } from "@/lib/admin/session";

// Immer frisch: Der Editor muss den echten Stand aus dem Repository zeigen,
// nicht einen zur Bauzeit eingefrorenen.
export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  if (!(await isSignedIn())) redirect("/admin/login");

  const { section: id } = await params;
  const section = findSection(id);
  if (!section) notFound();

  if (storageMode() === "off") {
    return (
      <AdminShell breadcrumb={section.title} action={<SignOut />}>
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          Es ist kein Zugang zum Repository hinterlegt (<code className="font-mono">GITHUB_TOKEN</code>).
          Bearbeiten ist deshalb abgeschaltet.
        </p>
      </AdminShell>
    );
  }

  let content;
  try {
    content = await loadSection(id);
  } catch (error) {
    return (
      <AdminShell breadcrumb={section.title} action={<SignOut />}>
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Die Texte konnten nicht geladen werden:{" "}
          {error instanceof Error ? error.message : "Unbekannter Fehler"}
        </p>
      </AdminShell>
    );
  }

  // Deutsch gibt die Reihenfolge vor; Englisch wird über denselben Pfad
  // zugeordnet. Fehlt dort ein Feld, bleibt es leer und lässt sich füllen.
  const english = new Map(flattenStrings(content.en).map((f) => [f.path, f.value]));
  const rows: Row[] = flattenStrings(content.de).map((field) => ({
    path: field.path,
    label: humanizePath(field.path),
    de: field.value,
    en: english.get(field.path) ?? "",
  }));

  return (
    <AdminShell breadcrumb={section.title} action={<SignOut />}>
      <SectionEditor
        sectionId={section.id}
        title={section.title}
        description={section.description}
        caution={section.caution}
        rows={rows}
        canDeploy={deployConfigured()}
        local={storageMode() === "local"}
      />
    </AdminShell>
  );
}
