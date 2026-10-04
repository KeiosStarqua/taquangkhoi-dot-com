# src/features/opensen-case-study

## Purpose

Long-form case study rendered at `/$lang/products/opensen` (`<OpenSenCaseStudy>`): hero with an app window, then eight numbered sections (problem, core idea, system, features, product in action, experiment, what I learned, next steps).

## Ownership

Owns the case-study layout, its section visuals, and the app-preview data. Copy lives in `products.opensen.caseStudy` in `src/i18n/locales/*.json`. Styles are `.chunk-tone`, `.margin-note`, and `.opensen-app` in `src/styles.css`. The route wiring and `head()` stay in `src/routes/$lang/products/$productId.tsx`.

## Local Contracts

- Public surface: `index.ts` (`OpenSenCaseStudy`, `getOpenSenCopy`). Do not deep-import.
- `api/copy.ts` reads the catalogs directly so the nested copy stays typed. `caseStudy.meta` feeds the route `title` and `description`.
- `data/app-preview.ts` mirrors the real app (`KeiosStarqua/opensen`, `web/src/lib/studio/content.ts` and `web/src/lib/app-routes.ts`): shell tabs, the "At the Airport / Ask for help" step, its sentence, chunk split, and slot variants. These strings are English product UI in every locale. Update them from the app repo, not by invention.
- Assets come from the app repo, resized to WebP: `public/products/opensen/logo.webp`, `ask-help.webp`.
- The `.opensen-app` window keeps the app's light studio palette in both themes, like the code window stays dark.
- Chunk roles use `--chunk-request`, `--chunk-action`, `--chunk-slot` (plus `error` for the "what didn't" card). They encode meaning, not decoration.
- The app repo is private: no GitHub CTA. CTAs are the live site, the inspiration video, and `/$lang/connect`.

## Work Guidance

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

None.
