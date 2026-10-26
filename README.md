# Dev Kansal: portfolio

Personal portfolio for Dev Kansal: a single page plus a write-up for each project.

Live: https://thedevkansal.vercel.app

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4. The design rules are in [DESIGN.md](DESIGN.md).

## Run

```bash
npm install
npm run dev
```

Before pushing, run `npm run lint`, `npx tsc --noEmit` and `npm run build`.

## Edit content

All content lives in typed data files. You never need to touch the components to change it.

| What | Where |
|---|---|
| Name, headline, status, email, résumé path | `src/content/site.ts` (`site`) |
| Social links | `src/content/site.ts` (`socials`) |
| Achievements, experience, stack | `src/content/site.ts` |
| Projects | `src/content/projects.ts` |
| Résumé PDF | `public/Dev_Kansal_Resume.pdf` |

### Add a project

1. Append an object to `projects` in `src/content/projects.ts`. The order there is the order on the page, and it sets the `01`, `02`, … index.
2. Put screenshots in `public/projects/<slug>/` and reference them in `shot` and `gallery` with their real pixel sizes.
3. Wrap identifiers in backticks (`` `SET NX` ``). The detail page renders them as inline code.

The project gets a card, a `/projects/<slug>` page, an OG image, a sitemap entry and a command-menu entry automatically.

## Deploy (Vercel)

Pushes to `main` deploy automatically. Canonical URLs, the sitemap and OG images use `NEXT_PUBLIC_SITE_URL`, which production sets to `https://thedevkansal.vercel.app`. When it's unset they fall back to `VERCEL_PROJECT_PRODUCTION_URL`.

The footer's "Last updated" date is stamped at build time.
