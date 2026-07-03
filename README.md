# NEXAI

Premium, bilingual (DE/EN) marketing website for **NEXAI** — an AI agency for automation, autonomous agents and custom AI development.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **next-intl** and the **Geist** typeface. Dark-first, minimalist design language.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /de
```

Other scripts:

```bash
npm run build      # production build (fully static)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Editing content

All user-facing copy lives in `messages/<locale>/*.json` (one file per section/namespace, mirrored for `de` and `en`). Design tokens (colors, spacing, radii) live in `app/globals.css`.

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture, conventions and follow-ups.
