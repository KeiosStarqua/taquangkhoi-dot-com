# src/components

## Purpose

Shared UI for the portfolio shell and project cards.

## Ownership

Owns presentational components used by routes. Route metadata and copy stay in `src/routes/` and `src/i18n/`. Visual spec: root `DESIGN.md`. Tokens: `src/styles.css`.

## Local Contracts

- Dark-first terminal HUD. Use the CSS variables in `src/styles.css` (`--bg-base`, `--accent`, and the rest named in `DESIGN.md`). Do not hard-code a new hex when a token exists.
- One accent (phosphor mint). Serif for names, sans for reading text, mono for indices and labels.
- The about-me code window stays the dark phosphor panel in light mode.
- Files prefixed `demo-` are playground UI, not shell components. See `src/routes/demo/AGENTS.md`.

## Work Guidance

- Tailwind v4 utilities only. No CSS modules. No inline `style={}` except dynamic values.
- New shadcn components: `pnpm dlx shadcn@latest add <component>`.
- Motion is short. Honor `prefers-reduced-motion`.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

None.
