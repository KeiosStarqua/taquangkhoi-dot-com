# src/i18n

## Purpose

Locale catalogs for the URL-prefix languages (`/en`, `/vi`).

## Ownership

Owns `locales/*.json`. The i18next instance, `SUPPORTED_LOCALES`, and `hreflang` links stay in `src/routes/$lang.tsx`.

## Local Contracts

- Libraries: `i18next` and `react-i18next`.
- Catalogs: `locales/en.json` and `locales/vi.json`. Keys match across catalogs.
- The route layout creates one i18next instance per render with `createInstance()` and `initImmediate: false` so init stays synchronous on the server.

## Work Guidance

When adding a language or a translatable page, follow the steps in `src/routes/AGENTS.md`. Do not add a key to only one catalog.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

None. `locales/` is the catalog directory and stays owned here.
