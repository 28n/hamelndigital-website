<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

Corporate website for hamelndigital GmbH (German, light mode only).

- Stack: Next.js 16 (App Router, Cache Components, standalone), React 19,
  TypeScript strict, Tailwind CSS 4 (CSS-first theme in `src/app/globals.css`),
  Bun as package manager.
- Commands: `bun dev` · `bun run lint` · `bun run build`.
- Site constants (name, email, nav) live in `src/lib/site.ts`.
- Design tokens: `--color-ink/-muted/-faint/-line/-surface/-accent` and
  `tracking-eyebrow` in `@theme`. Editorial style: hairline-separated rows,
  mono uppercase eyebrows, no rounded card grids.
- `cacheComponents` is on: no `Date.now()`/`Math.random()` in components —
  use `"use cache"` + `cacheLife()` (see footer year) or `connection()` +
  `<Suspense>` (see contact form token on `/kontakt`).
- Contact form: server action in `src/app/kontakt/actions.ts` with honeypot,
  HMAC time-trap token (`src/lib/contact-token.ts`), per-IP rate limit, and
  SMTP delivery via `src/lib/mail.ts`. Works without JS.
- Legal pages (`/impressum`, `/datenschutz`) contain visibly marked
  `[placeholders]` that must be filled before launch — see README
  "Before going live".
- Docker: `docker compose up -d --build` (uses `docker-compose` binary —
  the `docker compose` plugin is not installed on this machine). App listens
  on 127.0.0.1:3000 behind an existing reverse proxy; no TLS handling.

