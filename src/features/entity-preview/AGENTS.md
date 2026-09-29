# src/features/entity-preview

## Purpose

Inline entities with a dashed underline that open a context card (`<EntityPreview entity="openfarm">`). One component for Home, About, Experience, Projects, and Research.

## Ownership

Owns the entity registry, the hover-card state machine, placement math, and the card UI. Copy lives in `entities.<id>` in `src/i18n/locales/*.json`. Visual styles are the `.entity-*` classes in `src/styles.css`.

## Local Contracts

- Public surface: `index.ts` (`EntityPreview`, `EntityId`). Do not deep-import from other modules.
- Add an entity: add a record to `data/entities.ts` (type, logo, status tone, target, optional external URL) and an `entities.<id>` block (`EntityCopy` in `types/entity.ts`) to both catalogs.
- Targets map to typed router links in `components/EntityLink.tsx`: `product` → `/$lang/products/$productId`, `experience` → `/$lang/experience#<hash>` (the experience cards carry `id={record.id}`), `research` → `/$lang/research`.
- The information has three tiers: the dashed inline text, the card on hover (3–5 facts), and the detail page on click.
- Behavior (`hooks/useHoverCard.ts`): opens after 130ms of hover intent and closes 180ms after leave. The trigger-to-card bridge and the card itself cancel the close. Only one card is open at a time. Keyboard `:focus-visible` opens the card and Escape closes it. On touch, a tap toggles the card and a tap outside closes it. The card CTA navigates.
- Placement (`lib/placement.ts`, pure): the card goes above the text when it fits and below otherwise. It is clamped to the viewport and leans to the right of the anchor. A dashed connector with a dot runs from the underline to the card edge.
- Motion: the card enters with a fade, a rise, and extra tilt, then rests tilted (`--tilt`, −2.4° above and 2° below). It pivots on the connector end and straightens with a spring on hover or focus. With reduced motion there is no tilt and no loops.
- The card renders through a portal to `document.body`, only while open.

## Work Guidance

- Keep cards short. The card body is the description, then role and period, then optional facts and tags, then one CTA.

## Verification

From the repo root: `pnpm check` and `pnpm test` (`lib/placement.test.ts`).

## Child DOX Index

None.
