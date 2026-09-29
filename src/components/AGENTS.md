# src/components

## Purpose

Shared UI for the portfolio shell and project cards.

## Ownership

Owns presentational components used by routes. Route metadata and copy stay in `src/routes/` and `src/i18n/`. Visual spec: root `DESIGN.md`. Tokens: `src/styles.css`.

## Local Contracts

- Dark-first terminal HUD. Use the CSS variables in `src/styles.css` (`--bg-base`, `--accent`, and the rest named in `DESIGN.md`). Do not hard-code a new hex when a token exists.
- One accent (phosphor mint). Serif for names, sans for reading text, mono for indices and labels.
- The about-me code window stays the dark phosphor panel in light mode. `AboutCode.tsx` renders it. `about-program.ts` owns the source, the scrollable line list, and the scripted Run trace. Run does not eval visitor input.
- `ResearchCode.tsx` is the static `research.ts` window on `/$lang/research`, using the same `.code-window` classes. Run only prints a result line and scrolls to the areas section.
- `ProjectVisual.tsx` draws the decorative right-hand art for the projects index cards (markup/SVG, `aria-hidden`). The agent and home-lab panels reuse `.code-window` and stay dark in light mode. P&ID detection boxes may use Tailwind palette hues; everything else uses tokens.
- `ConnectTerminal.tsx` is the static `~/connect` transcript on `/$lang/connect`, using the `.code-window` classes. Copy writes `EMAIL` from `src/data/connect.ts` to the clipboard.
- `BrandIcons.tsx` holds the monochrome (`currentColor`) brand marks used by `SocialLinks.tsx` and `/$lang/connect`. Add new marks there, not inline.
- Files prefixed `demo-` are playground UI, not shell components. See `src/routes/demo/AGENTS.md`.
- Brand logos (`TrueTechLogo.tsx`) keep their fixed brand colors and sit on a white tile so they stay legible in dark mode.

## Work Guidance

- Tailwind v4 utilities only. No CSS modules. No inline `style={}` except dynamic values.
- New shadcn components: `pnpm dlx shadcn@latest add <component>`.
- Motion is short. Honor `prefers-reduced-motion`.

## Verification

From the repo root: `pnpm check`.

## Child DOX Index

None.
