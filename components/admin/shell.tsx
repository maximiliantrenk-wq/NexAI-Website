import Link from "next/link";

/** Gemeinsamer Rahmen aller Editor-Seiten: schmale Kopfzeile, ruhiger Inhalt. */
export function AdminShell({
  children,
  breadcrumb,
  action,
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3">
          <Link
            href="/admin"
            className="font-mono text-xs tracking-[0.18em] text-subtle uppercase transition-colors hover:text-fg"
          >
            Texte
          </Link>
          {breadcrumb ? (
            <>
              <span aria-hidden className="text-faint">
                /
              </span>
              <span className="truncate text-sm text-fg">{breadcrumb}</span>
            </>
          ) : null}
          <div className="ml-auto flex items-center gap-3">{action}</div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">{children}</main>
    </div>
  );
}
