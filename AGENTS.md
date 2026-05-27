# AGENTS.md — Project Context for AI Agents

## Project Identity

- **Site**: Personal portfolio for Tạ Quang Khôi (alias: Keios Starqua)
- **Canonical domain**: `https://taquangkhoi.com`
- **Repo**: `taquangkhoi.github.io`
- **Deployment**: Cloudflare Workers via `wrangler deploy`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR React meta-framework) |
| Router | TanStack React Router (file-based routing, `src/routes/`) |
| Build | Vite 8.x |
| Language | TypeScript 6.x / React 19 |
| Styling | Tailwind CSS v4.x (`@tailwindcss/vite` plugin) |
| Deployment | Cloudflare Workers (`wrangler.jsonc`) |
| Package manager | pnpm |
| Linting/Format | Biome 2.x (`biome.json`) — NOT ESLint/Prettier |
| Testing | Vitest 4.x |
| i18n | i18next + react-i18next (URL-prefix strategy) |

## Rules for Agents

- **Package manager**: `pnpm` always. Never `npm` or `npx`. Use `pnpm add` / `pnpm run`.
- **Linter**: Biome — run `pnpm check` before committing, never configure ESLint.
- **Routing**: File-based under `src/routes/`. After adding/renaming route files, run `pnpm dev` once to regenerate `src/routeTree.gen.ts`.
- **TypeScript**: Strict mode. No `any` without a comment. Use `as const` for literal types.
- **Styling**: Tailwind v4 utility classes only. No CSS modules. No inline `style={}` except for dynamic values.
- **No `npm`/`npx`**: Always `pnpm`/`bunx`. Zero exceptions.
- **Head management**: Use TanStack Router's `head()` option on each route for meta tags, not `react-helmet` or any other library.

## SEO Architecture Decisions

### Domain & Canonical
- Canonical domain: `https://taquangkhoi.com`
- All canonical links must use this exact domain (no trailing slash inconsistency — pages use `/` for root, no trailing slash elsewhere)

### Social Card
- File: `public/og-card.png` (1200×630)
- URL: `https://taquangkhoi.com/og-card.png`
- Used in: `og:image` and `twitter:image` meta tags (set globally in `__root.tsx`)

### Sitemap
- **Dynamic** — served from `src/routes/sitemap.xml.ts`
- URL: `https://taquangkhoi.com/sitemap.xml`
- Includes only indexable routes (`/en/`, `/en/about`, `/vi/`, `/vi/about`)
- Does NOT include `/demo/*` routes
- Update this file when adding new content pages

### Robots
- `public/robots.txt` — no `Disallow` directives (demo routes excluded via `noindex` meta, not robots.txt)
- `Sitemap:` directive points to `https://taquangkhoi.com/sitemap.xml`

### Demo Routes (`/demo/*`)
- All demo routes are **crawlable** but carry `<meta name="robots" content="noindex, nofollow">`
- This is set via the `src/routes/demo.tsx` layout route's `head()` — applies to all children automatically
- Do NOT add `Disallow: /demo/` to robots.txt

## Multi-language (i18n)

### Strategy: URL prefix
- English: `/en/`, `/en/about`
- Vietnamese: `/vi/`, `/vi/about`
- Root `/` redirects to `/en` (server-side, via loader)
- Old `/about` redirects to `/en/about`

### Implementation
- Library: `i18next` + `react-i18next`
- Translation files: `src/i18n/locales/en.json` and `src/i18n/locales/vi.json`
- i18next instance created per-render in `src/routes/$lang.tsx` layout using `createInstance()` + `initImmediate: false` (synchronous, SSR-safe)
- `$lang` param validated against `['en', 'vi']` — throws `notFound()` for invalid locales
- `hreflang` alternate links injected in `$lang.tsx` head()
- `<html lang="...">` attribute reads `$lang` param from current route matches in `__root.tsx`

### Adding a new language
1. Add locale code to `SUPPORTED_LOCALES` array in `src/routes/$lang.tsx`
2. Create `src/i18n/locales/{locale}.json` with all keys from `en.json`
3. Add alternate `hreflang` link in `$lang.tsx` head()
4. Add new URLs to `sitemap.xml.ts`

### Adding a new translatable page
1. Create `src/routes/$lang/{page}.tsx` using `useTranslation()`
2. Add translation keys to both `en.json` and `vi.json`
3. Add the page's canonical URL to `sitemap.xml.ts`
4. Add `head()` with `og:url` pointing to the canonical URL for that locale

## Route Map

| Route | File | Indexed? | Notes |
|---|---|---|---|
| `/` | `routes/index.tsx` | No (redirect) | Redirects to `/en` |
| `/en` | `routes/$lang/index.tsx` | Yes | English homepage |
| `/en/about` | `routes/$lang/about.tsx` | Yes | English about page |
| `/vi` | `routes/$lang/index.tsx` | Yes | Vietnamese homepage |
| `/vi/about` | `routes/$lang/about.tsx` | Yes | Vietnamese about page |
| `/about` | `routes/about.tsx` | No (redirect) | Redirects to `/en/about` |
| `/demo/*` | `routes/demo/*.tsx` | No (noindex) | Demo playground pages |
| `/sitemap.xml` | `routes/sitemap.xml.ts` | N/A | Dynamic XML response |

## JSON-LD Structured Data

- `Person` schema on `/en` and `/vi` (homepage)
- Schema fields: `name`, `alternateName`, `url`, `sameAs` (GitHub, LinkedIn, X, ORCID), `jobTitle`, `nationality`
- Injected via `scripts` array in route `head()` as `application/ld+json`
