# DNA Media Website - Setup Guide

## Prerequisites

- Node.js 20.9.0 or higher
- MongoDB (local or cloud instance)
- Package manager: npm, yarn, or pnpm (pnpm recommended)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

> **Note**: Since you're adding Payload to an existing Next.js project, you need to manually configure it. The `npx create-payload-app` command is only for creating new projects from scratch.

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the following variables in `.env.local`:

#### Required Variables

- **DATABASE_URI**: Your MongoDB connection string
  - Local: `mongodb://localhost:27017/dna-media`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dna-media`

- **PAYLOAD_SECRET**: A secure random string (minimum 32 characters)
  - Generate one: `openssl rand -base64 32`

- **NEXT_PUBLIC_SERVER_URL**: Your application URL
  - Development: `http://localhost:3000`
  - Production: Your actual domain (e.g., `https://dnamedia.com`)

#### Optional Services (can be configured later)

- **RESEND_API_KEY**: For contact form emails
  - Sign up at [resend.com](https://resend.com)

- **UPSTASH_REDIS_REST_URL** & **UPSTASH_REDIS_REST_TOKEN**: For rate limiting
  - Sign up at [upstash.com](https://upstash.com)

- **SENTRY_DSN** & **SENTRY_AUTH_TOKEN**: For error tracking
  - Sign up at [sentry.io](https://sentry.io)

- **NEXT_PUBLIC_GA_MEASUREMENT_ID**: For Google Analytics
  - Set up GA4 property at [analytics.google.com](https://analytics.google.com)

### 3. Start MongoDB

If using local MongoDB:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

The Payload CMS admin panel will be at [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Generate TypeScript Types

After configuring Payload collections, generate types:

```bash
npm run generate:types
# or
pnpm generate:types
# or
yarn generate:types
```

## Manual Payload Setup (Required)

Since you're integrating Payload into an existing Next.js project, you need to manually create the configuration files. The next tasks in your implementation plan will guide you through:

1. **Creating `payload.config.ts`** - Main Payload configuration file
2. **Setting up collections** - Define your content types (Blog, Portfolio, etc.)
3. **Creating the admin route** - Add `src/app/admin/[[...payload]]/page.tsx`
4. **Configuring the API route** - Add API handlers for Payload

These are covered in the following tasks:
- Day 2-3: Configure Payload CMS
- Day 3-4: Create Payload Collections

**Why manual setup?**
- `npx create-payload-app` is for creating new projects from scratch
- Your project already has Next.js configured with custom structure
- Manual setup gives you full control over the integration

## Payload CMS 3.x Features

This project uses Payload CMS 3.x with the following features:

- **Native Next.js Integration**: Payload installs directly into your Next.js app
- **Lexical Rich Text Editor**: Modern, extensible rich text editing
- **MongoDB Database**: Flexible NoSQL database for content
- **TypeScript Support**: Full type safety throughout
- **Server Components**: Optimized for Next.js 14 App Router

## Key Dependencies

- **payload**: ^3.77.0 - Core CMS
- **@payloadcms/db-mongodb**: ^3.77.0 - MongoDB adapter
- **@payloadcms/richtext-lexical**: ^3.77.0 - Rich text editor
- **@payloadcms/ui**: ^3.77.0 - Admin UI components
- **next**: ^14.2.0 - React framework
- **sharp**: ^0.33.5 - Image processing
- **resend**: ^4.0.1 - Email service

## Troubleshooting

### MongoDB Connection Issues

If you get connection errors:
1. Ensure MongoDB is running
2. Check your DATABASE_URI is correct
3. Verify network access (for cloud databases)

### PAYLOAD_SECRET Missing

If you see "PAYLOAD_SECRET is missing":
1. Ensure `.env.local` exists
2. Verify PAYLOAD_SECRET is set
3. Restart the development server

### Port Already in Use

If port 3000 is busy:
```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

1. Configure Payload collections (see `.kiro/specs/dna-media-website/tasks.md`)
2. Set up the admin user
3. Start adding content through the CMS
4. Build out the frontend pages

## Documentation

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Project Requirements](.kiro/specs/dna-media-website/requirements.md)
- [Project Design](.kiro/specs/dna-media-website/design.md)
- [Task List](.kiro/specs/dna-media-website/tasks.md)
