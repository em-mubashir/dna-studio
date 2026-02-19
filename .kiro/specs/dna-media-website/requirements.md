# DNA Media Website - Requirements Specification

## Project Overview

**Project Name**: DNA Media Website  
**Client**: DNA Media (Saudi Arabia)  
**Project Type**: Enterprise-grade bilingual website with CMS  
**Languages**: English + Arabic (RTL support)  
**Timeline**: 7 weeks  

## 🎯 Core Objectives

1. **100% CMS-Editable Content**: Every piece of text and image must be manageable through Payload CMS
2. **Bilingual Excellence**: Seamless English/Arabic experience with proper RTL support
3. **Premium Animations**: Smooth 60fps GSAP animations throughout
4. **Production-Ready**: Enterprise-grade security, SEO, accessibility, and performance
5. **Video-First Design**: Showcase DNA Media's video production portfolio

## 📋 Functional Requirements

### FR-1: Pages (5 × 2 Languages = 10 Pages)

#### FR-1.1: Homepage
**User Story**: As a visitor, I want to see DNA Media's capabilities immediately through an engaging hero video and featured work.

**Acceptance Criteria**:
- [ ] Hero section with background video (Vimeo)
- [ ] Hero heading, subheading, and CTA button (all CMS-editable)
- [ ] Services showcase section (grid of services from CMS)
- [ ] Featured portfolio items (6 projects from CMS)
- [ ] Client logos carousel with auto-scroll animation
- [ ] All content editable in both English and Arabic
- [ ] Smooth GSAP scroll animations
- [ ] Mobile responsive design

**CMS Requirements**:
- Hero section: heading_en, heading_ar, subheading_en, subheading_ar, background_video (Vimeo ID), background_image, cta_text_en, cta_text_ar, cta_link
- Repeatable sections array for flexible content
- Services fetched from Services collection
- Portfolio items fetched from Portfolio collection (featured flag)
- Client logos fetched from Clients collection (name, logo, website, order)

#### FR-1.2: About Page
**User Story**: As a potential client, I want to learn about DNA Media's story, team, and achievements.

**Acceptance Criteria**:
- [ ] Company story section (rich text, CMS-editable)
- [ ] Mission and vision statements
- [ ] Team member grid with photos, names, positions, bios
- [ ] Company timeline with milestones and awards
- [ ] Awards and achievements section with counter animations
- [ ] All content in both languages
- [ ] Stagger animations for team grid
- [ ] Timeline scroll progress animation

**CMS Requirements**:
- Page content from Pages collection (slug: 'about')
- Team members from Team collection (name, position_en, position_ar, bio_en, bio_ar, photo, linkedin, order)
- Timeline from Timeline collection (year, title_en, title_ar, description_en, description_ar, type: milestone/award)
- Counter animations for statistics/awards

#### FR-1.3: Portfolio Page
**User Story**: As a visitor, I want to browse DNA Media's video projects by category and view them in a lightbox.

**Acceptance Criteria**:
- [ ] Filterable grid by category (Commercial, Corporate, Documentary, Animation, Event)
- [ ] Project cards with thumbnail, title, client name
- [ ] Hover effects with GSAP animations (image scale + overlay fade-in)
- [ ] Click to open video lightbox (Vimeo player)
- [ ] Individual project pages with full details
- [ ] Category filter works in both languages
- [ ] Lazy loading for video thumbnails
- [ ] VideoObject structured data for SEO

**CMS Requirements**:
- Portfolio collection: title_en, title_ar, slug, client, description_en, description_ar, category, video_url (Vimeo), thumbnail, featured, order, completedDate
- VideoObject structured data for SEO

#### FR-1.4: Blog Page
**User Story**: As a reader, I want to find and read DNA Media's blog posts with search and filtering.

**Acceptance Criteria**:
- [ ] Blog listing with pagination (12 posts per page)
- [ ] Category filter
- [ ] Search functionality (searches title, excerpt, content)
- [ ] Individual blog post pages with rich text content
- [ ] Related posts section (3 posts from same category)
- [ ] Social sharing buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- [ ] Author information and publish date
- [ ] SEO-optimized with BlogPosting structured data
- [ ] Toast notification on successful search

**CMS Requirements**:
- Blog collection: title_en, title_ar, slug, excerpt_en, excerpt_ar, content_en, content_ar, featured_image, category, tags_en, tags_ar, author, publishedDate, status
- BlogPosting structured data for SEO
- Search API endpoint (`/api/blog/search`)
- Related posts component

#### FR-1.5: Contact Page
**User Story**: As a potential client, I want to easily contact DNA Media through a form or see their location.

**Acceptance Criteria**:
- [ ] Contact form with validation (name, email, phone, message)
- [ ] Form submission sends email via Resend API
- [ ] Success/error toast notifications
- [ ] Contact information display (email, phone, address)
- [ ] Google Maps embed showing location
- [ ] Social media links
- [ ] Rate limiting protection (10 requests per 10 seconds)
- [ ] Input sanitization for security

**CMS Requirements**:
- Page content from Pages collection (slug: 'contact')
- Contact info from Settings global (email, phone, address_en, address_ar)
- Social links from Settings global (facebook, instagram, twitter, linkedin, youtube)

### FR-2: CMS Capabilities

#### FR-2.1: Content Management
**User Story**: As a content editor, I want to edit all website content without touching code.

**Acceptance Criteria**:
- [ ] All text content editable (headings, paragraphs, buttons)
- [ ] All images uploadable and replaceable
- [ ] All videos manageable (Vimeo IDs)
- [ ] Page sections add/remove/reorder via drag-and-drop
- [ ] Blog posts create/edit/delete with rich text editor
- [ ] Portfolio projects create/edit/delete
- [ ] Team members create/edit/delete
- [ ] Services create/edit/delete
- [ ] Client logos create/edit/delete
- [ ] Timeline milestones/awards create/edit/delete
- [ ] Site settings (contact info, social links, logo, favicon)
- [ ] SEO meta tags per page

**Collections Required**:
1. **Pages** - Flexible page builder for all static pages
2. **Blog** - Posts with bilingual content
3. **Portfolio** - Video projects
4. **Services** - Service offerings
5. **Team** - Team member profiles
6. **Clients** - Client logos for homepage carousel
7. **Timeline** - Company milestones and awards
8. **Media** - Centralized media library with WebP conversion
9. **Users** - Admin and editor roles
10. **Settings** (Global) - Site-wide settings

#### FR-2.2: User Roles
**User Story**: As an admin, I want to control who can edit what content.

**Acceptance Criteria**:
- [ ] Admin role: Full access to all collections and settings
- [ ] Editor role: Can edit content but not delete or manage users
- [ ] Authentication required for CMS access
- [ ] User management interface

### FR-3: Bilingual Support

#### FR-3.1: Language Routing
**User Story**: As a visitor, I want to view the website in my preferred language.

**Acceptance Criteria**:
- [ ] URL structure: `/en/*` and `/ar/*`
- [ ] Language switcher in header
- [ ] Automatic language detection from URL
- [ ] hreflang tags for SEO
- [ ] Language-specific metadata

#### FR-3.2: RTL Support
**User Story**: As an Arabic speaker, I want proper right-to-left layout.

**Acceptance Criteria**:
- [ ] `dir="rtl"` attribute on HTML tag for Arabic
- [ ] Text flows right-to-left
- [ ] Navigation aligns to the right
- [ ] Forms display correctly in RTL
- [ ] Animations work in RTL mode
- [ ] Images and videos position correctly

#### FR-3.3: Bilingual Content Fields
**User Story**: As a content editor, I want to manage content in both languages easily.

**Acceptance Criteria**:
- [ ] All text fields have `_en` and `_ar` variants
- [ ] Both languages required for publishing
- [ ] Helper function `getBilingualField()` for easy access
- [ ] Preview available for both languages

### FR-4: Animations (GSAP)

#### FR-4.1: Hero Animations
**Acceptance Criteria**:
- [ ] Hero video fade-in animation
- [ ] Text reveal animation (heading and subheading)
- [ ] Parallax effect on scroll
- [ ] CTA button entrance animation

#### FR-4.2: Scroll Animations
**Acceptance Criteria**:
- [ ] Scroll-triggered animations using ScrollTrigger
- [ ] Stagger animations for grids (portfolio, services, team)
- [ ] Fade-in and slide-up effects
- [ ] Smooth scrolling with ScrollSmoother
- [ ] Timeline scroll progress animation

#### FR-4.3: Hover Effects
**Acceptance Criteria**:
- [ ] Portfolio card hover: image scale + overlay fade-in
- [ ] Button hover: color transition
- [ ] Service card hover: lift effect

#### FR-4.4: Page Transitions
**Acceptance Criteria**:
- [ ] Smooth fade-in when navigating between pages
- [ ] No animation jank or stuttering
- [ ] 60fps target for all animations

#### FR-4.5: Special Animations
**Acceptance Criteria**:
- [ ] Counter animations for awards/statistics section
- [ ] Client logo carousel auto-scroll animation
- [ ] Timeline scroll progress indicator

#### FR-4.6: Accessibility
**Acceptance Criteria**:
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Disable or simplify animations for users who prefer reduced motion
- [ ] No essential information conveyed through animation alone

### FR-5: User Experience Enhancements

#### FR-5.1: Toast Notifications
**User Story**: As a user, I want visual feedback for my actions.

**Acceptance Criteria**:
- [ ] Toast notification system (success, error, info)
- [ ] Auto-dismiss after 5 seconds
- [ ] Fixed position (bottom-right)
- [ ] Stacked notifications
- [ ] Used for: form submissions, search results, errors

#### FR-5.2: Back to Top Button
**User Story**: As a user, I want to quickly return to the top of long pages.

**Acceptance Criteria**:
- [ ] Button appears after scrolling 500px
- [ ] Smooth scroll animation using GSAP ScrollToPlugin
- [ ] Fixed position (bottom-right)
- [ ] Bilingual aria-label
- [ ] Visible on all pages

#### FR-5.3: Blog Search
**User Story**: As a reader, I want to search blog posts.

**Acceptance Criteria**:
- [ ] Search input in blog listing page
- [ ] Searches title, excerpt, and content
- [ ] Language-specific search (searches only current language fields)
- [ ] API endpoint: `/api/blog/search`
- [ ] Returns up to 10 results
- [ ] Toast notification for no results

#### FR-5.4: Related Posts
**User Story**: As a reader, I want to discover similar content.

**Acceptance Criteria**:
- [ ] Shows 3 related posts from same category
- [ ] Excludes current post
- [ ] Sorted by publish date (newest first)
- [ ] Displays at bottom of blog post
- [ ] Hidden if no related posts found

#### FR-5.5: Social Sharing
**User Story**: As a reader, I want to share blog posts on social media.

**Acceptance Criteria**:
- [ ] Share buttons: Facebook, Twitter, LinkedIn, WhatsApp
- [ ] Opens in new window
- [ ] Includes post title and URL
- [ ] Bilingual labels
- [ ] Accessible (aria-labels)

## � Non-Functional Requirements

### NFR-1: Security

#### NFR-1.1: Rate Limiting
**Acceptance Criteria**:
- [ ] API routes protected with rate limiting (10 requests per 10 seconds)
- [ ] Upstash Redis for distributed rate limiting
- [ ] 429 status code returned when limit exceeded
- [ ] Middleware: `src/middleware.ts`

#### NFR-1.2: Security Headers
**Acceptance Criteria**:
- [ ] Content-Security-Policy header configured
- [ ] Strict-Transport-Security (HSTS) enabled
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection enabled
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy configured
- [ ] Configured in `next.config.js`

#### NFR-1.3: Input Sanitization
**Acceptance Criteria**:
- [ ] All user inputs sanitized with DOMPurify
- [ ] Contact form inputs sanitized before email sending
- [ ] Search queries sanitized
- [ ] No XSS vulnerabilities
- [ ] Utility: `src/lib/utils/sanitize.ts`

#### NFR-1.4: Environment Security
**Acceptance Criteria**:
- [ ] All secrets in environment variables
- [ ] No sensitive data in code or logs
- [ ] HTTPS enforced
- [ ] Sentry filters sensitive data from error reports

### NFR-2: SEO

#### NFR-2.1: Meta Tags
**Acceptance Criteria**:
- [ ] Unique title tags per page (50-60 characters)
- [ ] Unique meta descriptions per page (150-160 characters)
- [ ] Open Graph tags with images (1200×630)
- [ ] Twitter Card tags
- [ ] Canonical URLs on all pages
- [ ] hreflang tags for language alternates

#### NFR-2.2: Structured Data
**Acceptance Criteria**:
- [ ] Organization schema on all pages
- [ ] BlogPosting schema on blog posts
- [ ] VideoObject schema on portfolio items
- [ ] Valid JSON-LD format
- [ ] Validates with Google's Rich Results Test

#### NFR-2.3: Sitemap & Robots
**Acceptance Criteria**:
- [ ] Dynamic XML sitemap generation (`src/app/sitemap.ts`)
- [ ] robots.txt with proper rules (`src/app/robots.ts`)
- [ ] Sitemap includes all pages, blog posts, portfolio items
- [ ] Sitemap submitted to Google Search Console
- [ ] Disallows /admin and /api routes

#### NFR-2.4: Performance for SEO
**Acceptance Criteria**:
- [ ] Lighthouse SEO score: 95+
- [ ] All images have alt text (required in CMS)
- [ ] Semantic HTML structure
- [ ] Mobile-friendly design

### NFR-3: Accessibility (WCAG AA)

#### NFR-3.1: Keyboard Navigation
**Acceptance Criteria**:
- [ ] All interactive elements accessible via Tab key
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Skip to content link (`src/components/layout/SkipToContent.tsx`)

#### NFR-3.2: Screen Reader Support
**Acceptance Criteria**:
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML (nav, main, article, etc.)
- [ ] Alt text required for all images in CMS
- [ ] Form labels properly associated
- [ ] Error messages accessible

#### NFR-3.3: Color Contrast
**Acceptance Criteria**:
- [ ] Text contrast ratio: 4.5:1 minimum (WCAG AA)
- [ ] Large text contrast ratio: 3:1 minimum
- [ ] Don't rely on color alone to convey information

#### NFR-3.4: Focus Management
**Acceptance Criteria**:
- [ ] Modals trap focus within dialog
- [ ] Focus returns to trigger element when modal closes
- [ ] Focus-trap-react library used (`src/components/ui/Modal.tsx`)

### NFR-4: Performance

#### NFR-4.1: Lighthouse Scores
**Acceptance Criteria**:
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 90+
- [ ] SEO: 95+

#### NFR-4.2: Core Web Vitals
**Acceptance Criteria**:
- [ ] First Contentful Paint (FCP): < 1.5s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Time to Interactive (TTI): < 3.5s
- [ ] Total Blocking Time (TBT): < 300ms

#### NFR-4.3: Image Optimization
**Acceptance Criteria**:
- [ ] Images converted to WebP format
- [ ] Multiple sizes generated (thumbnail: 400×300, card: 768×1024, hero: 1920×1080)
- [ ] Lazy loading for all images
- [ ] Next.js Image component used
- [ ] 10MB file size limit in CMS
- [ ] Auto-generated alt text if missing

#### NFR-4.4: Video Optimization
**Acceptance Criteria**:
- [ ] Videos hosted on Vimeo Pro
- [ ] Lazy loading for portfolio videos (`src/components/video/LazyVideo.tsx`)
- [ ] Poster images for video thumbnails
- [ ] IntersectionObserver for lazy loading
- [ ] 200px rootMargin for early loading

#### NFR-4.5: Code Optimization
**Acceptance Criteria**:
- [ ] Code splitting via Next.js
- [ ] Dynamic imports for heavy components
- [ ] GSAP plugins loaded only when needed
- [ ] Static generation where possible
- [ ] ISR for dynamic content (1-hour revalidation)
- [ ] Payload client caching (`src/lib/payload.ts`)

#### NFR-4.6: Resource Hints
**Acceptance Criteria**:
- [ ] Preconnect to Vimeo domains
- [ ] DNS prefetch for Google Analytics
- [ ] Preload critical fonts (Inter, Cairo)
- [ ] Configured in root layout

### NFR-5: Browser & Device Compatibility

#### NFR-5.1: Browser Support
**Acceptance Criteria**:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### NFR-5.2: Device Support
**Acceptance Criteria**:
- [ ] Desktop (1920×1080)
- [ ] Laptop (1366×768)
- [ ] Tablet (768×1024)
- [ ] Mobile (375×667)
- [ ] Large Mobile (414×896)

#### NFR-5.3: Responsive Design
**Acceptance Criteria**:
- [ ] Mobile-first approach
- [ ] Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- [ ] Touch-friendly tap targets (44×44px minimum)
- [ ] No horizontal scrolling

### NFR-6: Monitoring & Analytics

#### NFR-6.1: Error Tracking
**Acceptance Criteria**:
- [ ] Sentry integration for error tracking (`src/lib/sentry.ts`)
- [ ] Client-side and server-side errors captured
- [ ] Sensitive data filtered from error reports
- [ ] Environment-specific tracking (dev/staging/production)

#### NFR-6.2: Analytics
**Acceptance Criteria**:
- [ ] Google Analytics 4 integration
- [ ] Custom event tracking (`src/lib/analytics.ts`):
  - video_play (portfolio video interactions)
  - form_submit (contact form submissions)
  - language_switch (language toggle usage)
  - search (blog search queries)
  - social_share (social sharing button clicks)
- [ ] Page view tracking
- [ ] User flow analysis

#### NFR-6.3: Health Monitoring
**Acceptance Criteria**:
- [ ] Health check endpoint (`/api/health`)
- [ ] Database connection check
- [ ] CMS availability check
- [ ] JSON response with status and timestamp
- [ ] 503 status code on unhealthy

## 🚨 Critical Constraints

### CONSTRAINT-1: 100% CMS-Editable Content
**Rule**: NO hardcoded content in components. ALL text and images must come from CMS.

**Enforcement**:
- Components are presentational only (receive data via props)
- Pages fetch data from Payload CMS
- No images directly from `/public` folder in components
- All text stored in bilingual fields

**Examples**:
- ❌ WRONG: `<h1>Welcome to DNA Media</h1>`
- ✅ CORRECT: `<h1>{heading}</h1>` (where heading comes from CMS)

### CONSTRAINT-2: Bilingual First
**Rule**: Every text field must have English and Arabic variants.

**Enforcement**:
- Field naming: `fieldname_en` and `fieldname_ar`
- Both languages required for publishing
- Helper function `getBilingualField()` for access

### CONSTRAINT-3: Performance Budget
**Rule**: Must meet performance targets.

**Enforcement**:
- Lighthouse audits before deployment
- Performance budget JSON file (`performance-budget.json`)
- Automated checks in CI/CD (optional)

### CONSTRAINT-4: Accessibility Compliance
**Rule**: Must meet WCAG AA standards.

**Enforcement**:
- Manual testing with keyboard and screen reader
- Automated testing with @axe-core/playwright (optional)
- Color contrast validation

## 📦 Technical Stack

### Core Technologies
- **Framework**: Next.js 14 (App Router) with TypeScript
- **CMS**: Payload CMS 2.x (self-hosted)
- **Database**: MongoDB (Railway)
- **Styling**: Tailwind CSS + CSS Modules + @tailwindcss/typography
- **Animations**: GSAP 3.x (ScrollTrigger, ScrollSmoother, ScrollToPlugin)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **Video**: Vimeo Pro
- **Hosting**: Railway

### Security & Monitoring
- **Rate Limiting**: Upstash Redis + @upstash/ratelimit
- **Sanitization**: isomorphic-dompurify
- **Error Tracking**: @sentry/nextjs
- **Analytics**: Google Analytics 4
- **Performance**: @vercel/analytics, @vercel/speed-insights

### Accessibility
- **Focus Management**: focus-trap-react

### Image Processing
- **Optimization**: sharp (WebP conversion)

## 🗂️ Project Structure

```
dna-media-website/
├── src/
│   ├── app/
│   │   ├── [lang]/              # Language routing
│   │   │   ├── layout.tsx       # Root layout with fonts, providers
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/page.tsx   # About page
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx     # Portfolio listing
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx     # Blog listing
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── contact/page.tsx # Contact page
│   │   │   ├── not-found.tsx    # 404 page
│   │   │   └── error.tsx        # Error boundary
│   │   ├── admin/               # Payload CMS
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── blog/search/route.ts
│   │   │   ├── health/route.ts
│   │   │   └── [...payload]/route.ts
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic sitemap
│   ├── components/
│   │   ├── animations/
│   │   │   ├── PageTransition.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PortfolioGrid.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   └── TeamGrid.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogContent.tsx
│   │   │   ├── BlogPostSchema.tsx
│   │   │   └── RelatedPosts.tsx
│   │   ├── portfolio/
│   │   │   ├── PortfolioCard.tsx
│   │   │   ├── VideoModal.tsx
│   │   │   └── VideoSchema.tsx
│   │   ├── video/
│   │   │   └── LazyVideo.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       ├── BackToTop.tsx
│   │       └── SocialShare.tsx
│   ├── payload/
│   │   ├── collections/
│   │   │   ├── Pages.ts
│   │   │   ├── Blog.ts
│   │   │   ├── Portfolio.ts
│   │   │   ├── Services.ts
│   │   │   ├── Team.ts
│   │   │   ├── Clients.ts
│   │   │   ├── Timeline.ts
│   │   │   ├── Media.ts
│   │   │   └── Users.ts
│   │   ├── globals/
│   │   │   └── Settings.ts
│   │   └── payload.config.ts
│   ├── lib/
│   │   ├── gsap/
│   │   │   ├── index.ts
│   │   │   ├── animations.ts
│   │   │   └── GSAPProvider.tsx
│   │   ├── utils/
│   │   │   ├── language.ts
│   │   │   ├── sanitize.ts
│   │   │   ├── date.ts
│   │   │   └── validation.ts
│   │   ├── payload.ts
│   │   ├── analytics.ts
│   │   └── sentry.ts
│   └── middleware.ts            # Rate limiting
├── public/
│   └── fonts/                   # Font files only
├── .env.local
├── next.config.js               # With security headers
├── tailwind.config.ts           # With RTL support
├── performance-budget.json
└── package.json
```

## 📅 Implementation Timeline

### Week 1: Project Setup & CMS Configuration
- Day 1-2: Initialize Next.js project, install dependencies
- Day 2-3: Configure Payload CMS
- Day 3-4: Create all Payload collections (Pages, Blog, Portfolio, Services, Team, Clients, Timeline, Media, Users, Settings)
- Day 4-5: Environment setup, test CMS

### Week 2: Frontend Foundation & Bilingual Setup
- Day 6-7: Next.js App Router setup, language routing
- Day 7-8: Homepage implementation
- Day 8-9: Blog pages
- Day 9-10: Tailwind RTL configuration

### Week 3: GSAP Animation Implementation
- Day 11-12: GSAP setup, core animations
- Day 12-13: Hero section with video & animations
- Day 13-14: Portfolio grid with scroll animations
- Day 14-15: Page transitions

### Week 4: Components & Features
- Day 16-17: Header & navigation
- Day 18-19: Contact form with validation
- Day 19-20: Contact form API route, About page, Portfolio page

### Week 5: Performance Optimization & SEO
- Day 21-22: Image optimization
- Day 22-23: SEO configuration (metadata, sitemap, robots.txt)
- Day 23-24: Performance optimization (caching, lazy loading)
- Day 24-25: Lighthouse optimization

### Week 6: Testing, Deployment & Launch
- Day 26-27: Railway deployment setup
- Day 27-28: MongoDB setup on Railway
- Day 28-29: Domain configuration
- Day 29-30: Testing & QA

### Week 7: Security, SEO & Performance Enhancements
- Day 31-32: Security implementation (rate limiting, headers, sanitization)
- Day 32-33: Enhanced SEO (robots.txt, 404, error boundary, structured data)
- Day 33-34: Accessibility enhancements (skip link, reduced motion, focus management)
- Day 34-35: Performance optimizations (WebP, lazy loading, resource hints)
- Day 35-36: UX enhancements (toast, back-to-top, search, related posts, social sharing)
- Day 36-37: Monitoring & analytics (Sentry, custom events, health check)

## 💰 Budget Breakdown

- **Monthly Costs**: $36-41
  - Railway hosting: $15-20/month
  - Vimeo Pro: $20/month
  - Domain: $1.25/month
  - Resend, Upstash, Sentry: Free tiers

## ✅ Definition of Done

A feature is considered complete when:

1. **Functionality**: All acceptance criteria met
2. **CMS Integration**: Content editable from CMS (no hardcoded content)
3. **Bilingual**: Works in both English and Arabic with RTL support
4. **Responsive**: Works on all device sizes
5. **Accessible**: Meets WCAG AA standards
6. **Performant**: Meets performance targets
7. **Tested**: Manual testing completed
8. **Documented**: Code comments and CMS usage documented

## 🎯 Success Metrics

- **Lighthouse Performance**: 90+
- **Lighthouse Accessibility**: 95+
- **Lighthouse SEO**: 95+
- **Lighthouse Best Practices**: 90+
- **Page Load Time**: < 2.5s
- **CLS**: < 0.1
- **Zero Critical Security Vulnerabilities**
- **100% CMS-Editable Content**
- **Client Satisfaction**: Approved by DNA Media

## 📚 References

- **Implementation Plan**: `/Users/malik/Desktop/Others/Programs/dna-studio/DNA-Media-Implementation-Plan.md`
- **Steering Documents**: `.kiro/steering/`
  - `product.md` - Product overview and features
  - `tech.md` - Technical stack and architecture
  - `structure.md` - Project structure and conventions

---

**Status**: ✅ Complete - Ready for Implementation  
**Next Step**: Begin Week 1 - Project Setup & CMS Configuration  
**All Items from Implementation Plan**: ✅ Verified and Included
