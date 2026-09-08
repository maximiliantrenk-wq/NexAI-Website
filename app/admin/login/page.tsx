import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { adminConfigured, isSignedIn } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isSignedIn()) redirect("/admin");

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">NEXAI</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Texte bearbeiten</h1>

      {adminConfigured() ? (
        <>
          <p className="mt-2 mb-8 text-sm text-muted">
            Dieser Bereich ist nur für die Geschäftsführung.
          </p>
          <LoginForm />
        </>
      ) : (
        <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          Der Bereich ist noch nicht eingerichtet. Es fehlen die Variablen{" "}
          <code className="font-mono">ADMIN_PASSWORD_HASH</code> und{" "}
          <code className="font-mono">ADMIN_SESSION_SECRET</code>. Wie du sie erzeugst, steht in{" "}
          <code className="font-mono">ADMIN.md</code>.
        </p>
      )}
    </div>
  );
}
