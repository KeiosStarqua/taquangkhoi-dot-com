# Design system — Tạ Quang Khôi

Dark-first terminal HUD. The site reads as a circuit board and a code editor: deep navy canvas, phosphor mint, mono indices, and a serif name. Light mode is the same structure in daylight, not a different brand.

Canonical reference: the homepage composition (nav, hero, code window, focus rail, status strip, project cards, skill chips).

## Principles

1. **Canvas, not cards-on-cards.** The page background is the surface. Panels float on it. Do not wrap the homepage hero in a container.
2. **Index everything.** Navigation, focus items, and projects carry a two-digit mono index (`01`, `02`). Active state is mint, not a filled pill.
3. **One accent.** Phosphor mint does the work: links that matter, the active nav mark, the primary button, the name’s last word, and glow. Violet is only a secondary chip for hackathon status.
4. **Three voices.** Serif for names and pull quotes. Sans for reading text. Mono for labels, indices, filenames, and the `//` comment voice.
5. **Terminal stays dark.** The about-me code window is always the dark phosphor panel, including in light mode.
6. **Motion is short.** Hover lifts a card a few pixels and brightens its border. Respect `prefers-reduced-motion`.

## Color

Tokens live in `src/styles.css` as custom properties. Use the token, not a raw hex, in components.

### Dark (default)

| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#05080d` | Page canvas |
| `--surface` | `rgba(10, 22, 28, 0.78)` | Panels |
| `--surface-strong` | `rgba(8, 18, 24, 0.92)` | Header, code chrome |
| `--line` | `rgba(94, 234, 212, 0.22)` | Hairline borders |
| `--line-strong` | `rgba(94, 234, 212, 0.5)` | Hover and active borders |
| `--accent` | `#3ee8c4` | Primary actions, active index, name accent |
| `--accent-bright` | `#8dffe8` | Serif emphasis, syntax names |
| `--accent-ink` | `#04221c` | Text on mint fills |
| `--sea-ink` | `#e8f6f3` | Primary text (legacy name, still the ink token) |
| `--sea-ink-soft` | `#93aeb3` | Secondary text |
| `--ink-faint` | `#617980` | Decorative indices |
| `--code-green` | `#3dff9a` | Strings in the code window |
| `--glow` | `rgba(62, 232, 196, 0.35)` | Button and card glow |

Grid lines are mint at about 7% opacity, masked toward the edges. Two soft radial glows sit at the top-left and top-right.

### Light

Same roles, inverted: `#f3f7f6` canvas, `#102126` ink, `#0e8f80` accent, white text on mint buttons (`--accent-ink: #ffffff`). Borders are teal at low opacity. Do not introduce a second accent hue.

### Status chips

| Class | Meaning |
|---|---|
| `.chip` | Default mint chip (tags, active) |
| `.chip-green` | Open source |
| `.chip-violet` | Hackathon only |

## Type

Loaded from Google Fonts in `src/styles.css`.

| Role | Family | Size | Notes |
|---|---|---|---|
| Display name | Fraunces | `clamp(3.1rem, 6.2vw, 5.25rem)` | Weight 560, line-height 0.92, tight tracking. Last word in `--accent`. A blinking mint caret follows the name. |
| Pull quote | Fraunces italic | `1.05rem` | Vertical on wide screens, horizontal below `1280px` |
| Section title | Fraunces | `1.35–2.5rem` | `.display-title` |
| Body | Manrope | `0.95–1.05rem` | Line-height 1.6. Color `--sea-ink-soft` |
| Kicker | JetBrains Mono | `0.68rem` | Uppercase, tracking `0.14em`. Prefix with `//` (hero) or `/` (sections) |
| Index | JetBrains Mono | `0.68rem` | Bracketed in the nav: `[01]` |

Tailwind utilities: `font-sans` (Manrope), `font-mono` (JetBrains Mono). Display text uses `.display-title` or `.display-name`.

## Space and shape

- Content width: `.page-wrap` = `min(1200px, calc(100% - 2rem))`.
- Section gap on the homepage: `2.5rem` (`mt-10`).
- Panel radius: `16px` (`.island-shell`). Pills for buttons, chips, and the language switch.
- Panel padding: `1.25rem` on cards, `1.5–2rem` on page sections.
- Border width: `1px`. Glow replaces heavy drop shadows.

## Background

The canvas is a fixed grid (`body::before`) plus two glows (`body::after`). Content sits above both. Do not add a second full-page background on individual routes.

## Components

### Header

Sticky, translucent, bottom hairline.

- Brand: mono `_ TQK` plus a solid mint cursor block. Links home.
- Nav: `[01] Home`, `[02] About`, `[03] Experience`, `[04] Projects`, `[05] Research`. Active item: mint index and a mint underline on the label only.
- Theme control: icon button, cycles dark → light → auto.
- Language: pill. Active locale is a mint fill with `--accent-ink` text.
- Status, wide screens only: `// open to collaboration` in faint mono.

Writing, Music, and Resources are reserved. Do not render them until those routes exist.

### Buttons

| Class | Use |
|---|---|
| `.btn-primary` | One primary action per view. Mint fill, `--accent-ink` label, soft glow. Include a trailing arrow when it navigates onward. |
| `.btn-ghost` | Secondary action. Transparent fill, `--line-strong` border, ink label. |

Both are pills. Hover lifts `1px`. No third button style on the homepage.

### Panels

`.island-shell` is the only panel: translucent surface, mint hairline, inset top highlight.

`.feature-card` adds the hover lift and border glow. Use both classes together on clickable cards.

### Code window

`.code-window` is a dark editor chrome:

- Traffic-light dots, mono filename, Copy and `.run-btn` aligned right.
- The source is long. `.code-scroll` clips it and scrolls on both axes. Fades mark hidden lines.
- Click a line or use arrow keys (when the window is focused) to select it. Ctrl/Cmd+Enter runs.
- Line numbers stay in the gutter. Keywords are mint, strings are `--code-green`.
- Run plays a scripted trace of `about-me.ts`: the active line follows execution and the console prints `console.log` output, then the return value. It does not eval visitor input.
- Idle console: `>` plus the scroll-and-run hint. After a run the console border glows.

### Focus rail

Four stacked `.rail-card` items connected by a vertical mint line and a node dot. Each card: index, line icon, verb (faint), title (ink). On small screens the rail stacks under the code window and the quote returns to horizontal text.

### Status strip

`.status-strip` is a full-bleed bar with a top and bottom hairline. Four cells: icon, mono label, value. Focus, Location, Status, Open to.

### Project card

`.project-card`:

- Top row: `01 / SLUG` in mono, arrow at the right.
- Title in Fraunces, tagline clamped to three lines.
- Tags as `.chip`.

### Skill row

Open on the canvas, not inside a panel. Each group is a mono label plus wrapping chips. Groups: Languages, Frontend, Backend, Tools, Mobile.

### Kicker

`.island-kicker` plus `.kicker-mark` for the `/` or `//` prefix in mint.

### Social row

Ghost icon buttons, `36px`, mint on hover. GitHub, X, LinkedIn, Ko-fi. Same component in the hero and the footer.

### Entity preview

Inline entity names (OpenFarm, True Technology) get a dashed mint underline. They open a context card: a `/ TYPE · QUALIFIER` kicker plus a status dot, a logo tile, the name in serif, a subtitle, a one-line description, role and period, tags, and one CTA. The card sits above or below the text and joins the underline through a dashed connector. It rests slightly tilted and straightens when hovered. Spec and behavior: `src/features/entity-preview/AGENTS.md`.

### Case study (OpenSen)

`/$lang/products/opensen` is a long-form page: open hero (copy left, product window right), then numbered sections split by top hairlines. Each section: `/ 01. KICKER`, serif title, lede on the left; the visual on the right in `.island-shell` panels.

- `.opensen-app`: the product window. It keeps the OpenSen app's light studio palette in both themes, as the code window stays dark.
- `.chunk-tone[data-tone]`: chunk roles. `request` (blue), `action` (accent), `slot` (amber), `error`. These hues carry linguistic meaning; they are not a second brand accent.
- `.margin-note`: tilted Fraunces italic for handwritten-style annotations.

Spec: `src/features/opensen-case-study/AGENTS.md`.

### Footer

Top hairline, mono copyright, the social row. No large link columns.

## Layout

### Homepage

1. Hero grid, wide: copy (about 1.1fr) / code window (about 0.95fr) / rail plus vertical quote (`220px`). Below `1280px`, stack in that order.
2. Status strip.
3. Featured projects. Header row: `/ Featured Projects` and a mono “view all projects →” link. Grid: 3 columns from `1024px`, 2 from `640px`.
4. `/ Skills` chip row.

### Inner pages

Open page header (kicker, display title, lede), then `.island-shell` sections. Do not put the page title inside a panel.

## Motion

| Name | Duration | Use |
|---|---|---|
| Color / border | `180ms` ease | Links, buttons, chips |
| Card hover | `180ms` ease | `translateY(-3px)` |
| `.rise-in` | `700ms` | First paint of hero and cards |
| Caret | `1.1s` step | Name caret and brand cursor |

`prefers-reduced-motion: reduce` disables the rise, the caret blink, and the hover lift.

## Voice in the UI

- Kickers are uppercase and short.
- The hero kicker uses the code-comment form: `// SOFTWARE DEVELOPER · AI EXPLORER · MUSICIAN · VIETNAM`.
- Buttons are sentence case: “Explore My Work”, “About Me”.
- The collaboration flag is lowercase after the comment slashes: `// open to collaboration`.

## Implementation map

| Concern | File |
|---|---|
| Tokens, type, panels, buttons, chips, background | `src/styles.css` |
| Header, language pill, brand | `src/components/Header.tsx` |
| Theme cycle | `src/components/ThemeToggle.tsx` |
| Footer and social icons | `src/components/Footer.tsx`, `src/components/SocialLinks.tsx` |
| Homepage composition | `src/routes/$lang/index.tsx` |
| Project card | `src/components/ProjectCard.tsx` |
| Copy | `src/i18n/locales/en.json`, `src/i18n/locales/vi.json` |

Dark is the default when `localStorage.theme` is unset. The init script in `src/routes/__root.tsx` applies it before paint.
