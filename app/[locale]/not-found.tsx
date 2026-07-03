import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const common = useTranslations("Common");

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
      <p className="text-gradient text-7xl font-semibold tracking-tight sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-sm text-muted">{t("description")}</p>
      <Button href="/" className="mt-8" withArrow>
        {common("backHome")}
      </Button>
    </Container>
  );
}
