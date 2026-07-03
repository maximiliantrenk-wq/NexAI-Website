import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { footerNav, socials } from "@/lib/nav";

export function Footer() {
  const t = useTranslations();
  const nav = useTranslations("Nav");
  const year = new Date().getFullYear();

  const columns = [
    { title: t("Footer.product"), items: footerNav.product },
    { title: t("Footer.company"), items: footerNav.company },
    { title: t("Footer.legal"), items: footerNav.legal },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.14),transparent_70%)] blur-3xl"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[17px] font-semibold tracking-[-0.02em]">
                NEXAI
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t("Footer.tagline")}
            </p>

            <div className="mt-5 space-y-1.5">
              <a
                href={`mailto:${t("Footer.email")}`}
                className="block text-sm text-muted transition-colors hover:text-fg"
              >
                {t("Footer.email")}
              </a>
              <a
                href={`tel:${t("Footer.phone").replace(/\s/g, "")}`}
                className="block text-sm text-muted transition-colors hover:text-fg"
              >
                {t("Footer.phone")}
              </a>
            </div>

            <div className="mt-7">
              <p className="text-sm font-medium text-fg">
                {t("Footer.newsletterTitle")}
              </p>
              <p className="mt-1 text-[13px] text-subtle">
                {t("Footer.newsletterText")}
              </p>
              <form className="mt-3 flex max-w-sm items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder={t("Footer.newsletterPlaceholder")}
                  aria-label={t("Footer.newsletterPlaceholder")}
                  className="h-10 min-w-0 flex-1 rounded-full border border-line bg-white/[0.03] px-4 text-sm text-fg placeholder:text-subtle focus-visible:border-blue/60"
                />
                <button
                  type="submit"
                  className="h-10 shrink-0 rounded-full bg-white/10 px-4 text-sm font-medium text-fg transition-colors hover:bg-white/15"
                >
                  {t("Footer.newsletterCta")}
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
            © {year} NEXAI · {t("Footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
              >
                {s.label}
                <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
            {t("Footer.location")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
