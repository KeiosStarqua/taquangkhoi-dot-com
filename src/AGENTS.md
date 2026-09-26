# src

## Purpose

TanStack Start application deployed as https://taquangkhoi.com.

## Ownership

Owns routes, UI, locale catalogs, static content modules, and client helpers. Deploy config and repo-wide tooling stay in the root `AGENTS.md`.

## Local Contracts

- Import alias `#/*` maps to `./src/*` (`package.json` imports).
- Router entry: `src/router.tsx`. Generated route tree: `src/routeTree.gen.ts`. Regenerate it by running `pnpm dev` after adding or renaming route files.
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

`src/lib/`, `src/hooks/`, and `src/data/` stay owned here. Product records live in `src/data/products.ts` and are rendered by `src/routes/$lang/products/`.
