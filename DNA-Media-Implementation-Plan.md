# DNA Media Website - Technical Implementation Plan

## Project Overview

**Client**: DNA Media (Saudi Arabia)  
**Project Type**: 5-page bilingual website with blog and portfolio  
**Languages**: English + Arabic (RTL support)  
**Timeline**: 6 weeks  

## ✅ Complete Feature Coverage

This implementation plan covers ALL requirements from the proposal:

### Pages (5 × 2 Languages = 10 Pages):
- ✅ Home (hero video, services, featured work, client logos, CTA)
- ✅ About (company story, mission/vision, team grid, timeline, awards)
- ✅ Portfolio/Work (filterable grid, video lightbox, case studies)
- ✅ Blog (listing with pagination, categories, individual posts, SEO)
- ✅ Contact (form with validation, Google Maps, contact info)

### CMS Capabilities - Edit Everything:
- ✅ All text content (headings, paragraphs, buttons) in EN/AR
- ✅ All images (hero, sections, team photos, portfolio thumbnails, logos)
- ✅ All videos (hero backgrounds, portfolio videos via Vimeo)
- ✅ Page sections (add/remove/reorder content blocks)
- ✅ Blog posts (create/edit/delete with rich text editor)
- ✅ Portfolio projects (add/edit/delete with videos)
- ✅ Team members (add/edit/delete with photos)
- ✅ Services (add/edit/delete with icons)
- ✅ Client logos (add/edit/delete)
- ✅ Contact information (email, phone, address)
- ✅ Social media links (all platforms)
- ✅ Footer content
- ✅ Logo and favicon
- ✅ SEO meta tags per page

### Animations (GSAP):
- ✅ Hero video with text reveal animations
- ✅ Scroll-triggered animations (ScrollTrigger)
- ✅ Hover effects on portfolio items
- ✅ Stagger animations for service cards
- ✅ Parallax effects
- ✅ Page transitions
- ✅ Counter animations for awards
- ✅ Timeline scroll progress
- ✅ Client logo carousel auto-scroll

### Technical Requirements:
- ✅ Next.js 14 with App Router
- ✅ Payload CMS (100% free, self-hosted)
- ✅ GSAP + Framer Motion for animations
- ✅ RTL support for Arabic
- ✅ Responsive design (mobile-first)
- ✅ Performance optimization (90+ Lighthouse)
- ✅ SEO (meta tags, sitemap, hreflang, structured data)
- ✅ Railway hosting (app + MongoDB in one dashboard)
- ✅ Vimeo Pro integration
- ✅ Google Maps integration
- ✅ Contact form with validation
- ✅ SSL certificate
- ✅ Cross-browser compatibility

### Content Management:
- ✅ User roles (Admin, Editor)
- ✅ Preview before publish
- ✅ Revision history
- ✅ Media library
- ✅ Rich text editor
- ✅ Bilingual content fields
- ✅ Drag-and-drop section reordering

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **CMS**: Payload CMS 2.x (self-hosted, TypeScript-native)
- **Database**: MongoDB (included with Railway)
- **Styling**: Tailwind CSS + CSS Modules
- **Animations**: GSAP 3.x (ScrollTrigger, ScrollSmoother)
- **Video Hosting**: Vimeo Pro ($20/month)
- **Hosting**: Railway ($15-20/month)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API (contact form submissions)
- **Security**: Upstash Redis (rate limiting), DOMPurify (input sanitization)
- **Monitoring**: Sentry (error tracking), Google Analytics 4
- **Accessibility**: focus-trap-react
- **Performance**: @vercel/analytics, @vercel/speed-insights

## Project Structure

```
dna-media-website/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (web)/             # Public website routes
│   │   │   ├── [lang]/        # Dynamic language routes (en, ar)
│   │   │   │   ├── page.tsx   # Homepage
│   │   │   │   ├── about/
│   │   │   │   ├── portfolio/
│   │   │   │   ├── blog/
│   │   │   │   └── contact/
│   │   │   └── layout.tsx
│   │   ├── admin/             # Payload admin panel
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── animations/        # GSAP animation components
│   │   ├── layout/            # Header, Footer, Navigation
│   │   └── ui/                # Reusable UI components
│   ├── payload/
│   │   ├── collections/       # Payload schemas
│   │   ├── blocks/            # Reusable content blocks
│   │   └── payload.config.ts
│   └── lib/
│       ├── gsap/              # GSAP utilities
│       └── utils/             # Helper functions
├── public/
│   ├── videos/
│   └── images/
└── package.json
```


---

## Week 1: Project Setup & CMS Configuration

### Day 1-2: Initialize Project

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest dna-media-website --typescript --tailwind --app --no-src-dir

cd dna-media-website

# Install Payload CMS and dependencies
npm install payload @payloadcms/db-mongodb @payloadcms/richtext-lexical
npm install @payloadcms/bundler-webpack

# Install additional dependencies
npm install gsap react-hook-form zod @hookform/resolvers
npm install sharp # Image optimization
npm install dotenv cross-env

# Security dependencies
npm install @upstash/ratelimit @upstash/redis
npm install isomorphic-dompurify

# Monitoring
npm install @sentry/nextjs

# Accessibility
npm install focus-trap-react

# Performance
npm install @vercel/analytics @vercel/speed-insights

# Install dev dependencies
npm install -D @types/node typescript

# Optional: Testing
npm install -D @playwright/test @axe-core/playwright
```

### Day 2-3: Configure Payload CMS

Create `src/payload/payload.config.ts`:

```typescript
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    bundler: webpackBundler(),
    user: 'users',
  },
  editor: lexicalEditor({}),
  collections: [
    // We'll add collections here
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  // Rate limiting for admin panel
  rateLimit: {
    max: 500,
    window: 15 * 60 * 1000, // 15 minutes
  },
});
```


### Day 3-4: Create Payload Collections

#### Pages Collection (`src/payload/collections/Pages.ts`)

This collection allows complete control over ALL page content - text, images, videos, and layout sections.

```typescript
import { CollectionConfig } from 'payload/types';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'title_ar', 'slug', 'updatedAt'],
    description: 'Manage all page content including text, images, and videos',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Page Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Page Title (Arabic)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g., "home", "about", "contact")',
      },
    },
    
    // Hero Section - Fully Editable
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'heading_en',
          type: 'text',
          label: 'Hero Heading (English)',
        },
        {
          name: 'heading_ar',
          type: 'text',
          label: 'Hero Heading (Arabic)',
        },
        {
          name: 'subheading_en',
          type: 'textarea',
          label: 'Hero Subheading (English)',
        },
        {
          name: 'subheading_ar',
          type: 'textarea',
          label: 'Hero Subheading (Arabic)',
        },
        {
          name: 'background_video',
          type: 'text',
          label: 'Background Video (Vimeo ID)',
          admin: {
            description: 'Enter Vimeo video ID for hero background',
          },
        },
        {
          name: 'background_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (fallback)',
          admin: {
            description: 'Used if video not available',
          },
        },
        {
          name: 'cta_text_en',
          type: 'text',
          label: 'CTA Button Text (English)',
        },
        {
          name: 'cta_text_ar',
          type: 'text',
          label: 'CTA Button Text (Arabic)',
        },
        {
          name: 'cta_link',
          type: 'text',
          label: 'CTA Button Link',
        },
      ],
    },

    // Content Sections - Repeatable
    {
      name: 'sections',
      type: 'array',
      label: 'Page Sections',
      admin: {
        description: 'Add multiple content sections with text and images',
      },
      fields: [
        {
          name: 'section_type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text + Image', value: 'text_image' },
            { label: 'Full Width Text', value: 'full_text' },
            { label: 'Image Gallery', value: 'gallery' },
            { label: 'Video Section', value: 'video' },
            { label: 'Services Grid', value: 'services' },
            { label: 'Team Grid', value: 'team' },
            { label: 'Client Logos', value: 'clients' },
          ],
        },
        {
          name: 'heading_en',
          type: 'text',
          label: 'Section Heading (English)',
        },
        {
          name: 'heading_ar',
          type: 'text',
          label: 'Section Heading (Arabic)',
        },
        {
          name: 'content_en',
          type: 'richText',
          label: 'Content (English)',
        },
        {
          name: 'content_ar',
          type: 'richText',
          label: 'Content (Arabic)',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Section Image',
        },
        {
          name: 'images',
          type: 'array',
          label: 'Multiple Images (for gallery)',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'video_url',
          type: 'text',
          label: 'Video URL (Vimeo)',
        },
      ],
    },

    // SEO Fields
    {
      name: 'seo_title_en',
      type: 'text',
      label: 'SEO Title (English)',
    },
    {
      name: 'seo_title_ar',
      type: 'text',
      label: 'SEO Title (Arabic)',
    },
    {
      name: 'seo_description_en',
      type: 'textarea',
      label: 'SEO Description (English)',
    },
    {
      name: 'seo_description_ar',
      type: 'textarea',
      label: 'SEO Description (Arabic)',
    },
  ],
};
```


#### Blog Collection (`src/payload/collections/Blog.ts`)

```typescript
import { CollectionConfig } from 'payload/types';

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'category', 'publishedDate', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        status: { equals: 'published' },
      };
    },
  },
  fields: [
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Title (Arabic)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Auto-generated from English title',
      },
    },
    {
      name: 'excerpt_en',
      type: 'textarea',
      label: 'Excerpt (English)',
      maxLength: 200,
    },
    {
      name: 'excerpt_ar',
      type: 'textarea',
      label: 'Excerpt (Arabic)',
      maxLength: 200,
    },
    {
      name: 'content_en',
      type: 'richText',
      required: true,
      label: 'Content (English)',
    },
    {
      name: 'content_ar',
      type: 'richText',
      required: true,
      label: 'Content (Arabic)',
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Commercial', value: 'commercial' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Documentary', value: 'documentary' },
        { label: 'Animation', value: 'animation' },
        { label: 'News', value: 'news' },
      ],
    },
    {
      name: 'tags_en',
      type: 'array',
      label: 'Tags (English)',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'tags_ar',
      type: 'array',
      label: 'Tags (Arabic)',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
};
```


#### Portfolio Collection (`src/payload/collections/Portfolio.ts`)

```typescript
import { CollectionConfig } from 'payload/types';

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title_en',
    defaultColumns: ['title_en', 'client', 'category', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Project Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Project Title (Arabic)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'description_en',
      type: 'textarea',
      label: 'Description (English)',
    },
    {
      name: 'description_ar',
      type: 'textarea',
      label: 'Description (Arabic)',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Commercial', value: 'commercial' },
        { label: 'Corporate Video', value: 'corporate' },
        { label: 'Documentary', value: 'documentary' },
        { label: 'Animation', value: 'animation' },
        { label: 'Event Coverage', value: 'event' },
      ],
    },
    {
      name: 'video_url',
      type: 'text',
      required: true,
      label: 'Vimeo Video URL',
      admin: {
        description: 'Full Vimeo URL or video ID',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Video Thumbnail',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'completedDate',
      type: 'date',
      label: 'Project Completion Date',
    },
  ],
};
```


#### Services Collection (`src/payload/collections/Services.ts`)

```typescript
import { CollectionConfig } from 'payload/types';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title_en',
    description: 'Manage service offerings displayed on homepage and about page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Service Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Service Title (Arabic)',
    },
    {
      name: 'description_en',
      type: 'textarea',
      label: 'Description (English)',
    },
    {
      name: 'description_ar',
      type: 'textarea',
      label: 'Description (Arabic)',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Service Icon/Image',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
};
```

#### Team Members Collection (`src/payload/collections/Team.ts`)

```typescript
import { CollectionConfig } from 'payload/types';

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    description: 'Manage team members displayed on About page',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'position_en',
      type: 'text',
      required: true,
      label: 'Position/Title (English)',
    },
    {
      name: 'position_ar',
      type: 'text',
      required: true,
      label: 'Position/Title (Arabic)',
    },
    {
      name: 'bio_en',
      type: 'textarea',
      label: 'Biography (English)',
    },
    {
      name: 'bio_ar',
      type: 'textarea',
      label: 'Biography (Arabic)',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Photo',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
};
```

#### Site Settings (Global) (`src/payload/globals/Settings.ts`)

```typescript
import { GlobalConfig } from 'payload/types';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site settings - contact info, social links, footer text',
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'address_en',
          type: 'textarea',
          label: 'Address (English)',
        },
        {
          name: 'address_ar',
          type: 'textarea',
          label: 'Address (Arabic)',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'twitter', type: 'text', label: 'Twitter URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
      ],
    },
    {
      name: 'footer_text_en',
      type: 'textarea',
      label: 'Footer Text (English)',
    },
    {
      name: 'footer_text_ar',
      type: 'textarea',
      label: 'Footer Text (Arabic)',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
  ],
};
```

#### Media & Users Collections

```typescript
// src/payload/collections/Media.ts
import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Upload and manage all images and videos',
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text (for accessibility)',
    },
  ],
};

// src/payload/collections/Users.ts
import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
};
```

### Day 4-5: Environment Setup

Create `.env.local`:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/dna-media

# Payload
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# Vimeo (optional, for API access)
VIMEO_ACCESS_TOKEN=your-vimeo-token
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "cross-env PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts next dev",
    "build": "cross-env PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts next build",
    "start": "cross-env PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts next start",
    "generate:types": "cross-env PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts payload generate:types"
  }
}
```



---

## Week 2: Frontend Foundation & Bilingual Setup

### Day 6-7: Next.js App Router Setup

Create language routing structure:

```typescript
// src/app/[lang]/layout.tsx
import { Inter, Cairo } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${cairo.variable}`}>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
```

Create language utilities:

```typescript
// src/lib/utils/language.ts
export type Language = 'en' | 'ar';

export const languages: Language[] = ['en', 'ar'];

export const defaultLanguage: Language = 'en';

export function getLanguageLabel(lang: Language): string {
  return lang === 'en' ? 'English' : 'العربية';
}

export function getOppositeLanguage(lang: Language): Language {
  return lang === 'en' ? 'ar' : 'en';
}

// Helper to get bilingual content
export function getBilingualField<T>(
  data: any,
  fieldName: string,
  lang: Language
): T {
  return data[`${fieldName}_${lang}`] as T;
}
```



### Day 7-8: Homepage Implementation

```typescript
// src/app/[lang]/page.tsx
import { getPayloadClient } from '@/lib/payload';
import { getBilingualField } from '@/lib/utils/language';
import HeroSection from '@/components/sections/HeroSection';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import { Language } from '@/lib/utils/language';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const payload = await getPayloadClient();

  // Fetch homepage data
  const homepage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  });

  // Fetch featured portfolio items
  const portfolio = await payload.find({
    collection: 'portfolio',
    where: { featured: { equals: true } },
    limit: 6,
    sort: 'order',
  });

  const pageData = homepage.docs[0];

  return (
    <>
      <HeroSection
        title={getBilingualField(pageData, 'title', lang)}
        videoUrl={pageData.hero_video}
        lang={lang}
      />
      <PortfolioGrid items={portfolio.docs} lang={lang} />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const payload = await getPayloadClient();
  const homepage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  });

  const pageData = homepage.docs[0];

  return {
    title: getBilingualField(pageData, 'seo_title', lang),
    description: getBilingualField(pageData, 'seo_description', lang),
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}
```



### Day 8-9: Blog Pages

```typescript
// src/app/[lang]/blog/page.tsx
import { getPayloadClient } from '@/lib/payload';
import { getBilingualField } from '@/lib/utils/language';
import BlogCard from '@/components/blog/BlogCard';
import { Language } from '@/lib/utils/language';

export default async function BlogPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Language };
  searchParams: { category?: string; page?: string };
}) {
  const payload = await getPayloadClient();
  const page = parseInt(searchParams.page || '1');
  const limit = 12;

  const query: any = {
    status: { equals: 'published' },
  };

  if (searchParams.category) {
    query.category = { equals: searchParams.category };
  }

  const posts = await payload.find({
    collection: 'blog',
    where: query,
    limit,
    page,
    sort: '-publishedDate',
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">
        {lang === 'en' ? 'Blog' : 'المدونة'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.docs.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>

      {/* Pagination component */}
    </div>
  );
}

// src/app/[lang]/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params: { lang, slug },
}: {
  params: { lang: Language; slug: string };
}) {
  const payload = await getPayloadClient();

  const post = await payload.find({
    collection: 'blog',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!post.docs[0]) {
    notFound();
  }

  const postData = post.docs[0];

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-5xl font-bold mb-4">
        {getBilingualField(postData, 'title', lang)}
      </h1>

      <div className="prose prose-lg max-w-none">
        {/* Render rich text content */}
        {getBilingualField(postData, 'content', lang)}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const posts = await payload.find({
    collection: 'blog',
    where: { status: { equals: 'published' } },
    limit: 1000,
  });

  const params = [];
  for (const post of posts.docs) {
    params.push({ lang: 'en', slug: post.slug });
    params.push({ lang: 'ar', slug: post.slug });
  }

  return params;
}
```



### Day 9-10: Tailwind Configuration for RTL

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // RTL plugin
    function ({ addUtilities }: any) {
      addUtilities({
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      });
    },
  ],
};

export default config;
```

Create RTL-aware CSS utilities:

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html[dir='rtl'] {
    font-family: var(--font-cairo), sans-serif;
  }

  html[dir='ltr'] {
    font-family: var(--font-inter), sans-serif;
  }
}

@layer utilities {
  /* RTL-aware spacing */
  .ms-4 {
    margin-inline-start: 1rem;
  }

  .me-4 {
    margin-inline-end: 1rem;
  }

  .ps-4 {
    padding-inline-start: 1rem;
  }

  .pe-4 {
    padding-inline-end: 1rem;
  }
}
```

---

## Week 3: GSAP Animation Implementation

### Day 11-12: GSAP Setup & Core Animations

```bash
npm install gsap @gsap/react
```

Create GSAP context provider:

```typescript
// src/lib/gsap/GSAPProvider.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize ScrollSmoother
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
```



### Day 12-13: Hero Section with Video & Animations

```typescript
// src/components/sections/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Language } from '@/lib/utils/language';

interface HeroSectionProps {
  title: string;
  videoUrl: string;
  lang: Language;
}

export default function HeroSection({
  title,
  videoUrl,
  lang,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Video reveal animation
      gsap.from(videoRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      });

      // Parallax effect on scroll
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div ref={videoRef} className="absolute inset-0">
        <iframe
          src={`https://player.vimeo.com/video/${videoUrl}?background=1&autoplay=1&loop=1&muted=1`}
          className="w-full h-full object-cover"
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white text-center px-4"
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
```



### Day 13-14: Portfolio Grid with Scroll Animations

```typescript
// src/components/sections/PortfolioGrid.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '@/lib/utils/language';
import { getBilingualField } from '@/lib/utils/language';

interface PortfolioGridProps {
  items: any[];
  lang: Language;
}

export default function PortfolioGrid({ items, lang }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.portfolio-card');

      cards?.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card.querySelector('.portfolio-overlay'), {
            opacity: 1,
            duration: 0.3,
          });
          gsap.to(card.querySelector('img'), {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('.portfolio-overlay'), {
            opacity: 0,
            duration: 0.3,
          });
          gsap.to(card.querySelector('img'), {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="text-5xl font-bold mb-16 text-center">
        {lang === 'en' ? 'Our Work' : 'أعمالنا'}
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="portfolio-card relative overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              src={item.thumbnail.url}
              alt={item.thumbnail.alt}
              className="w-full h-80 object-cover"
            />

            <div className="portfolio-overlay absolute inset-0 bg-black/70 opacity-0 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {getBilingualField(item, 'title', lang)}
                </h3>
                <p className="text-sm opacity-90">{item.client}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```



### Day 14-15: Page Transitions

```typescript
// src/components/animations/PageTransition.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page enter animation
      gsap.from(transitionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, transitionRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={transitionRef} className="page-transition">
      {children}
    </div>
  );
}
```

---

## Week 4: Components & Features

### Day 16-17: Header & Navigation

```typescript
// src/components/layout/Header.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Language, getOppositeLanguage } from '@/lib/utils/language';

interface HeaderProps {
  lang: Language;
}

export default function Header({ lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  const navItems = [
    { label: lang === 'en' ? 'Home' : 'الرئيسية', href: `/${lang}` },
    { label: lang === 'en' ? 'About' : 'من نحن', href: `/${lang}/about` },
    { label: lang === 'en' ? 'Portfolio' : 'الأعمال', href: `/${lang}/portfolio` },
    { label: lang === 'en' ? 'Blog' : 'المدونة', href: `/${lang}/blog` },
    { label: lang === 'en' ? 'Contact' : 'اتصل بنا', href: `/${lang}/contact` },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="text-2xl font-bold">
          DNA Media
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <Link
          href={`/${getOppositeLanguage(lang)}`}
          className="px-4 py-2 border border-current rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          {/* Hamburger icon */}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
```



### Day 18-19: Contact Form with Validation

```typescript
// src/app/[lang]/contact/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Language } from '@/lib/utils/language';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      if (response.ok) {
        alert(lang === 'en' ? 'Message sent!' : 'تم إرسال الرسالة!');
        reset();
      }
    } catch (error) {
      alert(lang === 'en' ? 'Error sending message' : 'خطأ في الإرسال');
    }
  };

  const labels = {
    name: lang === 'en' ? 'Name' : 'الاسم',
    email: lang === 'en' ? 'Email' : 'البريد الإلكتروني',
    phone: lang === 'en' ? 'Phone' : 'الهاتف',
    message: lang === 'en' ? 'Message' : 'الرسالة',
    submit: lang === 'en' ? 'Send Message' : 'إرسال',
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold mb-8">
        {lang === 'en' ? 'Contact Us' : 'اتصل بنا'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">{labels.name}</label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">{labels.email}</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">{labels.phone}</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">{labels.message}</label>
            <textarea
              {...register('message')}
              rows={6}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '...' : labels.submit}
          </button>
        </form>

        {/* Contact Info & Map */}
        <div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {lang === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </h3>
            <p className="mb-4">
              {lang === 'en'
                ? 'Riyadh, Saudi Arabia'
                : 'الرياض، المملكة العربية السعودية'}
            </p>
            <p>info@dnamedia.sa</p>
            <p>+966 XX XXX XXXX</p>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-96 bg-gray-200 rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.7!3d24.7!..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```



### Day 19-20: Contact Form API Route

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, lang } = body;

    // Send email using Resend
    await resend.emails.send({
      from: 'DNA Media <noreply@dnamedia.sa>',
      to: 'info@dnamedia.sa',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Language:</strong> ${lang}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

---

## Week 5: Performance Optimization & SEO

### Day 21-22: Image Optimization

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['player.vimeo.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static export for better performance
  output: 'standalone',
};

module.exports = nextConfig;
```

Optimize images in components:

```typescript
import Image from 'next/image';

// Use Next.js Image component for automatic optimization
<Image
  src={item.thumbnail.url}
  alt={item.thumbnail.alt}
  width={800}
  height={600}
  className="w-full h-80 object-cover"
  loading="lazy"
  placeholder="blur"
  blurDataURL={item.thumbnail.blurDataURL}
/>
```



### Day 22-23: SEO Configuration

```typescript
// src/app/[lang]/layout.tsx - Add metadata
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://dnamedia.sa'),
  title: {
    default: 'DNA Media - Premium Video Production',
    template: '%s | DNA Media',
  },
  description: 'Enterprise-level video production and commercial services in Saudi Arabia',
  keywords: ['video production', 'commercials', 'corporate videos', 'Saudi Arabia'],
  authors: [{ name: 'DNA Media' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://dnamedia.sa',
    siteName: 'DNA Media',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dnamedia',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Add JSON-LD structured data
export default function RootLayout({ children, params }: any) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DNA Media',
    url: 'https://dnamedia.sa',
    logo: 'https://dnamedia.sa/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966-XX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'SA',
      availableLanguage: ['en', 'ar'],
    },
    sameAs: [
      'https://twitter.com/dnamedia',
      'https://instagram.com/dnamedia',
      'https://linkedin.com/company/dnamedia',
    ],
  };

  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Create sitemap:

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();

  // Fetch all published blog posts
  const posts = await payload.find({
    collection: 'blog',
    where: { status: { equals: 'published' } },
    limit: 1000,
  });

  // Fetch all portfolio items
  const portfolio = await payload.find({
    collection: 'portfolio',
    limit: 1000,
  });

  const baseUrl = 'https://dnamedia.sa';

  const staticPages = [
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/ar`, lastModified: new Date() },
    { url: `${baseUrl}/en/about`, lastModified: new Date() },
    { url: `${baseUrl}/ar/about`, lastModified: new Date() },
    { url: `${baseUrl}/en/portfolio`, lastModified: new Date() },
    { url: `${baseUrl}/ar/portfolio`, lastModified: new Date() },
    { url: `${baseUrl}/en/blog`, lastModified: new Date() },
    { url: `${baseUrl}/ar/blog`, lastModified: new Date() },
    { url: `${baseUrl}/en/contact`, lastModified: new Date() },
    { url: `${baseUrl}/ar/contact`, lastModified: new Date() },
  ];

  const blogPages = posts.docs.flatMap((post) => [
    {
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    },
    {
      url: `${baseUrl}/ar/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    },
  ]);

  const portfolioPages = portfolio.docs.flatMap((item) => [
    {
      url: `${baseUrl}/en/portfolio/${item.slug}`,
      lastModified: new Date(item.updatedAt),
    },
    {
      url: `${baseUrl}/ar/portfolio/${item.slug}`,
      lastModified: new Date(item.updatedAt),
    },
  ]);

  return [...staticPages, ...blogPages, ...portfolioPages];
}
```



### Day 23-24: Performance Optimization

```typescript
// src/lib/payload.ts - Payload client with caching
import { getPayload } from 'payload';
import configPromise from '@/payload/payload.config';

let cached = global.payload;

if (!cached) {
  cached = global.payload = { client: null, promise: null };
}

export const getPayloadClient = async () => {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: configPromise });
  }

  try {
    cached.client = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
```

Add caching headers:

```typescript
// src/app/[lang]/blog/page.tsx - Add revalidation
export const revalidate = 3600; // Revalidate every hour

// For static generation
export const dynamic = 'force-static';
```

Optimize GSAP loading:

```typescript
// src/lib/gsap/index.ts
'use client';

import { gsap } from 'gsap';

// Only import plugins when needed
export const loadScrollTrigger = async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return ScrollTrigger;
};

export const loadScrollSmoother = async () => {
  const { ScrollSmoother } = await import('gsap/ScrollSmoother');
  gsap.registerPlugin(ScrollSmoother);
  return ScrollSmoother;
};
```

### Day 24-25: Lighthouse Optimization

Create performance monitoring:

```typescript
// src/app/[lang]/layout.tsx - Add Web Vitals
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Optimize fonts:

```typescript
// src/app/[lang]/layout.tsx
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
});
```

---

## Week 6: Testing, Deployment & Launch

### Day 26-27: Railway Deployment Setup

Create Railway configuration:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init
```

Create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Environment variables for Railway:

```env
# Add these in Railway dashboard
NODE_ENV=production
DATABASE_URI=mongodb://[railway-mongo-url]
PAYLOAD_SECRET=[generate-secure-key]
NEXT_PUBLIC_SERVER_URL=https://dnamedia.sa
RESEND_API_KEY=[your-resend-key]
```



### Day 27-28: MongoDB Setup on Railway

Steps to set up MongoDB:

1. In Railway dashboard, click "New" → "Database" → "Add MongoDB"
2. Railway automatically provisions MongoDB instance
3. Copy the connection string from MongoDB service variables
4. Add to your app's environment variables as `DATABASE_URI`

Connection string format:
```
mongodb://mongo:PASSWORD@monorail.proxy.rlwy.net:PORT
```

### Day 28-29: Domain Configuration

Configure custom domain on Railway:

1. Go to your app settings in Railway
2. Click "Networking" → "Custom Domain"
3. Add `dnamedia.sa` and `www.dnamedia.sa`
4. Update DNS records at your domain registrar:

```
Type: CNAME
Name: @
Value: [your-app].up.railway.app

Type: CNAME
Name: www
Value: [your-app].up.railway.app
```

5. Railway automatically provisions SSL certificate

### Day 29-30: Testing & Quality Assurance

Testing checklist:

**Functionality Testing:**
- [ ] All pages load correctly in both languages
- [ ] Language switcher works on all pages
- [ ] Blog posts display with correct language content
- [ ] Portfolio items show proper videos and thumbnails
- [ ] Contact form submits successfully
- [ ] Email notifications arrive correctly
- [ ] Navigation works on mobile and desktop
- [ ] Mobile menu opens/closes properly

**RTL Testing (Arabic):**
- [ ] Text flows right-to-left correctly
- [ ] Navigation aligns properly
- [ ] Forms display correctly
- [ ] Animations work in RTL mode
- [ ] Images and videos position correctly

**Performance Testing:**
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check LCP < 2.5s
- [ ] Check FID < 100ms
- [ ] Check CLS < 0.1
- [ ] Test on 3G connection
- [ ] Verify image lazy loading works

**SEO Testing:**
- [ ] Meta tags present on all pages
- [ ] Sitemap generates correctly
- [ ] Robots.txt accessible
- [ ] hreflang tags correct for both languages
- [ ] Structured data validates (schema.org)
- [ ] Open Graph tags work (test with Facebook debugger)

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Animation Testing:**
- [ ] Hero video plays automatically
- [ ] Scroll animations trigger correctly
- [ ] Hover effects work smoothly
- [ ] Page transitions are smooth
- [ ] No animation jank or stuttering



### Day 30: Launch Preparation

**Pre-launch checklist:**

1. **Content Population:**
   - [ ] Add all 5 pages content (Home, About, Portfolio, Blog, Contact)
   - [ ] Upload portfolio videos to Vimeo
   - [ ] Create initial blog posts (at least 5)
   - [ ] Add team member information
   - [ ] Upload all images and optimize

2. **CMS Setup:**
   - [ ] Create admin user account
   - [ ] Set up editor accounts for client
   - [ ] Configure user roles and permissions
   - [ ] Test content editing workflow

3. **Analytics & Monitoring:**
   - [ ] Set up Google Analytics 4
   - [ ] Configure Google Search Console
   - [ ] Add both language versions to Search Console
   - [ ] Submit sitemap to Google
   - [ ] Set up error monitoring (Sentry optional)

4. **Security:**
   - [ ] Enable HTTPS (automatic with Railway)
   - [ ] Set secure environment variables
   - [ ] Configure CORS if needed
   - [ ] Set up rate limiting for contact form

5. **Backup Strategy:**
   - [ ] Configure MongoDB backups on Railway
   - [ ] Document backup restoration process
   - [ ] Export initial content as backup

---

## Week 7: Security, SEO & Performance Enhancements

### Day 31-32: Security Implementation

#### Rate Limiting Middleware
```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  // Rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

#### Security Headers in next.config.js
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vimeo.com *.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: *.vimeo.com;
      font-src 'self' data:;
      connect-src 'self' *.vimeo.com *.google-analytics.com;
      frame-src 'self' *.vimeo.com *.google.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['player.vimeo.com'],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
```

#### Input Sanitization Utility
```typescript
// src/lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
}

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}
```

#### Update Contact Form with Sanitization
```typescript
// src/app/api/contact/route.ts - Enhanced
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sanitizeInput } from '@/lib/utils/sanitize';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, lang } = body;

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);

    // Send email using Resend
    await resend.emails.send({
      from: 'DNA Media <noreply@dnamedia.sa>',
      to: 'info@dnamedia.sa',
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Language:</strong> ${lang}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

### Day 32-33: Enhanced SEO Implementation

#### robots.txt
```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://dnamedia.sa/sitemap.xml',
  };
}
```

#### 404 Page
```typescript
// src/app/[lang]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
```

#### Global Error Boundary
```typescript
// src/app/[lang]/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

#### Enhanced Blog Post Metadata with Structured Data
```typescript
// src/app/[lang]/blog/[slug]/page.tsx - Enhanced metadata
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: getBilingualField(post, 'title', params.lang),
    description: getBilingualField(post, 'excerpt', params.lang),
    alternates: {
      canonical: `https://dnamedia.sa/${params.lang}/blog/${params.slug}`,
      languages: {
        en: `/en/blog/${params.slug}`,
        ar: `/ar/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: getBilingualField(post, 'title', params.lang),
      description: getBilingualField(post, 'excerpt', params.lang),
      url: `https://dnamedia.sa/${params.lang}/blog/${params.slug}`,
      siteName: 'DNA Media',
      images: [
        {
          url: post.featured_image.url,
          width: 1200,
          height: 630,
          alt: post.featured_image.alt,
        },
      ],
      locale: params.lang === 'en' ? 'en_US' : 'ar_SA',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: getBilingualField(post, 'title', params.lang),
      description: getBilingualField(post, 'excerpt', params.lang),
      images: [post.featured_image.url],
    },
  };
}

// Add structured data component
function BlogPostSchema({ post, lang }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: getBilingualField(post, 'title', lang),
    description: getBilingualField(post, 'excerpt', lang),
    image: post.featured_image.url,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DNA Media',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dnamedia.sa/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dnamedia.sa/${lang}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### Portfolio Video Schema
```typescript
// src/components/portfolio/VideoSchema.tsx
export function VideoSchema({ project, lang }: any) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: getBilingualField(project, 'title', lang),
    description: getBilingualField(project, 'description', lang),
    thumbnailUrl: project.thumbnail.url,
    uploadDate: project.completedDate,
    contentUrl: `https://vimeo.com/${project.video_url}`,
    embedUrl: `https://player.vimeo.com/video/${project.video_url}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Day 33-34: Accessibility Enhancements

#### Skip to Content Link
```typescript
// src/components/layout/SkipToContent.tsx
export function SkipToContent({ lang }: { lang: Language }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
    >
      {lang === 'en' ? 'Skip to main content' : 'تخطي إلى المحتوى الرئيسي'}
    </a>
  );
}

// Add to layout.tsx
import { SkipToContent } from '@/components/layout/SkipToContent';

export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <SkipToContent lang={params.lang} />
        <Header lang={params.lang} />
        <main id="main-content">{children}</main>
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
```

#### Reduced Motion Support
```typescript
// src/lib/gsap/animations.ts
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createAnimation(element: any, config: any) {
  if (shouldReduceMotion()) {
    // Skip animations or use simpler alternatives
    return gsap.set(element, { opacity: 1, y: 0 });
  }
  return gsap.from(element, config);
}

// Update HeroSection to use this
useEffect(() => {
  if (shouldReduceMotion()) {
    gsap.set([titleRef.current, videoRef.current], { opacity: 1, y: 0 });
    return;
  }
  
  // ... existing animations
}, []);
```

#### Focus Management for Modals
```typescript
// src/components/ui/Modal.tsx
'use client';

import { useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';

export function Modal({ isOpen, onClose, children }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement;
      modalRef.current?.focus();

      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-6 max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}
```

### Day 34-35: Performance Optimizations

#### Enhanced Media Collection with WebP
```typescript
// src/payload/collections/Media.ts - Enhanced
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 90 },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    maxSize: 10485760, // 10MB limit
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (!data.alt && operation === 'create') {
          data.alt = data.filename?.replace(/\.[^/.]+$/, '').replace(/-/g, ' ') || 'Image';
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text (for accessibility)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
};
```

#### Resource Hints in Layout
```typescript
// src/app/[lang]/layout.tsx - Add resource hints
export default function RootLayout({ children, params }: any) {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Lazy Loading for Videos
```typescript
// src/components/video/LazyVideo.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export function LazyVideo({ videoId, poster }: { videoId: string; poster: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="relative w-full h-full">
      {!isLoaded ? (
        <img src={poster} alt="Video thumbnail" className="w-full h-full object-cover" />
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=0`}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
    </div>
  );
}
```

### Day 35-36: User Experience Enhancements

#### Toast Notifications
```typescript
// src/components/ui/Toast.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            } text-white`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
```

#### Back to Top Button
```typescript
// src/components/ui/BackToTop.tsx
'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function BackToTop({ lang }: { lang: Language }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, autoKill: true },
      ease: 'power2.inOut',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
      aria-label={lang === 'en' ? 'Back to top' : 'العودة إلى الأعلى'}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
```

#### Blog Search Functionality
```typescript
// src/app/api/blog/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const lang = searchParams.get('lang') || 'en';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const payload = await getPayloadClient();
  
  const results = await payload.find({
    collection: 'blog',
    where: {
      and: [
        { status: { equals: 'published' } },
        {
          or: [
            { [`title_${lang}`]: { contains: query } },
            { [`excerpt_${lang}`]: { contains: query } },
            { [`content_${lang}`]: { contains: query } },
          ],
        },
      ],
    },
    limit: 10,
  });

  return NextResponse.json({ results: results.docs });
}
```

#### Related Posts Component
```typescript
// src/components/blog/RelatedPosts.tsx
import { getPayloadClient } from '@/lib/payload';
import BlogCard from './BlogCard';

export async function RelatedPosts({ 
  currentPostId, 
  category, 
  lang 
}: { 
  currentPostId: string; 
  category: string; 
  lang: Language;
}) {
  const payload = await getPayloadClient();
  
  const relatedPosts = await payload.find({
    collection: 'blog',
    where: {
      and: [
        { id: { not_equals: currentPostId } },
        { category: { equals: category } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 3,
    sort: '-publishedDate',
  });

  if (relatedPosts.docs.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">
        {lang === 'en' ? 'Related Posts' : 'مقالات ذات صلة'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedPosts.docs.map((post) => (
          <BlogCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
    </section>
  );
}
```

#### Social Sharing Component
```typescript
// src/components/ui/SocialShare.tsx
'use client';

export function SocialShare({ 
  url, 
  title, 
  lang 
}: { 
  url: string; 
  title: string; 
  lang: Language;
}) {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">
        {lang === 'en' ? 'Share:' : 'مشاركة:'}
      </span>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600"
        aria-label="Share on Facebook"
      >
        {/* Facebook Icon */}
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-400"
        aria-label="Share on Twitter"
      >
        {/* Twitter Icon */}
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-700"
        aria-label="Share on LinkedIn"
      >
        {/* LinkedIn Icon */}
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-green-600"
        aria-label="Share on WhatsApp"
      >
        {/* WhatsApp Icon */}
      </a>
    </div>
  );
}
```

### Day 36-37: Monitoring & Analytics

#### Sentry Error Tracking
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

#### Custom Event Tracking
```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage examples:
// trackEvent('video_play', { video_id: '123', title: 'Project Name' });
// trackEvent('form_submit', { form_name: 'contact' });
// trackEvent('language_switch', { from: 'en', to: 'ar' });
```

#### Health Check Endpoint
```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    await payload.find({ collection: 'pages', limit: 1 });
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        cms: 'up',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 503 }
    );
  }
}
```

---

## Post-Launch Maintenance

### Weekly Tasks:
- Monitor site performance via Lighthouse
- Check error logs in Railway dashboard
- Review contact form submissions
- Update blog content (client requirement: daily posts)

### Monthly Tasks:
- Review analytics data
- Check for broken links
- Update dependencies (`npm outdated`)
- Review and optimize images
- Check MongoDB storage usage

### Quarterly Tasks:
- Security audit
- Performance optimization review
- Content audit
- SEO performance review

---

## Troubleshooting Guide

### Common Issues & Solutions

**Issue: Videos not loading**
- Check Vimeo video IDs are correct
- Verify Vimeo privacy settings allow embedding
- Check network tab for CORS errors

**Issue: Animations not working**
- Verify GSAP plugins are registered
- Check ScrollTrigger markers in dev mode
- Ensure elements have proper refs

**Issue: RTL layout broken**
- Check `dir="rtl"` attribute on html tag
- Verify Tailwind RTL utilities are used
- Test with Arabic font loaded

**Issue: Slow page load**
- Check image sizes (should be optimized)
- Verify lazy loading is enabled
- Check for large JavaScript bundles
- Review GSAP plugin imports

**Issue: CMS not accessible**
- Check `/admin` route is working
- Verify DATABASE_URI is correct
- Check MongoDB connection in Railway
- Review Payload config for errors

**Issue: Contact form not sending**
- Verify Resend API key is set
- Check email address is verified in Resend
- Review API route logs in Railway
- Test with different email addresses

**Issue: Build failing on Railway**
- Check build logs for specific errors
- Verify all dependencies are in package.json
- Check Node version compatibility
- Review environment variables

---

## Development Commands Reference

```bash
# Local development
npm run dev                    # Start dev server (http://localhost:3000)
npm run build                  # Build for production
npm run start                  # Start production server
npm run generate:types         # Generate Payload TypeScript types

# Railway deployment
railway link                   # Link to Railway project
railway up                     # Deploy to Railway
railway logs                   # View deployment logs
railway run npm run build      # Run build on Railway
railway variables              # Manage environment variables

# Database
railway connect MongoDB        # Connect to Railway MongoDB

# Testing
npm run lint                   # Run ESLint
npm run type-check            # Run TypeScript checks
```

---

## Client Handoff Documentation

### CMS Access:
- URL: `https://dnamedia.sa/admin`
- Username: [provided separately]
- Password: [provided separately]

### Adding New Blog Posts:
1. Log in to CMS at `/admin`
2. Navigate to "Blog" collection
3. Click "Create New"
4. Fill in both English and Arabic fields
5. Upload featured image
6. Select category and add tags
7. Set status to "Published"
8. Click "Save"

### Adding Portfolio Items:
1. Upload video to Vimeo Pro account
2. Copy Vimeo video ID
3. In CMS, go to "Portfolio" collection
4. Create new item with bilingual titles
5. Paste Vimeo video ID
6. Upload thumbnail image
7. Set display order
8. Save

### Editing Pages:
1. Go to "Pages" collection
2. Select page to edit
3. Update content in both languages
4. Save changes
5. Changes appear immediately on site

### Language Management:
- All content fields have `_en` and `_ar` suffixes
- Always fill both language versions
- Preview each language before publishing

---

## Cost Breakdown Summary

**Monthly Costs:**
- Railway hosting: $15-20/month (includes MongoDB)
- Vimeo Pro: $20/month
- Resend email: $0 (free tier, 3000 emails/month)
- Domain: ~$15/year ($1.25/month)

**Total Monthly: $36-41**

---

## Support & Resources

**Documentation:**
- Next.js: https://nextjs.org/docs
- Payload CMS: https://payloadcms.com/docs
- GSAP: https://greensock.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Railway: https://docs.railway.app

**Community:**
- Payload Discord: https://discord.gg/payload
- Next.js Discord: https://nextjs.org/discord
- GSAP Forums: https://greensock.com/forums

**Developer Contact:**
- For technical support during first 30 days
- Email: [your-email]
- Response time: 24-48 hours

---

## Project Completion Checklist

- [ ] All 5 pages implemented and tested
- [ ] Bilingual content working (English + Arabic)
- [ ] RTL layout functioning correctly
- [ ] GSAP animations smooth and performant
- [ ] Blog system fully functional
- [ ] Portfolio with video integration working
- [ ] Contact form sending emails
- [ ] SEO optimized (90+ Lighthouse score)
- [ ] Mobile responsive on all devices
- [ ] Deployed to Railway with custom domain
- [ ] SSL certificate active
- [ ] MongoDB backups configured
- [ ] Client trained on CMS usage
- [ ] Documentation provided
- [ ] Analytics and Search Console set up
- [ ] Final testing completed
- [ ] Client sign-off received

---

## 📋 COMPREHENSIVE CHECKLISTS

### 🔒 Security Checklist

- [ ] Rate limiting implemented on all API routes
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options, etc.)
- [ ] Input sanitization for all user inputs
- [ ] HTTPS enabled (automatic with Railway)
- [ ] Environment variables secured
- [ ] CORS policies configured
- [ ] File upload validation (type, size)
- [ ] No sensitive data in error messages
- [ ] Regular security audits (`npm audit`)
- [ ] Dependencies kept updated
- [ ] Honeypot field in contact form (optional)

### 📈 SEO Checklist

- [ ] robots.txt implemented
- [ ] XML sitemap generated dynamically
- [ ] Canonical URLs on all pages
- [ ] hreflang tags for bilingual content
- [ ] Open Graph tags with images (1200x630)
- [ ] Twitter Card tags
- [ ] Structured data (Organization, Article, VideoObject)
- [ ] Alt text for all images
- [ ] Semantic HTML (h1, h2, nav, article, etc.)
- [ ] Mobile-friendly responsive design
- [ ] Fast loading (90+ Lighthouse score)
- [ ] 404 page implemented
- [ ] Meta descriptions on all pages (150-160 chars)
- [ ] Title tags optimized (50-60 chars)
- [ ] URL structure clean and descriptive

### ♿ Accessibility Checklist

- [ ] Skip to content link
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Alt text for all images
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form labels properly associated
- [ ] Error messages accessible
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Screen reader testing completed
- [ ] Semantic HTML structure
- [ ] Focus trap in modals
- [ ] Language attribute on HTML tag
- [ ] Heading hierarchy correct (h1 → h2 → h3)

### ⚡ Performance Checklist

- [ ] Lighthouse Performance score 90+
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s
- [ ] Images optimized (WebP format)
- [ ] Images lazy loaded
- [ ] Videos lazy loaded
- [ ] Fonts preloaded
- [ ] External resources preconnected
- [ ] Code splitting implemented
- [ ] Static generation where possible
- [ ] Database queries cached

### 🧪 Testing Checklist

#### Functionality Testing
- [ ] All pages load correctly in both languages
- [ ] Language switcher works on all pages
- [ ] Blog posts display with correct language content
- [ ] Portfolio items show proper videos and thumbnails
- [ ] Contact form submits successfully
- [ ] Email notifications arrive correctly
- [ ] Navigation works on mobile and desktop
- [ ] Mobile menu opens/closes properly
- [ ] Search functionality works
- [ ] Related posts display correctly

#### RTL Testing (Arabic)
- [ ] Text flows right-to-left correctly
- [ ] Navigation aligns properly (right side)
- [ ] Forms display correctly
- [ ] Animations work in RTL mode
- [ ] Images and videos position correctly
- [ ] Buttons and CTAs aligned correctly

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Large Mobile (414x896)

### 🚀 Deployment Checklist

- [ ] Environment variables configured in Railway
- [ ] Database backup strategy documented
- [ ] Health check endpoint implemented
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics (GA4) set up
- [ ] Performance monitoring enabled
- [ ] SSL certificate active
- [ ] Domain configured (dnamedia.sa)
- [ ] DNS records updated
- [ ] Monitoring alerts configured
- [ ] Documentation updated
- [ ] Client training completed
- [ ] CMS user accounts created
- [ ] Initial content populated

---

## 📊 PERFORMANCE BUDGET

Create `performance-budget.json` in project root:

```json
{
  "timings": {
    "firstContentfulPaint": 1500,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3500,
    "totalBlockingTime": 300,
    "cumulativeLayoutShift": 0.1
  },
  "resourceSizes": {
    "total": 2000,
    "script": 500,
    "stylesheet": 100,
    "image": 1000,
    "font": 200,
    "document": 50,
    "other": 150
  },
  "resourceCounts": {
    "total": 50,
    "script": 15,
    "stylesheet": 5,
    "image": 20,
    "font": 5,
    "document": 1,
    "other": 4
  }
}
```

---

## 📚 DATABASE BACKUP GUIDE

### Manual Backup Process

#### Using Railway Dashboard:
1. Go to Railway dashboard
2. Select MongoDB service
3. Click "Backups" tab
4. Click "Create Backup"
5. Download backup file

#### Using MongoDB Tools:
```bash
# Create backup
mongodump --uri="your-mongodb-uri" --out=./backup-$(date +%Y%m%d)

# Compress backup
tar -czf backup-$(date +%Y%m%d).tar.gz ./backup-$(date +%Y%m%d)

# Restore backup
mongorestore --uri="your-mongodb-uri" ./backup-folder
```

### Backup Schedule Recommendation:
- **Daily**: Automated via Railway (if available)
- **Weekly**: Manual backup before major updates
- **Before deployment**: Always create backup

### Backup Storage:
- Keep last 7 daily backups
- Keep last 4 weekly backups
- Store backups in secure location (Google Drive, Dropbox, etc.)

### Optional: Automated Backup Script
```typescript
// scripts/backup-database.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import { format } from 'date-fns';

const execAsync = promisify(exec);

async function backupDatabase() {
  const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
  const backupName = `dna-media-backup-${timestamp}`;
  
  try {
    await execAsync(
      `mongodump --uri="${process.env.DATABASE_URI}" --out=./backups/${backupName}`
    );
    
    await execAsync(
      `tar -czf ./backups/${backupName}.tar.gz ./backups/${backupName}`
    );
    
    await execAsync(`rm -rf ./backups/${backupName}`);
    
    console.log(`✅ Backup created: ${backupName}.tar.gz`);
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  }
}

backupDatabase();
```

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1: Core Features (Weeks 1-6)
✅ All features from original plan

### Phase 2: Security & SEO (Week 7 - Days 31-33)
1. Rate limiting middleware
2. Security headers
3. Input sanitization
4. robots.txt
5. 404 and error pages
6. Enhanced metadata
7. Structured data

### Phase 3: Accessibility & Performance (Week 7 - Days 34-35)
8. Skip to content link
9. Reduced motion support
10. Focus management
11. WebP image optimization
12. Resource hints
13. Lazy loading for videos

### Phase 4: User Experience (Week 7 - Days 35-36)
14. Toast notifications
15. Back to top button
16. Blog search
17. Related posts
18. Social sharing

### Phase 5: Monitoring (Week 7 - Day 36-37)
19. Sentry error tracking
20. Custom event tracking
21. Health check endpoint

---

## 📦 COMPLETE DEPENDENCIES LIST

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "payload": "^2.0.0",
    "@payloadcms/db-mongodb": "^2.0.0",
    "@payloadcms/richtext-lexical": "^2.0.0",
    "@payloadcms/bundler-webpack": "^2.0.0",
    "gsap": "^3.12.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "sharp": "^0.33.0",
    "dotenv": "^16.3.0",
    "cross-env": "^7.0.3",
    "@upstash/ratelimit": "^1.0.0",
    "@upstash/redis": "^1.25.0",
    "isomorphic-dompurify": "^2.9.0",
    "@sentry/nextjs": "^7.80.0",
    "focus-trap-react": "^10.2.0",
    "@vercel/analytics": "^1.1.0",
    "@vercel/speed-insights": "^1.0.0",
    "resend": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.3.0",
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.0",
    "@playwright/test": "^1.40.0",
    "@axe-core/playwright": "^4.8.0"
  }
}
```

---

## 🔧 ENVIRONMENT VARIABLES

### Development (.env.local)
```env
# Database
DATABASE_URI=mongodb://localhost:27017/dna-media

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Email
RESEND_API_KEY=your-resend-api-key

# Vimeo (optional)
VIMEO_ACCESS_TOKEN=your-vimeo-token

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production (Railway Dashboard)
```env
NODE_ENV=production
DATABASE_URI=mongodb://[railway-mongo-url]
PAYLOAD_SECRET=[generate-secure-key]
NEXT_PUBLIC_SERVER_URL=https://dnamedia.sa
RESEND_API_KEY=[your-resend-key]
UPSTASH_REDIS_REST_URL=[your-upstash-url]
UPSTASH_REDIS_REST_TOKEN=[your-upstash-token]
NEXT_PUBLIC_SENTRY_DSN=[your-sentry-dsn]
NEXT_PUBLIC_GA_ID=[your-ga-id]
```

---

## 📖 FINAL NOTES

### What's Included:
✅ All original features from proposal
✅ Security enhancements (rate limiting, headers, sanitization)
✅ SEO optimizations (robots.txt, structured data, enhanced metadata)
✅ Accessibility improvements (WCAG AA compliance)
✅ Performance optimizations (WebP, lazy loading, resource hints)
✅ User experience features (search, social sharing, toast notifications)
✅ Monitoring and analytics (Sentry, GA4, health checks)
✅ Comprehensive testing checklists
✅ Database backup strategy

### Timeline:
- **Weeks 1-6**: Core features (original plan)
- **Week 7**: Security, SEO, accessibility, performance, UX, monitoring
- **Total**: 7 weeks for complete production-ready application

### Success Metrics:
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 95+
- Lighthouse Best Practices: 90+
- Zero critical security vulnerabilities
- < 2.5s page load time
- < 0.1 Cumulative Layout Shift

---

**End of Final Implementation Plan**

This comprehensive plan provides everything needed to build a production-ready, enterprise-grade website for DNA Media with best practices in security, performance, SEO, and accessibility.


---

## CMS Content Management Guide

### ✅ YES - You Can Edit Everything From CMS:

The Payload CMS gives you complete control over ALL website content without touching code:

#### Text Content:
- ✅ All page headings and subheadings (English & Arabic)
- ✅ Body text and descriptions
- ✅ Button text and labels
- ✅ Footer text and copyright
- ✅ Navigation menu items
- ✅ SEO meta titles and descriptions
- ✅ Contact information
- ✅ Social media links

#### Images:
- ✅ Hero background images
- ✅ Section images throughout pages
- ✅ Team member photos
- ✅ Portfolio thumbnails
- ✅ Service icons
- ✅ Logo and favicon
- ✅ Client logos
- ✅ Blog post featured images
- ✅ ANY image on the website

#### Videos:
- ✅ Hero background videos (Vimeo ID)
- ✅ Portfolio project videos
- ✅ Section videos
- ✅ Video thumbnails

#### Layout & Structure:
- ✅ Add/remove/reorder page sections
- ✅ Choose section types (text+image, gallery, video, services grid, team grid)
- ✅ Control which sections appear on each page
- ✅ Drag and drop to reorder content

### Detailed CMS Editing Guides:

#### 1. Editing Page Text & Images:

**Step-by-step:**
1. Log in to `/admin`
2. Click "Pages" in sidebar
3. Select page (Home, About, Portfolio, Blog, Contact)
4. **Edit Hero Section:**
   - Change heading text (English field)
   - Change heading text (Arabic field)
   - Change subheading text (both languages)
   - Click "Background Image" → Upload new image or select from library
   - Enter new Vimeo video ID for background video
   - Edit button text and link
5. **Edit Page Sections:**
   - Scroll to "Page Sections" array
   - Click on any section to expand and edit
   - Change heading text (EN/AR)
   - Edit content using rich text editor
   - Click image field → Upload new image or replace existing
   - Add new section: Click "Add Section" button
   - Reorder sections: Drag section up/down
   - Delete section: Click trash icon
6. Click "Save" button
7. Visit website to see changes immediately

#### 2. Changing Homepage Content:

**Hero Video:**
1. Pages → Home
2. Hero Section → Background Video field
3. Enter Vimeo video ID (e.g., "123456789")
4. Save

**Hero Text:**
1. Pages → Home
2. Hero Section → Heading (English) → Type new text
3. Hero Section → Heading (Arabic) → Type new text
4. Save

**Services Section:**
1. Go to "Services" collection
2. Click on service to edit
3. Change title (EN/AR)
4. Change description (EN/AR)
5. Click icon field → Upload new icon image
6. Save

**Featured Portfolio:**
1. Go to "Portfolio" collection
2. Click on project
3. Check/uncheck "Featured Project" checkbox
4. Save
5. Featured projects appear on homepage automatically

#### 3. Managing Team Members (About Page):

**Add New Team Member:**
1. Go to "Team" collection
2. Click "Create New"
3. Enter full name
4. Enter position (English)
5. Enter position (Arabic)
6. Write bio (English)
7. Write bio (Arabic)
8. Click "Profile Photo" → Upload photo
9. Enter LinkedIn URL (optional)
10. Set display order (1, 2, 3, etc.)
11. Click "Save"
12. Team member appears on About page immediately

**Change Team Member Photo:**
1. Team → Click on team member
2. Click on current photo
3. Either:
   - Upload new photo
   - Select different photo from media library
4. Save

**Remove Team Member:**
1. Team → Click on team member
2. Scroll to bottom
3. Click "Delete" button
4. Confirm deletion

#### 4. Managing Portfolio Projects:

**Add New Project:**
1. Upload video to your Vimeo account first
2. Copy Vimeo video ID from URL (e.g., vimeo.com/123456789)
3. In CMS: Portfolio → Create New
4. Fill in:
   - Project Title (English)
   - Project Title (Arabic)
   - Client Name
   - Description (English)
   - Description (Arabic)
   - Video URL: Paste Vimeo ID
   - Category: Select from dropdown
5. Upload thumbnail image
6. Check "Featured" if you want it on homepage
7. Set display order (lower numbers appear first)
8. Save

**Change Project Video:**
1. Portfolio → Click on project
2. Video URL field → Enter new Vimeo ID
3. Save

**Change Project Thumbnail:**
1. Portfolio → Click on project
2. Click on thumbnail image
3. Upload new image
4. Save

#### 5. Blog Management:

**Create New Blog Post:**
1. Blog → Create New
2. Enter title (English & Arabic)
3. Enter excerpt (English & Arabic) - shows in listing
4. Write content using rich text editor:
   - Bold, italic, underline text
   - Add headings (H2, H3)
   - Insert links
   - Add bullet lists
   - Add numbered lists
5. Upload featured image
6. Select category
7. Add tags (English & Arabic)
8. Set publish date
9. Status: "Published" (or "Draft" to save without publishing)
10. Save

**Edit Existing Post:**
1. Blog → Click on post
2. Edit any field
3. Upload new featured image if needed
4. Save

**Change Blog Featured Image:**
1. Blog → Click on post
2. Click on featured image
3. Upload new image or select from library
4. Save

#### 6. Contact Page:

**Update Contact Information:**
1. Globals → Settings
2. Contact Information section:
   - Email: Enter new email
   - Phone: Enter new phone
   - Address (English): Update address
   - Address (Arabic): Update address
3. Save
4. Changes appear on Contact page and footer

**Update Google Maps:**
1. Pages → Contact
2. Find map section
3. Enter new Google Maps embed URL
4. Save

#### 7. Site-Wide Settings:

**Change Logo:**
1. Globals → Settings
2. Site Logo field
3. Upload new logo image
4. Save
5. Logo updates across entire site

**Update Social Media Links:**
1. Globals → Settings
2. Social Media Links section:
   - Facebook URL
   - Instagram URL
   - Twitter URL
   - LinkedIn URL
   - YouTube URL
3. Save
4. Links update in footer and contact page

**Change Footer Text:**
1. Globals → Settings
2. Footer Text (English) → Edit text
3. Footer Text (Arabic) → Edit text
4. Save

#### 8. Media Library Management:

**Upload New Images:**
1. Click "Media" in sidebar
2. Click "Upload" button
3. Select image(s) from computer
4. Enter alt text for each image (important for SEO)
5. Images are now available to use anywhere

**Replace Image Across Site:**
1. Media → Find image
2. Click on image
3. Upload new file (keeps same ID, updates everywhere)
4. Save

**Organize Media:**
1. Media library shows all uploaded files
2. Search by filename
3. Filter by type (images, videos)
4. Delete unused media to save space

### Important Notes:

**Bilingual Content:**
- ALWAYS fill both English (`_en`) and Arabic (`_ar`) fields
- If you only fill one language, that page will be incomplete
- Use the language switcher on frontend to preview both versions

**Image Optimization:**
- Upload high-quality images (at least 1920px wide for hero images)
- CMS automatically creates optimized versions
- Supported formats: JPG, PNG, WebP, SVG

**Video Best Practices:**
- Always use Vimeo for videos (not direct uploads)
- Keep videos under 100MB for best performance
- Use Vimeo's privacy settings to control who can view

**Preview Before Publishing:**
- Save as "Draft" to preview changes
- Open website in new tab to see draft
- Switch to "Published" when ready

**Undo Changes:**
- Every save creates a version
- Click "Versions" tab to see history
- Restore previous version if needed

**Multiple Users:**
- Multiple people can edit simultaneously
- Changes save independently
- Assign roles: Admin (full access) or Editor (limited access)

### Quick Reference:

| What to Change | Where to Go | Field to Edit |
|----------------|-------------|---------------|
| Homepage hero text | Pages → Home | Hero Section → Heading |
| Homepage hero image | Pages → Home | Hero Section → Background Image |
| Homepage hero video | Pages → Home | Hero Section → Background Video |
| About page text | Pages → About | Sections → Content |
| Team member photo | Team → Member | Profile Photo |
| Portfolio video | Portfolio → Project | Video URL |
| Blog post image | Blog → Post | Featured Image |
| Contact email | Globals → Settings | Contact → Email |
| Footer text | Globals → Settings | Footer Text |
| Logo | Globals → Settings | Site Logo |
| Social links | Globals → Settings | Social Media Links |

---

## Additional Collections Needed

Based on the proposal requirements, we need to add these collections to the implementation:

### Client Logos Collection

```typescript
// src/payload/collections/Clients.ts
import { CollectionConfig } from 'payload/types';

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    description: 'Client logos displayed on homepage',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Client Logo',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Client Website URL',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
};
```

### Timeline/Awards Collection (for About page)

```typescript
// src/payload/collections/Timeline.ts
import { CollectionConfig } from 'payload/types';

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    useAsTitle: 'title_en',
    description: 'Company milestones and awards for About page',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Year',
    },
    {
      name: 'title_en',
      type: 'text',
      required: true,
      label: 'Title (English)',
    },
    {
      name: 'title_ar',
      type: 'text',
      required: true,
      label: 'Title (Arabic)',
    },
    {
      name: 'description_en',
      type: 'textarea',
      label: 'Description (English)',
    },
    {
      name: 'description_ar',
      type: 'textarea',
      label: 'Description (Arabic)',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Milestone', value: 'milestone' },
        { label: 'Award', value: 'award' },
      ],
    },
  ],
};
```

These collections ensure COMPLETE control over all website content from the CMS, matching all requirements from the proposal.
