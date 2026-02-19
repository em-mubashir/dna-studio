---
inclusion: auto
---

# DNA Media - Project Structure & Conventions

## 🚨 CRITICAL REQUIREMENT: 100% CMS-Editable Content

**ALL page content and images MUST be editable from the CMS - NO hardcoded content in components.**

### Absolute Rules:
- ❌ **NEVER** hardcode text in components (headings, paragraphs, button labels)
- ❌ **NEVER** use images directly from `/public` folder in components
- ❌ **NEVER** create static content that requires code changes to update
- ✅ **ALWAYS** fetch content from Payload collections
- ✅ **ALWAYS** upload images through CMS Media library
- ✅ **ALWAYS** store text in bilingual fields (`_en`, `_ar`)

### What Must Be CMS-Editable:
- Every heading, paragraph, button text on every page
- Every image (hero backgrounds, section images, team photos, logos, icons)
- Every video (Vimeo IDs stored in CMS)
- Page layouts (add/remove/reorder sections via drag-and-drop)
- Navigation menu items
- Footer content
- Contact information
- Social media links
- SEO meta tags per page

### Implementation Pattern:

**❌ WRONG - Hardcoded Content:**
```typescript
// DON'T DO THIS
export function HeroSection() {
  return (
    <div>
      <h1>Welcome to DNA Media</h1>
      <p>Premium video production services</p>
      <img src="/images/hero.jpg" alt="Hero" />
      <button>Contact Us</button>
    </div>
  );
}
```

**✅ CORRECT - CMS-Driven Content:**
```typescript
// DO THIS - All content from CMS
interface HeroProps {
  heading: string;
  subheading: string;
  backgroundImage: { url: string; alt: string };
  ctaText: string;
  ctaLink: string;
}

export function HeroSection({ heading, subheading, backgroundImage, ctaText, ctaLink }: HeroProps) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <img src={backgroundImage.url} alt={backgroundImage.alt} />
      <Link href={ctaLink}>
        <button>{ctaText}</button>
      </Link>
    </div>
  );
}

// In page.tsx - fetch from CMS
const pageData = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } }
});

<HeroSection 
  heading={getBilingualField(pageData.hero, 'heading', lang)}
  subheading={getBilingualField(pageData.hero, 'subheading', lang)}
  backgroundImage={pageData.hero.background_image}
  ctaText={getBilingualField(pageData.hero, 'cta_text', lang)}
  ctaLink={pageData.hero.cta_link}
/>
```

## Directory Organization

### `/src/app` - Next.js App Router
Application routes using Next.js 14 App Router with dynamic language routing.

```
app/
├── [lang]/                    # Dynamic language segment (en, ar)
│   ├── layout.tsx            # Root layout - fetches global settings from CMS
│   ├── page.tsx              # Homepage - fetches from Pages collection
│   ├── about/page.tsx        # About - fetches from Pages collection
│   ├── portfolio/
│   │   ├── page.tsx          # Portfolio listing - fetches from Portfolio collection
│   │   └── [slug]/page.tsx   # Individual project - fetches from Portfolio collection
│   ├── blog/
│   │   ├── page.tsx          # Blog listing - fetches from Blog collection
│   │   └── [slug]/page.tsx   # Individual post - fetches from Blog collection
│   ├── contact/page.tsx      # Contact - fetches from Pages collection
│   ├── not-found.tsx         # 404 error page
│   └── error.tsx             # Global error boundary
├── admin/                     # Payload CMS admin interface
├── api/
│   ├── contact/route.ts      # Contact form handler (with sanitization)
│   ├── blog/search/route.ts  # Blog search endpoint
│   ├── health/route.ts       # Health check for monitoring
│   └── [...payload]/route.ts # Payload API routes
├── robots.ts                  # Dynamic robots.txt generation
└── sitemap.ts                # Dynamic sitemap generation
```

### `/src/components` - React Components
**All components are presentational - they receive data via props, never contain hardcoded content.**

```
components/
├── animations/
│   ├── PageTransition.tsx    # Page transition animations
│   └── ScrollReveal.tsx      # Scroll-triggered reveal animations
├── layout/
│   ├── Header.tsx            # Site header - receives nav items, logo from CMS
│   ├── Footer.tsx            # Site footer - receives footer content from CMS
│   ├── Navigation.tsx        # Mobile/desktop navigation - receives menu from CMS
│   └── SkipToContent.tsx     # Accessibility skip link
├── sections/
│   ├── HeroSection.tsx       # Hero - receives heading, image, video from CMS
│   ├── PortfolioGrid.tsx     # Portfolio grid - receives items from CMS
│   ├── ServicesSection.tsx   # Services - receives services from CMS
│   └── TeamGrid.tsx          # Team grid - receives team members from CMS
├── blog/
│   ├── BlogCard.tsx          # Blog post card - receives post data
│   ├── BlogContent.tsx       # Rich text renderer - receives content from CMS
│   ├── BlogPostSchema.tsx    # Structured data for blog posts
│   └── RelatedPosts.tsx      # Related posts - receives posts from CMS
├── portfolio/
│   ├── PortfolioCard.tsx     # Portfolio card - receives project data
│   ├── VideoModal.tsx        # Video lightbox modal
│   └── VideoSchema.tsx       # Structured data for videos
├── video/
│   └── LazyVideo.tsx         # Lazy-loaded video - receives Vimeo ID from CMS
└── ui/
    ├── Button.tsx            # Reusable button - receives text as prop
    ├── Input.tsx             # Form input component
    ├── Modal.tsx             # Modal/dialog with focus trap
    ├── Toast.tsx             # Toast notification system
    ├── BackToTop.tsx         # Back to top button - receives label from CMS
    └── SocialShare.tsx       # Social sharing - receives URLs from CMS
```

### `/src/payload` - Payload CMS Configuration
**This is where ALL content is stored and managed.**

```
payload/
├── collections/
│   ├── Pages.ts              # ALL static pages (Home, About, Contact, etc.)
│   │                         # - Hero section (heading, image, video, CTA)
│   │                         # - Repeatable sections (text, images, galleries)
│   │                         # - SEO fields per language
│   ├── Blog.ts               # Blog posts with bilingual fields
│   ├── Portfolio.ts          # Portfolio projects with videos
│   ├── Services.ts           # Service offerings (title, description, icon)
│   ├── Team.ts               # Team member profiles (name, photo, bio)
│   ├── Clients.ts            # Client logos for homepage
│   ├── Timeline.ts           # Company milestones and awards
│   ├── Media.ts              # Media library (ALL images, WebP conversion)
│   └── Users.ts              # CMS users (Admin, Editor roles)
├── globals/
│   └── Settings.ts           # Global site settings
│                             # - Contact info (email, phone, address)
│                             # - Social media links
│                             # - Footer text
│                             # - Logo and favicon
├── payload.config.ts         # Main Payload configuration
└── payload-types.ts          # Auto-generated TypeScript types
```

### `/src/lib` - Utilities and Helpers

```
lib/
├── gsap/
│   ├── index.ts              # GSAP initialization
│   ├── animations.ts         # Reusable animation functions
│   └── GSAPProvider.tsx      # GSAP context provider
├── utils/
│   ├── language.ts           # getBilingualField() - extracts correct language
│   ├── sanitize.ts           # Input sanitization (DOMPurify)
│   ├── date.ts               # Date formatting helpers
│   └── validation.ts         # Form validation schemas (Zod)
├── payload.ts                # Payload client with caching
├── analytics.ts              # Custom event tracking (GA4)
└── sentry.ts                 # Error tracking setup
```

### `/src/middleware.ts` - Rate Limiting
Edge middleware for API route protection (10 req/10s per IP).

### `/public` - Static Assets
**⚠️ WARNING: Do NOT use images from /public in components. All images must come from CMS Media library.**

```
public/
├── fonts/                     # Font files only (if self-hosting)
└── favicon.ico               # Favicon (also managed in CMS Settings)
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.tsx`, `BlogCard.tsx`)
- **Utilities**: camelCase (e.g., `language.ts`, `validation.ts`)
- **Routes**: kebab-case folders (e.g., `blog/`, `contact/`)
- **Collections**: PascalCase (e.g., `Pages.ts`, `Blog.ts`)
- **API routes**: kebab-case (e.g., `contact/route.ts`)

## Key Architectural Patterns

### 1. Language Routing
- Dynamic segment `[lang]` captures language code (en, ar)
- All pages exist under `/[lang]/*` structure
- Language utilities in `lib/utils/language.ts` handle bilingual content
- RTL/LTR direction set in root layout based on language
- Every text field in CMS has `_en` and `_ar` variants

### 2. CMS-Driven Content Architecture
**This is the most important pattern in the entire project.**

#### Pages Collection Structure:
```typescript
{
  slug: 'home',  // Identifies the page
  title_en: 'Home',
  title_ar: 'الرئيسية',
  
  // Hero section - fully editable
  hero: {
    heading_en: 'Welcome to DNA Media',
    heading_ar: 'مرحبا بكم في DNA Media',
    subheading_en: 'Premium video production',
    subheading_ar: 'إنتاج فيديو متميز',
    background_video: '123456789',  // Vimeo ID
    background_image: {
      url: '/media/hero-bg.webp',
      alt: 'Hero background'
    },
    cta_text_en: 'View Our Work',
    cta_text_ar: 'شاهد أعمالنا',
    cta_link: '/en/portfolio'
  },
  
  // Repeatable sections - add/remove/reorder via drag-and-drop
  sections: [
    {
      section_type: 'text_image',
      heading_en: 'About Us',
      heading_ar: 'من نحن',
      content_en: '<p>Rich text content...</p>',
      content_ar: '<p>محتوى نصي غني...</p>',
      image: {
        url: '/media/about-image.webp',
        alt: 'About DNA Media'
      }
    },
    {
      section_type: 'services',
      heading_en: 'Our Services',
      heading_ar: 'خدماتنا'
      // Services fetched from Services collection
    },
    {
      section_type: 'gallery',
      heading_en: 'Our Work',
      heading_ar: 'أعمالنا',
      images: [
        { url: '...', alt: '...' },
        { url: '...', alt: '...' }
      ]
    }
  ],
  
  // SEO fields
  seo_title_en: 'DNA Media - Premium Video Production',
  seo_title_ar: 'DNA Media - إنتاج فيديو متميز',
  seo_description_en: '...',
  seo_description_ar: '...'
}
```

#### How Pages Are Rendered:
```typescript
// src/app/[lang]/page.tsx
export default async function HomePage({ params: { lang } }) {
  // 1. Fetch page data from CMS
  const payload = await getPayloadClient();
  const pageData = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1
  });
  
  const page = pageData.docs[0];
  
  // 2. Render hero section with CMS data
  return (
    <>
      <HeroSection
        heading={getBilingualField(page.hero, 'heading', lang)}
        subheading={getBilingualField(page.hero, 'subheading', lang)}
        backgroundVideo={page.hero.background_video}
        backgroundImage={page.hero.background_image}
        ctaText={getBilingualField(page.hero, 'cta_text', lang)}
        ctaLink={page.hero.cta_link}
      />
      
      {/* 3. Render sections dynamically based on section_type */}
      {page.sections.map((section, index) => {
        switch (section.section_type) {
          case 'text_image':
            return (
              <TextImageSection
                key={index}
                heading={getBilingualField(section, 'heading', lang)}
                content={getBilingualField(section, 'content', lang)}
                image={section.image}
              />
            );
          case 'services':
            return <ServicesSection key={index} lang={lang} />;
          case 'gallery':
            return (
              <GallerySection
                key={index}
                heading={getBilingualField(section, 'heading', lang)}
                images={section.images}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
```

### 3. Animation Architecture
- GSAP context provider wraps application
- Animation components use `useRef` and `useEffect` hooks
- ScrollTrigger for scroll-based animations
- Cleanup functions prevent memory leaks
- Check `prefers-reduced-motion` before animating

### 4. Form Handling
- React Hook Form for form state management
- Zod schemas for validation
- DOMPurify for input sanitization
- API routes handle server-side processing
- Resend API for email delivery

### 5. Security Implementation
- Rate limiting middleware on all `/api/*` routes
- Security headers in `next.config.js`
- Input sanitization for all user inputs
- Environment variables for secrets
- HTTPS enforcement via HSTS header

## Code Organization Principles

### 1. Separation of Concerns
- **Components**: Presentational only, receive data via props
- **Pages**: Data fetchers, fetch from CMS and pass to components
- **Utilities**: Business logic and helpers
- **CMS Collections**: Data structure and validation

### 2. CMS-First Development
- **Start with CMS schema**: Define collections before building components
- **Components follow CMS structure**: Props match CMS field structure
- **No hardcoded content**: Every piece of content comes from CMS
- **Bilingual by default**: All text fields have `_en` and `_ar` variants

### 3. Colocation
- Related files grouped together (e.g., blog components in `components/blog/`)
- Feature folders keep related code close
- Shared code in `lib/` and `components/ui/`

### 4. Type Safety
- TypeScript throughout entire codebase
- Payload auto-generates types from collections
- Zod schemas for runtime validation with type inference
- Strict mode enabled in `tsconfig.json`

### 5. Server/Client Split
- **Default**: Server components for better performance
- **Client**: Only when needed (`'use client'` directive)
- **Markers**: Animations, forms, interactive elements need client
- **Data Fetching**: Server components fetch data from CMS

### 6. Bilingual First
- All content fields support both languages from the start
- Field naming: Consistent `_en` and `_ar` suffixes
- Helper function: `getBilingualField(data, fieldName, lang)` for easy access
- Validation: Both languages required in CMS

### 7. Performance First
- Static generation default for all pages
- ISR (Incremental Static Regeneration) for dynamic content
- Lazy loading for images, videos, animations
- Code splitting automatic via Next.js
- Caching: Payload client, API responses

### 8. Security First
- Input validation for all user inputs
- Sanitization for all user inputs
- Rate limiting on all API routes
- Security headers on all responses
- Secrets never in code, always in environment variables

## CMS Collections Deep Dive

### Pages Collection (Most Important)
**Purpose**: Flexible page builder for ALL static pages (Home, About, Contact, etc.)

**Key Features**:
- Hero section with heading, subheading, video, image, CTA
- Repeatable sections array (add/remove/reorder via drag-and-drop)
- Section types: text_image, full_text, gallery, video, services, team, clients
- Each section has bilingual heading and content
- SEO fields per language

**Client Can**:
- Change all text on any page
- Upload/replace any image
- Add new sections to any page
- Remove sections from any page
- Reorder sections via drag-and-drop
- Change page layout without code

### Media Collection
**Purpose**: Centralized media library for ALL images

**Key Features**:
- Auto-converts to WebP format
- Generates multiple sizes (thumbnail, card, hero)
- 10MB file size limit
- Required alt text for accessibility
- Caption field optional

**Client Can**:
- Upload images through CMS
- Replace images (updates everywhere automatically)
- Add alt text for SEO and accessibility
- Organize media library

### Settings Global
**Purpose**: Site-wide settings

**Key Features**:
- Contact information (email, phone, address in both languages)
- Social media links (Facebook, Instagram, Twitter, LinkedIn, YouTube)
- Footer text (bilingual)
- Logo upload
- Favicon upload

**Client Can**:
- Update contact info
- Change social media links
- Edit footer text
- Replace logo
- Update favicon

## Data Flow

### Page Request Flow
1. **Request** → Next.js App Router matches route
2. **Language** → Extract language from `[lang]` parameter
3. **Data Fetching** → Server component fetches from Payload CMS
4. **Language Selection** → `getBilingualField()` extracts correct language
5. **Rendering** → Server-side rendering with bilingual content from CMS
6. **Hydration** → Client-side animations initialize via GSAP
7. **Interactions** → Form submissions go through API routes

### Content Update Flow
1. **CMS Edit** → Admin edits content in Payload at `/admin`
2. **Save** → Content saved to MongoDB
3. **Revalidation** → ISR revalidates page (if configured)
4. **Cache Clear** → Payload cache cleared
5. **Frontend** → Updated content appears on next request (or immediately with ISR)

## Best Practices

### Component Design
- **Single Responsibility**: One component, one purpose
- **Props Interface**: TypeScript interfaces for all props
- **No Hardcoded Content**: All content via props from CMS
- **Presentational**: Components render, don't fetch data
- **Reusable**: Design for reuse across pages

### CMS Schema Design
- **Bilingual Fields**: Every text field has `_en` and `_ar`
- **Required Alt Text**: All image uploads require alt text
- **Flexible Sections**: Use arrays for repeatable content
- **Clear Labels**: Admin-friendly field labels and descriptions
- **Validation**: Required fields, max lengths, allowed values

### Performance Optimization
- **Images**: Next.js Image component with lazy loading
- **Videos**: Lazy load with IntersectionObserver
- **Fonts**: Preload critical fonts
- **Code**: Dynamic imports for heavy components
- **Caching**: Leverage Next.js caching strategies

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA**: Only when semantic HTML insufficient
- **Keyboard**: All interactions keyboard accessible
- **Focus**: Visible focus indicators
- **Alt Text**: Required for all images in CMS
- **Color**: Don't rely on color alone

## Summary: The Golden Rule

**Every piece of content and every image on the website MUST be editable from the CMS.**

If a client asks "Can I change this text/image?", the answer must ALWAYS be "Yes, in the CMS."

No exceptions.
