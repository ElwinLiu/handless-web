# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npx tsc --noEmit     # Type-check only
```

### During development

After making changes, type-check only (safe while dev server is running):

```bash
npx tsc --noEmit
```

### Final verification (before committing)

Stop the dev server first, then run the full build:

```bash
rm -rf .next && npx tsc --noEmit && npx next build
```

- `rm -rf .next` — clears stale build cache (do NOT run while dev server is active)
- `tsc --noEmit` — catches type errors
- `next build` — catches type + build/compilation issues
- Neither catches runtime CSS or hydration bugs — visually inspect for those

## Domain

Production domain: `handless.elwin.cc` (docs: `docs.handless.elwin.cc`)

## Architecture

Marketing/landing site for **Handless**, a macOS speech-to-text app. Next.js 15 App Router, React 19, Tailwind CSS 4, Motion (framer-motion).

Single page app: `src/app/page.tsx` is the landing page with hero, features, preview, engines table, CTA, and footer.

### Key components

- **`SimulatedApp.tsx`** — Chromeless interactive preview of the actual Handless desktop app (at `~/code/handless`). Renders as a borderless floating glass surface (no fake window chrome). Simulates the sidebar, Models/Polish/History pages, and footer. Uses the Geist font (`geist` package, scoped via `.sim-app-typo` class at 15px base) to match the real app's typography. Uses its own color constants (`C` object) matching the actual app's palette (`#ef6f2f` accent, `#f5f0eb` text, `#9a9390` muted) which differ from the website's palette (`#d4622a`, `#f0ece8`, `#8a8480`). Icon SVG paths are extracted from `@phosphor-icons/react` (regular + bold weights).
- **`FnOverlay.tsx`** — Interactive demo of the Fn key recording workflow (idle → recording → thinking → done).

### Design system

Tailwind CSS 4 with `@theme` in `globals.css`. Two color systems coexist:
- **Website palette** — defined in `globals.css` `@theme` block, used via Tailwind utilities (`text-accent`, `bg-bg`, etc.)
- **SimulatedApp palette** — hardcoded `C` object in `SimulatedApp.tsx` matching the actual desktop app's colors

Fonts: DM Sans (body) + Instrument Serif (headings) loaded via `next/font/google`, plus Geist (SimulatedApp only) loaded via `geist` package — all in `layout.tsx`.

Handless project repo: ~/code/handless

### Documentation (Mintlify)

Docs live in `docs/` at the project root, deployed via Mintlify to `docs.handless.elwin.cc`. Mintlify reads from the `handless-web` repo's `docs/` folder (monorepo mode).

- Config: `docs/docs.json` (NOT `mint.json` — Mintlify migrated to `docs.json`)
- Content: MDX files in `docs/`
- `docs.json` navigation must be an **object** with `groups` array, not a top-level array
- `theme` field is required (e.g. `"maple"`)
- Logo SVGs are separate files in `docs/` (Mintlify deploys independently from Next.js)
- Local preview: `cd docs && fnm use 22 && npx mintlify dev` (requires Node LTS, not Node 25+)