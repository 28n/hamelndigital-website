# hamelndigital — Website

Corporate website for **hamelndigital GmbH**, a digital engineering company
from Hameln, Germany. Built with Next.js (App Router), TypeScript, Tailwind
CSS and Bun.

## Stack

- Next.js 16 (App Router, Cache Components, standalone output)
- React 19 + TypeScript (strict)
- Tailwind CSS 4 (CSS-first theme in `src/app/globals.css`)
- Geist / Geist Mono via `next/font` (self-hosted, no external requests)
- `nodemailer` for the contact form
- No analytics, no cookies, no third-party assets

## Development

```bash
bun install
bun dev        # http://localhost:3000
```

Checks:

```bash
bun run lint   # ESLint
bun run build  # production build (typecheck + prerender)
```

## Configuration

Copy `.env.example` to `.env` and fill in the values. Summary:

| Variable            | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `SITE_URL`          | Public base URL — **build-time**, feeds metadata, sitemap, canonicals |
| `CONTACT_EMAIL`     | Public contact address shown on the site            |
| `SMTP_*`            | Contact form delivery (host, port, user, pass)      |
| `SMTP_FROM`         | Optional From header for contact mails              |
| `CONTACT_TO`        | Inbox for contact requests (defaults to `CONTACT_EMAIL`) |
| `FORM_TOKEN_SECRET` | Anti-spam token secret (random per process if unset)|

If `SMTP_HOST` is not configured, the contact form degrades gracefully: it
validates input and then tells visitors to write to `CONTACT_EMAIL` directly.
Nothing is silently discarded.

## Deployment (Docker + Traefik)

The app builds to a standalone Node server — it does **not** manage TLS.
`docker-compose.yml` ships with Traefik labels: a `websecure` router for
the apex domain, a `www.` → apex redirect, and certificate provisioning
through your existing cert resolver.

Prerequisite: the shared external network must exist (it usually does on
hosts already running Traefik):

```bash
docker network create traefik   # skip if it already exists
cp .env.example .env            # fill in values
docker compose up -d --build
```

Adjust `SITE_DOMAIN`, `TRAEFIK_NETWORK`, `TRAEFIK_ENTRYPOINT` and
`TRAEFIK_CERTRESOLVER` in `.env` to match your Traefik installation.

Without Traefik, any reverse proxy can forward to `127.0.0.1:3000` —
remove the labels and the `traefik` network attachment in that case.

## Before going live — required input

The following real business information is intentionally marked as
`[placeholders]` or must be verified:

- **Impressum** (`/impressum`): street address, managing director(s),
  commercial register + HRB number, VAT ID (if applicable), phone number,
  person responsible per § 18 Abs. 2 MStV.
- **Datenschutz** (`/datenschutz`): hosting provider and log retention,
  responsible supervisory authority, last-updated date. Have the page
  reviewed before launch — it is a tailored description of the actual
  implementation, not a legal certificate.
- `SITE_URL` and `CONTACT_EMAIL`: verify the real domain and mailbox.
- Contact form SMTP credentials.

## Structure

```
src/
  app/            routes: /, /leistungen, /unternehmen, /kontakt,
                  /impressum, /datenschutz (+ sitemap, robots, icons)
  components/     header, footer, container, buttons, contact form
  lib/            site config, mail delivery, anti-spam token
```
