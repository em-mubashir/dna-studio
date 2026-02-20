# DNA Media Website

A premium bilingual (English/Arabic) website for DNA Media — a Saudi Arabia-based video production company. Built with Next.js 16, Payload CMS 3, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **CMS**: Payload CMS 3.77.0 (installed directly into Next.js)
- **Database**: MongoDB
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP 3.x
- **Forms**: React Hook Form + Zod
- **Email**: Resend API
- **Runtime**: Node.js 20.9+, React 19

## Getting Started

### Prerequisites

- Node.js >= 20.9.0 (see `.nvmrc`)
- MongoDB running locally or a cloud instance
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

For local development, the defaults work out of the box — just make sure MongoDB is running. All optional services (email, rate limiting, error tracking, analytics) are gracefully skipped when not configured.

| Variable | Required | Default |
|----------|----------|---------|
| `DATABASE_URI` | For production | `mongodb://localhost:27017/dna-media` |
| `PAYLOAD_SECRET` | For production | Dev fallback included |
| `NEXT_PUBLIC_SERVER_URL` | For production | `http://localhost:3000` |
| `RESEND_API_KEY` | No | Emails logged to console |
| `UPSTASH_REDIS_REST_URL` | No | Rate limiting skipped |
| `UPSTASH_REDIS_REST_TOKEN` | No | Rate limiting skipped |
| `SENTRY_DSN` | No | Error tracking disabled |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Analytics disabled |

### Development

```bash
# Start MongoDB (if local, macOS)
brew services start mongodb-community

# Start dev server
npm run dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- CMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, you'll be prompted to create the first admin user.

> The dev script uses `--webpack` flag because Payload's `withPayload` wrapper requires webpack (Turbopack not yet supported by Payload).

### npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (webpack mode) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate:types` | Generate Payload TypeScript types |
| `npm run payload` | Run Payload CLI commands |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Minimal root layout (no <html>/<body>)
│   ├── globals.css                 # Global styles
│   ├── robots.ts                   # Dynamic robots.txt
│   ├── sitemap.ts                  # Dynamic sitemap
│   ├── (frontend)/                 # Public website
│   │   ├── layout.tsx              # Frontend <html>/<body> with fonts
│   │   ├── page.tsx                # Homepage (/)
│   │   └── [lang]/                 # Bilingual routes (/en/*, /ar/*)
│   │       ├── about/page.tsx
│   │       ├── blog/page.tsx
│   │       ├── blog/[slug]/page.tsx
│   │       ├── portfolio/page.tsx
│   │       ├── portfolio/[slug]/page.tsx
│   │       └── contact/page.tsx
│   ├── (payload)/                  # Payload CMS (auto-generated)
│   │   ├── layout.tsx              # Payload RootLayout with its own <html>/<body>
│   │   ├── admin/                  # Admin panel UI
│   │   └── api/                    # Payload REST + GraphQL API
│   └── api/                        # Custom API routes
│       ├── contact/route.ts
│       ├── blog/search/route.ts
│       └── health/route.ts
├── components/                     # React components
├── payload/
│   ├── collections/                # CMS content types
│   ├── globals/                    # CMS global settings
│   ├── editor/                     # Lexical editor config
│   └── payload.config.ts           # Main Payload config
├── lib/                            # Utilities, GSAP, analytics
└── middleware.ts                   # Rate limiting for custom API routes
```

The `(frontend)` and `(payload)` are Next.js route groups — they organize code without affecting URLs. Each provides its own `<html>`/`<body>` so the CMS admin and public site have independent layouts.

## Architecture Notes

### Payload CMS v3 — lives inside Next.js

Unlike Payload v2 (separate Express server), Payload v3 installs directly into the Next.js app. The admin panel and API routes are just Next.js routes under the `(payload)` route group. Files marked "THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD" should not be modified.

### Rate Limiting

The middleware only applies to custom API routes (`/api/contact`, `/api/blog/search`, `/api/health`). It uses dynamic imports and gracefully skips rate limiting when Upstash Redis credentials aren't configured.

## Key Features

- Bilingual content (English + Arabic) with full RTL support
- 100% CMS-editable content via Payload admin panel
- GSAP scroll animations with reduced-motion support
- Video portfolio with Vimeo integration
- Contact form with server-side validation and email delivery
- Rate limiting, input sanitization, security headers
- SEO optimized with structured data, sitemap, and hreflang tags
- Responsive design (mobile-first)

## Troubleshooting

### "No utility classes detected" warning
Check `tailwind.config.ts` has content paths pointing to `src/`:
```ts
content: ['./src/**/*.{js,ts,jsx,tsx,mdx}']
```

### MongoDB connection errors
1. Verify MongoDB is running: `mongosh --eval "db.runCommand({ping:1})"`
2. Check `DATABASE_URI` in `.env.local`

### Admin panel 500 error
1. Delete `.next` folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Check that `src/app/(payload)/admin/importMap.js` exists

### Port already in use
```bash
PORT=3001 npm run dev
```

## Documentation

- [Requirements](.kiro/specs/dna-media-website/requirements.md)
- [Design Spec](.kiro/specs/dna-media-website/design.md)
- [Task List](.kiro/specs/dna-media-website/tasks.md)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## License

Private — DNA Media
