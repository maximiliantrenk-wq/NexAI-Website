import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const NAMESPACES = [
  "common",
  "home",
  "services",
  "cases",
  "about",
  "pricing",
  "careers",
  "contact",
  "legal",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const modules = await Promise.all(
    NAMESPACES.map((ns) => import(`../messages/${locale}/${ns}.json`)),
  );
  const messages = Object.assign({}, ...modules.map((m) => m.default));

  return { locale, messages };
});
