import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, Next internals, root metadata routes, and files with an extension
  // - /admin: der Texteditor läuft außerhalb von next-intl und ist immer deutsch
  matcher: [
    "/((?!api|admin|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)",
  ],
};
