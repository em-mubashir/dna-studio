---
inclusion: auto
---

# DNA Media - Technical Stack

## 🚨 CRITICAL REQUIREMENT: CMS-First Architecture

**ALL content and images MUST be managed through Payload CMS - NO hardcoded content allowed.**

### CMS-First Principles:
1. **Every page** uses the Pages collection for content
2. **Every image** uploaded through Media collection
3. **Every text field** stored with `_en` and `_ar` variants
4. **Components are presentational** - receive data via props
5. **Pages are data fetchers** - server components fetch from Payload

### What Must Be CMS-Editable:
- ✅ All headings, paragraphs, button text
- ✅ All images (hero, sections, team, portfolio, logos)
- ✅ All videos (Vimeo IDs stored in CMS)
- ✅ Page layouts (add/remove/reorder sections)
- ✅ Navigation menu items
- ✅ Footer content
- ✅ Contact information
- ✅ Social media links
- ✅ SEO meta tags

## Core Technologies

- **Framework**: Next.js 14 (App Router) with TypeScript
- **CMS**: Payload CMS 2.x (self-hosted, TypeScript-native)
- **Database**: MongoDB (hosted on Railway)
- **Styling**: Tailwind CSS + CSS Modules + @tailwindcss/typography
- **Animations**: GSAP 3.x (ScrollTrigger, ScrollSmoother, ScrollToPlugin)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API for contact form submissions
- **Video Hosting**: Vimeo Pro
- **Hosting**: Railway (all-in-one: app + database)

## Production Dependencies

### Security
- **@upstash/ratelimit**: Rate limiting for API routes (10 req/10s)
- **@upstash/redis**: Redis backend for rate limiting
- **isomorphic-dompurify**: Input sanitization for user-submitted content

### Monitoring & Analytics
- **@sentry/nextjs**: Error tracking and performance monitoring
- **@vercel/analytics**: Web analytics
- **@vercel/speed-insights**: Real-time performance insights

### Accessibility
- **focus-trap-react**: Focus management for modals and overlays

### Image Optimization
- **sharp**: High-performance image processing (WebP conversion)

## Project Structure

```
dna-media-website/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── [lang]/            # Dynamic language routes (en, ar)
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── portfolio/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   ├── admin/             # Payload admin panel
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── animations/        # GSAP animation components
│   │   ├── layout/            # Header, Footer, Navigation
│   │   └── ui/                # Reusable UI components
│   ├── payload/
│   │   ├── collections/       # Payload schemas (Pages, Blog, Portfolio, etc.)
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

## Common Commands

### Development
```bash
npm run dev                    # Start dev server (http://localhost:3000)
npm run build                  # Build for production
npm run start                  # Start production server
npm run generate:types         # Generate Payload TypeScript types
```

### Deployment (Railway)
```bash
railway link                   # Link to Railway project
railway up                     # Deploy to Railway
railway logs                   # View deployment logs
railway variables              # Manage environment variables
railway connect MongoDB        # Connect to Railway MongoDB
```

### Code Quality
```bash
npm run lint                   # Run ESLint
npm run type-check            # Run TypeScript checks
```

## Environment Variables

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

## Key Technical Decisions

### Why Next.js over WordPress?
- Superior animation performance with GSAP
- Better page speed (90-100 Lighthouse vs 60-80)
- Full SEO control without plugins
- Enhanced security (no WordPress vulnerabilities)
- Optimized video performance
- Minimal maintenance requirements

### Why Payload CMS?
- 100% free and open-source
- TypeScript-native (matches Next.js)
- Self-hosted (no vendor lock-in)
- Runs on same server as Next.js
- Perfect for bilingual content management
- Unlimited users and content

### Why Railway?
- All-in-one platform (app + MongoDB in single dashboard)
- Simple deployment from GitHub
- Automatic SSL certificates
- Built-in monitoring and logs
- Cost-effective ($15-20/month total)

## Performance Targets

| Metric | Target | Implementation |
|--------|--------|----------------|
| Lighthouse Performance | 90+ | Static generation, optimized assets, code splitting |
| Lighthouse Accessibility | 95+ | WCAG AA compliance, ARIA labels, keyboard navigation |
| Lighthouse SEO | 95+ | Structured data, meta tags, sitemap, robots.txt |
| Lighthouse Best Practices | 90+ | Security headers, HTTPS, no console errors |
| First Contentful Paint | < 1.5s | Critical CSS, font preloading, resource hints |
| Largest Contentful Paint | < 2.5s | Optimized hero video, lazy loading, WebP images |
| Cumulative Layout Shift | < 0.1 | Reserved space for media, no layout jumps |
| Time to Interactive | < 3.5s | Code splitting, deferred JS, minimal blocking |
| Total Blocking Time | < 300ms | Optimized JavaScript execution |

## Security Implementation

### Rate Limiting
- **Middleware**: `src/middleware.ts` with Upstash Redis
- **Limit**: 10 requests per 10 seconds per IP
- **Scope**: All `/api/*` routes, especially contact form
- **Response**: 429 Too Many Requests on limit exceeded

### Security Headers (next.config.js)
- **Content-Security-Policy**: Restricts resource loading
- **Strict-Transport-Security**: Forces HTTPS (HSTS)
- **X-Frame-Options**: Prevents clickjacking (SAMEORIGIN)
- **X-Content-Type-Options**: Prevents MIME sniffing (nosniff)
- **X-XSS-Protection**: XSS filter enabled
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### Input Sanitization
- **Library**: isomorphic-dompurify
- **Location**: `src/lib/utils/sanitize.ts`
- **Usage**: All user inputs (contact form, search queries)
- **Methods**: 
  - `sanitizeInput()`: Strips all HTML tags
  - `sanitizeHTML()`: Allows safe HTML tags only

## SEO Implementation

### Structured Data (JSON-LD)
- **Organization**: Site-wide in root layout
- **BlogPosting**: Individual blog posts
- **VideoObject**: Portfolio project videos
- **BreadcrumbList**: Navigation breadcrumbs (optional)

### Meta Tags
- **Title**: Unique per page, 50-60 characters
- **Description**: Unique per page, 150-160 characters
- **Open Graph**: Images (1200x630), title, description, URL
- **Twitter Cards**: summary_large_image with metadata
- **Canonical URLs**: Prevent duplicate content
- **hreflang**: Language alternates (en, ar)

### Dynamic Generation
- **Sitemap**: `src/app/sitemap.ts` - all pages, blog posts, portfolio
- **robots.txt**: `src/app/robots.ts` - allow all, disallow /admin, /api

## Accessibility Features

### WCAG AA Compliance
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements accessible via Tab
- **Focus Indicators**: Visible focus rings on all focusable elements
- **ARIA Labels**: Descriptive labels for screen readers
- **Alt Text**: Required for all images in CMS
- **Semantic HTML**: Proper heading hierarchy, landmarks

### Assistive Technology Support
- **Skip to Content**: Jump to main content link
- **Focus Trap**: Modals trap focus within dialog
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Screen Readers**: Tested with NVDA/JAWS compatibility
- **Form Labels**: All inputs properly labeled and associated

## Monitoring & Analytics

### Error Tracking (Sentry)
- **Setup**: `src/lib/sentry.ts`
- **Scope**: Client-side and server-side errors
- **Privacy**: Filters sensitive data (cookies, headers)
- **Environment**: Separate tracking for dev/staging/production

### Custom Events (Google Analytics)
- **Setup**: `src/lib/analytics.ts`
- **Events Tracked**:
  - `video_play`: Portfolio video interactions
  - `form_submit`: Contact form submissions
  - `language_switch`: Language toggle usage
  - `search`: Blog search queries
  - `social_share`: Social sharing button clicks

### Health Monitoring
- **Endpoint**: `/api/health`
- **Checks**: Database connection, CMS availability
- **Response**: JSON with status, timestamp, service health
- **Usage**: Uptime monitoring services (UptimeRobot, Pingdom)

## Animation Strategy

### GSAP Implementation
- **Core Library**: GSAP 3.x for all animations
- **Plugins Used**:
  - ScrollTrigger: Scroll-based animations
  - ScrollSmoother: Smooth scrolling experience
  - ScrollToPlugin: Programmatic scrolling (back to top)
- **Loading Strategy**: Lazy load plugins when needed
- **Performance**: 60fps target for all animations
- **Accessibility**: Respect `prefers-reduced-motion` media query

### Animation Patterns
- **Hero Animations**: Text reveal, video fade-in, parallax effects
- **Scroll Reveals**: Stagger animations for cards and grids
- **Hover Effects**: Smooth transitions on portfolio items
- **Page Transitions**: Fade in/out between route changes
- **Micro-interactions**: Button hovers, form focus states

### Reduced Motion Support
- **Detection**: `window.matchMedia('(prefers-reduced-motion: reduce)')`
- **Fallback**: Instant state changes instead of animations
- **Implementation**: `src/lib/gsap/animations.ts` - `shouldReduceMotion()`
- **Scope**: All GSAP animations check before executing

## Image & Video Optimization

### Image Processing (Payload CMS)
- **Formats**: Auto-convert to WebP with fallback
- **Sizes Generated**:
  - Thumbnail: 400×300 (quality 80%)
  - Card: 768×1024 (quality 85%)
  - Hero: 1920×1080 (quality 90%)
- **File Size Limit**: 10MB maximum upload
- **Alt Text**: Required field for accessibility
- **Lazy Loading**: Automatic via Next.js Image component

### Video Strategy
| Video Type | Solution | Loading | Max Size |
|------------|----------|---------|----------|
| Hero Background | Vimeo embed with background=1 | Eager | N/A |
| Portfolio Videos | Vimeo Pro embeds | Lazy (IntersectionObserver) | N/A |
| Thumbnails | WebP via Next.js Image | Lazy loading | 1MB |
| Fallback | Poster images | Immediate | 200KB |

### Resource Hints
- **Preconnect**: Vimeo domains (`player.vimeo.com`, `i.vimeocdn.com`)
- **DNS Prefetch**: Google Analytics
- **Preload**: Critical fonts (Inter, Cairo)

## Database & Caching

### MongoDB Configuration
- **Hosting**: Railway (auto-provisioned)
- **Connection**: Mongoose via Payload
- **Indexes**: Auto-created by Payload for performance
- **Backup Strategy**: 
  - Daily automated (Railway feature)
  - Weekly manual before major updates
  - Pre-deployment mandatory backup

### Caching Strategy
- **Payload Client**: Singleton pattern with caching
- **Static Generation**: Pages cached at build time
- **Revalidation**: ISR with 1-hour revalidation for blog/portfolio
- **API Routes**: No caching (dynamic data)

## Deployment Architecture

### Railway Configuration
```
Railway Project: dna-media
├── Service: dna-media-app
│   ├── Type: Web Service
│   ├── Build: npm run build
│   ├── Start: npm start
│   ├── Port: 3000
│   └── Environment: Node.js 20
└── Service: MongoDB
    ├── Type: Database
    ├── Version: 6.0
    └── Storage: 1GB (expandable)
```

### Build Process
1. Install dependencies (`npm install`)
2. Generate Payload types (`npm run generate:types`)
3. Build Next.js app (`npm run build`)
4. Start production server (`npm start`)

### Environment Separation
- **Development**: Local MongoDB, `.env.local`
- **Production**: Railway MongoDB, dashboard environment variables
- **Staging**: Optional separate Railway project

## Testing Strategy

### Manual Testing (Required)
- **Browser Testing**: Chrome, Safari, Firefox, Edge, Mobile browsers
- **Device Testing**: Desktop, tablet, mobile (various sizes)
- **RTL Testing**: Arabic language layout and text flow
- **Accessibility Testing**: Keyboard navigation, screen readers
- **Performance Testing**: Lighthouse audits (90+ target)

### Automated Testing (Optional)
- **E2E Tests**: Playwright for critical user flows
- **Accessibility Tests**: @axe-core/playwright for WCAG compliance
- **Visual Regression**: Playwright screenshots comparison
- **Unit Tests**: Jest for utility functions (if needed)

### Testing Checklist Location
See `DNA-Media-Implementation-Plan.md` for comprehensive testing checklists:
- Functionality testing
- RTL testing
- Browser compatibility
- Device responsiveness
- Accessibility compliance
- Performance benchmarks

## Cost Breakdown

### Monthly Operational Costs
- **Railway Hosting**: $15-20/month (app + MongoDB)
- **Vimeo Pro**: $20/month (video hosting)
- **Domain**: ~$15/year ($1.25/month)
- **Resend Email**: $0 (free tier, 3000 emails/month)
- **Upstash Redis**: $0 (free tier, 10K requests/day)
- **Sentry**: $0 (free tier, 5K events/month)

**Total Monthly**: $36-41

### One-Time Costs
- **Development**: $7,500 (7 weeks)
- **Domain Registration**: $15/year
- **SSL Certificate**: $0 (included with Railway)

## Maintenance Requirements

### Weekly Tasks
- Monitor site performance via Lighthouse
- Check error logs in Railway dashboard
- Review contact form submissions
- Update blog content (client requirement)

### Monthly Tasks
- Review analytics data
- Check for broken links
- Update dependencies (`npm outdated`)
- Review and optimize images
- Check MongoDB storage usage

### Quarterly Tasks
- Security audit (`npm audit`)
- Performance optimization review
- Content audit
- SEO performance review
- Dependency major version updates

## Support & Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Payload CMS**: https://payloadcms.com/docs
- **GSAP**: https://greensock.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Railway**: https://docs.railway.app

### Community Support
- **Payload Discord**: https://discord.gg/payload
- **Next.js Discord**: https://nextjs.org/discord
- **GSAP Forums**: https://greensock.com/forums

### Developer Contact
- **Post-Launch Support**: 30 days included
- **Response Time**: 24-48 hours
- **Scope**: Bug fixes, technical issues, CMS training
