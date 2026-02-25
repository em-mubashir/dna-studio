# DNA Media Website - Task List

## Project Status: In Progress (Week 1)

**Timeline**: 7 weeks (49 days)  
**Start Date**: TBD  
**Target Launch**: TBD  
**Tech Stack**: Next.js 16.1.6 + Payload CMS 3.77.0 + MongoDB + React 19

---

## Week 1: Project Setup & CMS Configuration (Days 1-7)

### Day 1-2: Initialize Project
- [x] Create Next.js project with TypeScript and Tailwind
- [x] Install Payload CMS v3 and dependencies
- [x] Install GSAP, React Hook Form, Zod
- [x] Install security dependencies (Upstash, DOMPurify)
- [x] Install monitoring tools (Sentry)
- [x] Install accessibility tools (focus-trap-react)
- [x] Set up project structure with route groups ((frontend) and (payload))
- [x] Initialize Git repository
- [x] Create .env.local file

### Day 2-3: Configure Payload CMS
- [x] Create payload.config.ts with buildConfig
- [x] Configure MongoDB adapter (mongooseAdapter)
- [x] Configure withPayload wrapper in next.config.js
- [x] Configure Lexical rich text editor
- [x] Set up admin panel at /admin via (payload) route group
- [x] Configure rate limiting middleware (dynamic import, skips when Redis not configured)
- [x] Test CMS access at /admin
- [x] Verify first-user creation flow works
- [x] Create Users collection with admin/editor roles

### Day 3-4: Create Payload Collections
- [x] Create Pages collection (hero, sections, SEO)
- [x] Create Blog collection (bilingual content)
- [x] Create Portfolio collection (videos, thumbnails)
- [x] Create Services collection
- [x] Create Team collection
- [x] Create Clients collection (for logo carousel)
- [x] Create Timeline collection (milestones/awards)
- [x] Create Media collection (with WebP conversion)
- [x] Create Settings global (contact info, social links)
- [x] Register all collections in payload.config.ts


### Day 4-5: Environment Setup & Testing
- [x] Set up local MongoDB
- [x] Configure environment variables
- [x] Update package.json scripts (dev uses --webpack flag for Payload compatibility)
- [ ] Generate Payload types
- [ ] Test CMS collections
- [x] Create first admin user
- [ ] Add sample content to test collections

---

## Week 2: Frontend Foundation & Bilingual Setup (Days 8-14)

### Day 6-7: Next.js App Router Setup
- [x] Create route group structure ((frontend) and (payload))
- [ ] Create [lang] dynamic route under (frontend)
- [ ] Create root layout with fonts (Inter, Cairo) in (frontend)/layout.tsx
- [ ] Set up language routing (en, ar)
- [ ] Create language utilities (getBilingualField)
- [ ] Add Header component placeholder
- [ ] Add Footer component placeholder
- [ ] Test language switching

### Day 7-8: Homepage Implementation
- [ ] Create homepage (src/app/(frontend)/[lang]/page.tsx)
- [ ] Fetch data from Pages collection
- [ ] Create HeroSection component
- [ ] Create PortfolioGrid component
- [ ] Create ServicesSection component
- [ ] Add metadata generation
- [ ] Test with CMS data

### Day 8-9: Blog Pages
- [ ] Create blog listing page
- [ ] Add pagination logic
- [ ] Add category filtering
- [ ] Create blog post page ([slug])
- [ ] Create BlogCard component
- [ ] Create BlogContent component (rich text)
- [ ] Generate static params for blog posts
- [ ] Test bilingual blog content

### Day 9-10: Tailwind RTL Configuration
- [ ] Fix Tailwind content paths to scan src/ directory
- [ ] Configure Tailwind for RTL support
- [ ] Add RTL utility classes
- [ ] Create globals.css with RTL styles
- [ ] Install @tailwindcss/typography plugin
- [ ] Test RTL layout with Arabic content
- [ ] Fix any RTL layout issues
- [ ] Add font-family switching based on language

---

## Week 3: GSAP Animation Implementation (Days 15-21)

### Day 11-12: GSAP Setup & Core Animations
- [x] Install GSAP and plugins
- [ ] Create GSAPProvider component
- [ ] Register ScrollTrigger plugin
- [ ] Register ScrollSmoother plugin
- [ ] Create animation utilities
- [ ] Add reduced motion detection
- [ ] Test basic animations

### Day 12-13: Hero Section with Video & Animations
- [ ] Implement Vimeo video background
- [ ] Add hero text reveal animation
- [ ] Add video fade-in animation
- [ ] Add parallax scroll effect
- [ ] Add CTA button animation
- [ ] Test on different screen sizes
- [ ] Optimize video loading

### Day 13-14: Portfolio Grid with Scroll Animations
- [ ] Add scroll-triggered animations
- [ ] Implement stagger effect for cards
- [ ] Add hover animations (image scale + overlay)
- [ ] Add filter animation
- [ ] Test animation performance
- [ ] Ensure 60fps target

### Day 14-15: Page Transitions
- [ ] Create PageTransition component
- [ ] Add fade-in animation on route change
- [ ] Test transitions between pages
- [ ] Optimize transition timing
- [ ] Add loading states

---

## Week 4: Components & Features (Days 22-28)

### Day 16-17: Header & Navigation
- [ ] Create Header component
- [ ] Add logo (from CMS Settings)
- [ ] Create Navigation component
- [ ] Add language switcher
- [ ] Add mobile menu (hamburger)
- [ ] Add scroll-based header background
- [ ] Add header entrance animation
- [ ] Test navigation on all pages

### Day 18-19: Contact Form with Validation
- [ ] Create contact page
- [ ] Set up React Hook Form
- [ ] Create Zod validation schema
- [ ] Add form inputs (name, email, phone, message)
- [ ] Add error messages
- [ ] Add loading state
- [ ] Style form for both languages
- [ ] Test form validation

### Day 19-20: Contact Form API & Additional Pages
- [ ] Create /api/contact route
- [ ] Integrate Resend API
- [ ] Add input sanitization
- [ ] Test email sending
- [ ] Create About page
- [ ] Create Portfolio page with filtering
- [ ] Add Google Maps embed to contact page
- [ ] Test all pages

---

## Week 5: Performance Optimization & SEO (Days 29-35)

### Day 21-22: Image Optimization
- [ ] Configure next.config.js for images
- [ ] Replace img tags with Next.js Image
- [ ] Add lazy loading
- [ ] Add blur placeholders
- [ ] Test image loading performance
- [ ] Optimize hero images

### Day 22-23: SEO Configuration
- [ ] Add metadata to root layout
- [ ] Create sitemap.ts (dynamic)
- [ ] Create robots.ts
- [ ] Add JSON-LD structured data (Organization)
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Test with social media debuggers

### Day 23-24: Performance Optimization
- [ ] Create Payload client with caching
- [ ] Add ISR revalidation
- [ ] Optimize GSAP loading (dynamic imports)
- [ ] Add font optimization
- [ ] Test with Lighthouse
- [ ] Fix performance issues

### Day 24-25: Lighthouse Optimization
- [ ] Add Web Vitals tracking
- [ ] Optimize fonts (preload, display swap)
- [ ] Add resource hints (preconnect, dns-prefetch)
- [ ] Run Lighthouse audits
- [ ] Achieve 90+ performance score
- [ ] Document optimization results

---

## Week 6: Testing, Deployment & Launch (Days 36-42)

### Day 26-27: Railway Deployment Setup
- [ ] Install Railway CLI
- [ ] Initialize Railway project
- [ ] Create railway.json config
- [ ] Set up environment variables
- [ ] Test local build
- [ ] Deploy to Railway
- [ ] Verify deployment

### Day 27-28: MongoDB Setup on Railway
- [ ] Add MongoDB service in Railway
- [ ] Copy connection string
- [ ] Update DATABASE_URI in Railway
- [ ] Test database connection
- [ ] Verify CMS works on production
- [ ] Set up database backups

### Day 28-29: Domain Configuration
- [ ] Add custom domain in Railway
- [ ] Update DNS records (CNAME)
- [ ] Wait for SSL certificate
- [ ] Test HTTPS access
- [ ] Update NEXT_PUBLIC_SERVER_URL
- [ ] Test production site

### Day 29-30: Testing & Quality Assurance
- [ ] Test all pages in both languages
- [ ] Test language switcher
- [ ] Test blog functionality
- [ ] Test portfolio filtering
- [ ] Test contact form
- [ ] Test on Chrome, Safari, Firefox, Edge
- [ ] Test on mobile devices
- [ ] Test RTL layout thoroughly
- [ ] Run Lighthouse audits
- [ ] Fix any bugs found

---

## Week 7: Security, SEO & Performance Enhancements (Days 43-49)

### Day 31-32: Security Implementation
- [x] Create rate limiting middleware (dynamic import, graceful fallback)
- [ ] Add security headers to next.config.js
- [ ] Create sanitization utilities
- [ ] Update contact form with sanitization
- [ ] Set up Upstash Redis (production)
- [ ] Test rate limiting
- [ ] Verify security headers

### Day 32-33: Enhanced SEO Implementation
- [ ] Create robots.ts
- [ ] Create 404 page (not-found.tsx)
- [ ] Create error boundary (error.tsx)
- [ ] Add BlogPosting structured data
- [ ] Add VideoObject structured data
- [ ] Enhance blog post metadata
- [ ] Test structured data with Google tools

### Day 33-34: Accessibility Enhancements
- [ ] Create SkipToContent component
- [ ] Add to root layout
- [ ] Implement reduced motion support
- [ ] Update animations with shouldReduceMotion()
- [ ] Create Modal component with focus trap
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify WCAG AA compliance

### Day 34-35: Performance Optimizations
- [ ] Update Media collection for WebP
- [ ] Add resource hints to layout
- [ ] Create LazyVideo component
- [ ] Replace video embeds with LazyVideo
- [ ] Test lazy loading
- [ ] Run performance audits
- [ ] Optimize any bottlenecks

### Day 35-36: User Experience Enhancements
- [ ] Create Toast notification system
- [ ] Add ToastProvider to layout
- [ ] Create BackToTop button
- [ ] Add to layout
- [ ] Create blog search API route
- [ ] Add search to blog page
- [ ] Create RelatedPosts component
- [ ] Create SocialShare component
- [ ] Add to blog posts
- [ ] Test all UX features

### Day 36-37: Monitoring & Analytics
- [ ] Set up Sentry error tracking
- [ ] Create analytics utilities
- [ ] Add custom event tracking
- [ ] Create health check endpoint
- [ ] Test error tracking
- [ ] Set up Google Analytics 4
- [ ] Verify analytics events
- [ ] Document monitoring setup

---

## Post-Launch Tasks

### Content Population
- [ ] Add all 5 pages content (Home, About, Portfolio, Blog, Contact)
- [ ] Upload portfolio videos to Vimeo
- [ ] Create initial blog posts (minimum 5)
- [ ] Add team member information
- [ ] Upload all images
- [ ] Add client logos
- [ ] Add timeline milestones/awards
- [ ] Configure site settings (contact info, social links)

### CMS Setup
- [x] Create admin user account
- [ ] Set up editor accounts for client
- [ ] Configure user roles and permissions
- [ ] Test content editing workflow
- [ ] Create CMS documentation for client

### Analytics & Monitoring
- [ ] Set up Google Analytics 4
- [ ] Configure Google Search Console
- [ ] Add both language versions to Search Console
- [ ] Submit sitemap to Google
- [ ] Verify Sentry error tracking

### Security
- [ ] Verify HTTPS is enabled
- [ ] Confirm secure environment variables
- [ ] Test rate limiting on contact form
- [ ] Run security audit

### Backup Strategy
- [ ] Configure MongoDB backups on Railway
- [ ] Document backup restoration process
- [ ] Export initial content as backup
- [ ] Schedule regular backups

### Client Training
- [ ] Create CMS usage documentation
- [ ] Record video tutorials
- [ ] Schedule training session
- [ ] Provide 30-day support

---

## Testing Checklists

### Functionality Testing
- [ ] All pages load correctly in both languages
- [ ] Language switcher works on all pages
- [ ] Blog posts display with correct language content
- [ ] Portfolio items show proper videos and thumbnails
- [ ] Contact form submits successfully
- [ ] Email notifications arrive correctly
- [ ] Navigation works on mobile and desktop
- [ ] Mobile menu opens/closes properly

### RTL Testing (Arabic)
- [ ] Text flows right-to-left correctly
- [ ] Navigation aligns properly
- [ ] Forms display correctly
- [ ] Animations work in RTL mode
- [ ] Images and videos position correctly

### Performance Testing
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse SEO: 95+
- [ ] Lighthouse Best Practices: 90+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Test on 3G connection
- [ ] Verify image lazy loading works

### SEO Testing
- [ ] Meta tags present on all pages
- [ ] Sitemap generates correctly
- [ ] Robots.txt accessible
- [ ] hreflang tags correct for both languages
- [ ] Structured data validates (schema.org)
- [ ] Open Graph tags work (Facebook debugger)
- [ ] Twitter Card preview works

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Animation Testing
- [ ] Hero video plays automatically
- [ ] Scroll animations trigger correctly
- [ ] Hover effects work smoothly
- [ ] Page transitions are smooth
- [ ] No animation jank or stuttering
- [ ] Reduced motion works

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Skip to content link works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Form labels properly associated
- [ ] Alt text on all images

---

## Maintenance Tasks

### Weekly
- [ ] Monitor site performance via Lighthouse
- [ ] Check error logs in Railway dashboard
- [ ] Review contact form submissions
- [ ] Update blog content

### Monthly
- [ ] Review analytics data
- [ ] Check for broken links
- [ ] Update dependencies (npm outdated)
- [ ] Review and optimize images
- [ ] Check MongoDB storage usage

### Quarterly
- [ ] Security audit (npm audit)
- [ ] Performance optimization review
- [ ] Content audit
- [ ] SEO performance review
- [ ] Dependency major version updates

---

## Task Summary

**Total Tasks**: 200+  
**Estimated Hours**: 280-300 hours  
**Timeline**: 7 weeks (49 days)  

**Status**: 🔄 In Progress — Week 1 (Project Setup & CMS Configuration) mostly complete  
**Completed**: Project init, Payload CMS v3 setup, admin panel working, first user created, rate limiting middleware  
**Next Up**: Create remaining Payload collections (Day 3-4), generate types, add sample content
