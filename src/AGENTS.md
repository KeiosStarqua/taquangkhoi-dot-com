# src

## Purpose

TanStack Start application deployed as https://taquangkhoi.com.

## Ownership

Owns routes, UI, locale catalogs, static content modules, and client helpers. Deploy config and repo-wide tooling stay in the root `AGENTS.md`.

## Local Contracts

- Import alias `#/*` maps to `./src/*` (`package.json` imports).
- Router entry: `src/router.tsx`. Generated route tree: `src/routeTree.gen.ts`. Regenerate it by running `pnpm dev` after adding or renaming route files.
- Sentry client init: `src/instrument.client.ts`, imported first from `src/client.tsx`. Router tracing is attached in `src/router.tsx` when `router.isServer` is false.
- Sentry server init: `src/server.ts` (`Sentry.withSentry` around `wrapFetchWithSentry`). `wrangler.jsonc` `main` is `src/server.ts`. Global request and function middleware: `src/start.ts`. The public DSN lives in `src/lib/sentry.ts`.
- OneDollarStats analytics client init: `src/instrument.analytics.ts`, imported from `src/client.tsx` (client-only, `autocollect: true`). No collector URL override; uses the package default.
- Document shell, `<html lang>`, and default Open Graph image tags: `src/routes/__root.tsx`.
- Design tokens live in `src/styles.css`. Component rules live in `src/components/AGENTS.md` and root `DESIGN.md`.
- Modules prefixed `demo-` under `hooks/`, `lib/`, `components/`, and `data/` belong to the `/demo` playground. They are not portfolio content. Route rules: `src/routes/demo/AGENTS.md`.

## Work Guidance

- Tailwind v4 utilities only. No CSS modules. No inline `style={}` except dynamic values.
- TypeScript strict. No `any` without a comment. Use `as const` for literal types.
- Meta tags go through a route `head()`.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

- [routes/AGENTS.md](routes/AGENTS.md) — file routes, SEO, locale pages, sitemap
- [components/AGENTS.md](components/AGENTS.md) — shared UI
- [i18n/AGENTS.md](i18n/AGENTS.md) — locale catalogs

`src/lib/`, `src/hooks/`, and `src/data/` stay owned here. Product records live in `src/data/products.ts` and are rendered by `src/routes/$lang/products/`. Engineering and open-source records, plus the pure filter helpers (`matchesQuery`, `formatStars`), live in `src/data/projects.ts` (tested in `projects.test.ts`); the projects index also lists `highlightedWork` from `research.ts`. Its copy lives in `projects.*` and `meta.projects`. Experience records (logos, years, highlight links) and core skills live in `src/data/experience.ts` and are rendered by `src/routes/$lang/experience.tsx`; their copy lives in `experience.entries.<id>` in the locale catalogs. Research records (areas, highlighted work, notes, reading list, playground, outbound URLs) live in `src/data/research.ts` and are rendered by `src/routes/$lang/research.tsx`; their copy lives in `research.*`. Paper titles and authors stay in the data file, not the catalogs.
