import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const LOGOS = ["Northwind", "Aperture", "Helix", "Quanta", "Vela", "Nova"];

export function LogoCloud() {
  const t = useTranslations("Home.trust");
  return (
    <div className="border-y border-line bg-white/[0.012]">
      <Container className="py-10">
        <p className="eyebrow text-center">{t("label")}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold tracking-tight text-subtle transition-colors hover:text-muted"
            >
              {logo}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
