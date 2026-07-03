# NEXAI — Website

Premium, bilingual (DE/EN) marketing site for **NEXAI**, an AI agency from Crailsheim that builds **"digital employees"** — AI voice agents, chatbots, social-media AI, sales/outreach agents, automations, custom agents and websites. Dark-first, minimalist, world-class design language inspired by OpenAI / Linear / Stripe / Vercel. Contact: mbt@nex-a-i.com · 0176 20147646 · domain nex-a-i.com.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens in `app/globals.css` via `@theme`)
- **Framer Motion** (`motion` package) — restrained entrance/scroll animations, `prefers-reduced-motion` aware
- **next-intl** — i18n with `/de` and `/en`, message catalogs split per namespace
- **Geist** font (Sans + Mono) · **lucide-react** icons
- **react-hook-form + zod** — contact form

## Running locally

Requires **Node.js 18+** (built with Node 22). In this environment a user-local Node lives at `~/.local/opt/node/bin` — add it to `PATH` or install Node normally.

```bash
npm run dev        # dev server on :3000  (use `next dev --webpack` if Turbopack can't spawn workers in a sandbox)
npm run build      # production build (SSG)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

The site is fully static (SSG) for all routes and both locales.

## Structure

```
app/[locale]/            # all pages (root layout with <html>, Header/Footer live here)
  page.tsx               # Home
  services|cases|pricing|about|careers|contact|imprint|privacy/
  cases/[slug]/          # case detail (generateStaticParams from content/cases.ts)
  [...rest]/             # catch-all → notFound()
app/api/contact/         # form endpoint (stub — wire Resend here)
app/sitemap.ts, robots.ts
components/ui/            # primitives: Button, Section, Container, Badge, Reveal, Faq, Marquee, Glow, GradientText
components/layout/        # Header, Footer, MobileNav, LocaleSwitcher
components/sections/      # Hero (WebGL Aurora), Services, Capabilities, Process, Metrics, CaseHighlights, ...
components/brand/logo.tsx
content/cases.ts         # case slugs + gradients (content itself is in messages)
i18n/                    # routing, navigation, request (merges messages/<locale>/*.json)
messages/<locale>/       # per-namespace JSON: common, home, services, cases, about, pricing, careers, contact, legal
proxy.ts                 # next-intl middleware (Next 16 renamed middleware → proxy)
```

## Conventions

- **Colors / spacing / radii** are tokens in `app/globals.css` (`--color-bg`, `--color-blue`, etc.). Use Tailwind utilities like `bg-bg`, `text-muted`, `border-line`, `text-blue-bright`.
- The **blue→violet→purple gradient is reserved** for signature accents (primary buttons, key numbers, the hero). Restraint = premium.
- All copy lives in `messages/<locale>/*.json` — never hard-code user-facing strings. Add a key to **both** `de` and `en`.
- Section entrance animation via `<Reveal>` / `<RevealGroup>` + `<RevealItem>`.
- Reuse `<CTASection namespace="...">`, `<FaqSection namespace="...">`, `<PageHero>` across pages.

## Known follow-ups

- Replace placeholder content with real company facts, cases, team, logos.
- Fill `messages/*/legal.json` imprint/privacy with real legal details (currently a template).
- Wire the contact form to Resend (or another provider) in `app/api/contact/route.ts`.
- Optional: per-page hreflang link tags (sitemap already emits hreflang alternates).
