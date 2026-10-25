# Design brief

A portfolio for a backend and distributed-systems engineer. The audience is a recruiter who gives it 5 seconds and an engineer who gives it 5 minutes. The page has to answer "who is this, and what has he built" before the first scroll, then pull people into the project pages.

The subject's world is logs, state machines, timestamps and request paths. The design borrows that world's **precision**, not its clichés: no fake terminals and no green-on-black.

## Point of view

- **The type does the work.** An engineering grotesk with a width axis for headings, a bookish serif for reading, and a mono for metadata. Most dev portfolios put Inter on everything. This one reads like a well-set technical essay.
- **One bold element: the project index.** Large, narrow numerals (`01`–`05`) run down the selected-work list. On desktop, hovering a row slides its screenshot in from the right. Everything else stays quiet.
- **Structure carries information.** Every label, rule and number has to mean something. Section titles sit in a left column so the page reads like a table of contents. Numbering is used only for the project index, because that list is ordered by strength.

## Color

Cool neutrals plus one accent. No cream and no warm clay.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F3F4F6` | `#121418` | page |
| `--surface` | `#FFFFFF` | `#1A1D22` | hovered rows, command menu, code |
| `--ink` | `#14161A` | `#E8EAEE` | headings, body |
| `--muted` | `#5A616C` | `#9AA1AC` | secondary text, metadata (AA on bg) |
| `--rule` | `#D9DCE1` | `#2A2E35` | hairlines, borders |
| `--accent` | `#2340D9` | `#93A5FF` | links, index numerals on hover, focus ring, status dot |

The accent is a single cobalt "signal" blue. It appears only where something is interactive or live. It is never decoration, and there are no gradients.

## Type

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Archivo** (variable, `wdth` 62–125) | Name at `wdth 112`, weight 650. Project numerals at `wdth 62`, weight 300. Section titles at `wdth 100`, weight 600. |
| Text | **Source Serif 4** (variable, optical size) | Body 18px / 1.65 on desktop, 17px on mobile. Measure ≤ 66ch. |
| Metadata | **Fragment Mono** | Tags, dates, stack, clock. 12.5–13px, sentence case, never all caps. |

Scale (rem, about a 1.25 ratio): 0.78 · 0.875 · 1 · 1.125 · 1.4 · 1.75 · 2.2 · 3.4 · clamp(2.75, 7vw, 5.25) for the name.

Rules:
- Labels are never all caps. Letter-spacing changes only on the display face, which gets slight negative tracking at large sizes.
- Headlines never accent a single word.
- Links and buttons get no trailing "→" in the text. The only arrow is the project-row affordance, which moves.

## Layout

12-column grid with a 1120px max width. Gutters are 16px on mobile and 32px on desktop.

```
desktop
┌──────────────────────────────────────────────────────────────┐
│ Dev Kansal            Work  Achievements  Experience  …  ⌘K ◐│  sticky, 56px, hairline appears on scroll
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Dev Kansal                                                  │  hero: name (Archivo, wide)
│  I build backends that stay correct when                     │  one-line claim (serif, large)
│  everyone hits them at once.                                 │
│  ● Pre-final year @ IIT Roorkee · open to SDE internships    │  status line (mono) + live IST clock
│  GitHub  LinkedIn  X  Email  Résumé                          │
│                                                              │
├───────────────┬──────────────────────────────────────────────┤
│ Selected work │ 01  E-Summit Controls          2026   [img]→ │  index rows; image slides in on hover
│ (sticky)      │ 02  CampusFlow                 2026          │
│               │ 03  …                                        │
├───────────────┼──────────────────────────────────────────────┤
│ Achievements  │ compact list: what · where · when            │
│ Experience    │ role / org / dates, one-line impact          │
│ Stack         │ grouped lines, not logos                     │
│ Contact       │ one line + copy email + socials              │
└───────────────┴──────────────────────────────────────────────┘

mobile: one column. Section titles sit above their content as small Archivo headings.
Project rows stack number / title / problem / tags. The nav collapses to name + ⌘K button + theme.
```

Everything is left-aligned. Nothing is centered except the empty state in the command menu.

Spacing uses a 4px base. Sections are separated by 96px on desktop and 64px on mobile, with a hairline rule at the top of each section that spans the content columns only.

## Project detail page (`/projects/[slug]`)

The reading layout is a single 66ch column with a metadata sidebar on desktop: year, role, stack and links.
Order: **Problem → Approach → Architecture → What I learned → Links.** Architecture is shown as an ordered request path, because that content really is a sequence. The screenshot comes from the repo where one exists. "Next project" sits at the bottom so people keep reading.

## Motion

- Sections fade in and rise 8px **once**, the first time they enter the viewport. 280ms, `cubic-bezier(.2,.7,.2,1)`. Done with CSS and IntersectionObserver, with no animation library, to keep the JS bundle small.
- Project rows: on hover the arrow moves 4px, the numeral turns accent, the surface tints, and the image reveals with a 220ms clip-path wipe.
- Command menu: 140ms fade and scale from 0.98.
- `prefers-reduced-motion: reduce` turns off every transform. Content is always visible without JS.

## Delight

- **⌘K / Ctrl+K command menu**: jump to sections and projects, copy email, toggle theme, open résumé. It's fully keyboard driven and also reachable from the nav button on touch devices.
- **Live clock** in the status line, e.g. "Roorkee, 1:04 AM", so visitors know whether a reply will come tonight.

## Accessibility and quality floor

Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`). A skip link. A visible 2px accent focus ring offset from the element. AA contrast in both themes. The theme follows the system until toggled, is stored in localStorage, and is set before paint to avoid a flash.

## Avoid

Purple gradients, glassmorphism, particles, typing effects, emoji bullets, "Hi, I'm Dev 👋", skill bars, logo walls, identical shadowed cards, ALL-CAPS eyebrows.

## Revision: cheerful pass

The first build read as austere. Changes:

- **Sticker palette** next to the cobalt accent: sun `#FFD43B`, mint `#A6ECC9`, rose `#FFC0D3`, sky `#C7D8FF`. Text on these is always `--sticker-ink` (`#14161A`). They're used only for fact stickers, the achievement card, project hover washes and preview frames. Never for body text.
- **Hero portrait**: a real photo cut out locally with GrabCut (no generative edit, face untouched), sitting on a cobalt panel with a faint dot grid. The head breaks out above the panel. Three slightly rotated stickers carry real facts: the ICPC prize, local time, and E-Summit check-in volume. They straighten on hover.
- **Contact** becomes a full cobalt panel with a casual avatar.
- Background lifted to `#FAFAFC`. Section spacing tightened from 128px to 96px on desktop.
- Stack items are rounded chips. Still grouped, still no logos.
