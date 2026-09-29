# src/routes

## Purpose

File-based TanStack Router routes for the portfolio: locale pages, redirects, sitemap, and the demo layout.

## Ownership

Owns URL contracts, `head()` metadata, redirects, and the sitemap. Translation strings live in `src/i18n/`. Shared UI lives in `src/components/`. Product records live in `src/data/products.ts`.

## Local Contracts

- Canonical origin: `https://taquangkhoi.com`. Root is `/`. Other paths have no trailing slash.
- Locales: `en` and `vi`, validated in `src/routes/$lang.tsx` (`SUPPORTED_LOCALES`). Any other `$lang` is `notFound()`.
- `/` redirects to `/en`. `/about` redirects to `/en/about`. `/research` redirects to `/en/research`.
- Indexable pages: `/$lang`, `/$lang/about`, `/$lang/experience`, `/$lang/products`, `/$lang/research`, `/$lang/products/$productId` for product ids in `src/data/products.ts` (`opensen`, `yt-hunter`, `open-farm`).
- `Person` JSON-LD is injected from the homepage route `head()` as `application/ld+json` (`name`, `alternateName`, `url`, `sameAs`, `jobTitle`, `worksFor`, `nationality`). Homepage `title`/`description` come from `meta.home` in the locale catalogs.
- `/$lang/products` is the projects index (Products, Engineering, Open Source, Research). Optional search params `?category=products|engineering|open-source|research` and `?q=` drive the filter pills and search; canonical URL omits them.
- Sitemap is the dynamic route `src/routes/sitemap.xml.ts`, served at `/sitemap.xml`. It lists only indexable locale URLs. It does not list `/demo/*`.
- `hreflang` alternates are set in `$lang.tsx` `head()`. `<html lang>` is set in `__root.tsx` from the `$lang` match.
- `/demo/*` is crawlable and `noindex, nofollow` via `src/routes/demo.tsx`. Do not add `Disallow: /demo/` to `public/robots.txt`.
- `/api/sentry-example` throws on GET so Sentry can capture a server error. It is not indexable and is not listed in the sitemap. The button that calls it lives at `/demo/sentry`.

## Work Guidance

Adding a language:

1. Add the code to `SUPPORTED_LOCALES` in `src/routes/$lang.tsx`.
2. Add `src/i18n/locales/{locale}.json` with every key from `en.json`.
3. Add the `hreflang` alternate in `$lang.tsx` `head()`.
4. Add the new URLs to `src/routes/sitemap.xml.ts`.

Adding a translatable page:

1. Create `src/routes/$lang/{page}.tsx` and read copy with `useTranslation()`.
2. Add keys to both `src/i18n/locales/en.json` and `vi.json`.
3. Add each locale URL to `src/routes/sitemap.xml.ts`.
4. Set `head()` `og:url` to `https://taquangkhoi.com/{lang}/{page}`.
5. Run `pnpm dev` once so `src/routeTree.gen.ts` regenerates.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

- [demo/AGENTS.md](demo/AGENTS.md) — `/demo/*` playground (`noindex, nofollow`)

`$lang/` stays owned here. It is the locale page tree, not a separate contract.
