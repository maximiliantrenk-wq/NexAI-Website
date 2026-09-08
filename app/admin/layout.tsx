import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";

// Eigener Zweig neben der öffentlichen Website: kein Aurora-Hintergrund, kein
// Header, kein Chat — der Texteditor ist ein Werkzeug, keine Marketingseite.
// Er läuft bewusst außerhalb von next-intl und ist immer deutsch.

export const metadata: Metadata = {
  title: "Texte bearbeiten · NEXAI",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
