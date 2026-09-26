# src/routes/demo

## Purpose

Playground routes under `/demo/*` (AI chat, image, structured output, store, guitars). Not portfolio content.

## Ownership

Owns demo route modules and the `/demo` layout. Sibling playground code lives outside this folder and stays owned by `src/AGENTS.md`: `src/components/demo-*`, `src/hooks/demo-*`, `src/lib/demo-*`, `src/data/demo-guitars.ts`.

## Local Contracts

- `src/routes/demo.tsx` sets `<meta name="robots" content="noindex, nofollow">` for every child. New demo routes go under this layout so they inherit that tag.
- Do not add demo URLs to `src/routes/sitemap.xml.ts`.
- Do not add `Disallow: /demo/` to `public/robots.txt`.

## Work Guidance

Keep demo experiments behind the `demo-` prefix when they live outside this folder. Do not link them from indexable pages as if they were portfolio projects.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

None. `guitars/` is one demo route group and stays owned here.
