# public

## Purpose

Static files served from the site origin: icons, web manifest, Open Graph image, `robots.txt`, and the legacy HTML mirror.

## Ownership

Owns files that must be reachable without a React route. The sitemap is not a file here; it is `src/routes/sitemap.xml.ts`.

## Local Contracts

- Open Graph image: `og-card.png` (1200×630), URL `https://taquangkhoi.com/og-card.png`. Referenced as `og:image` and `twitter:image` from `src/routes/__root.tsx`.
- `robots.txt` has no `Disallow` path. `Sitemap:` points at `https://taquangkhoi.com/sitemap.xml`. Demo routes stay out of the index via the meta tag in `src/routes/demo.tsx`, not via `robots.txt`.
- `public/products/<id>/` holds per-product images (WebP, resized). `products/opensen/` is owned by `src/features/opensen-case-study/`.
- `public/legacy/` is the served copy of the old static site (`/legacy/...`). It matches `legacy/` at the repo root. Change both trees together.

## Work Guidance

Do not put indexable page HTML here. New portfolio pages are React routes under `src/routes/`.

## Verification

## Child DOX Index

- [legacy/AGENTS.md](legacy/AGENTS.md) — static files served at `/legacy/`
