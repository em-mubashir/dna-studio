# DNA Studio - Implementation Guide

This guide provides practical implementation instructions for converting the Figma designs into production code.

---

## Quick Reference


**Key Documents**:
- `FIGMA-DESIGN-REFERENCE.md` - Complete design specifications
- `FIGMA-COMPONENT-SPECS.md` - Component library details
- This file - Implementation guidelines

---

## Design Token Setup

### 1. Tailwind Configuration

Create or update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          100: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#FFFFFF',
          50: 'rgba(255, 255, 255, 0.5)',
          80: 'rgba(255, 255, 255, 0.8)',
        },
      },
      fontFamily: {
        degular: ['Degular', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'h1': ['80px', { lineHeight: '1.0', fontWeight: '700' }],
        'h2': ['64px', { lineHeight: '1.0', fontWeight: '700' }],
        'h3': ['48px', { lineHeight: '1.0', fontWeight: '700' }],
        'h4': ['32px', { lineHeight: '1.0', fontWeight: '700' }],
        'h5': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'h6': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
        'h7': ['16px', { lineHeight: '1.2', fontWeight: '700' }],
        // Body
        'body-24': ['24px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-20': ['20px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-18': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-16': ['16px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-16-medium': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-14': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        // Custom spacing from design
        '11': '11px',
        '23': '23px',
        '29': '29px',
        '97': '97px',
        '120': '120px',
        '213': '213px',
        '263': '263px',
        '312': '312px',
        '361': '361px',
        '393': '393px',
        '410': '410px',
        '455': '455px',
        '574': '574px',
        '618': '618px',
        '638': '638px',
        '896': '896px',
        '902': '902px',
        '918': '918px',
        '920': '920px',
        '1080': '1080px',
        '1330': '1330px',
        '1368': '1368px',
        '1824': '1824px',
        '1920': '1920px',
      },
      maxWidth: {
        'container': '1824px',
      },
      screens: {
        'mobile': '393px',
        'desktop': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
```

### 2. Global CSS Setup

Create `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Font Face Declarations */
@font-face {
  font-family: 'Degular';
  src: url('/fonts/Degular-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/fonts/IBMPlexSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/fonts/IBMPlexSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000000;
  color: #FFFFFF;
  font-family: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

/* Custom Utilities */
@layer utilities {
  .text-uppercase {
    text-transform: uppercase;
  }
  
  .container-padding {
    padding-left: 48px;
    padding-right: 48px;
  }
  
  @media (max-width: 768px) {
    .container-padding {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}

/* Component Base Styles */
@layer components {
  .heading-1 {
    @apply font-degular text-h1 font-bold uppercase;
  }
  
  .heading-2 {
    @apply font-degular text-h2 font-bold uppercase;
  }
  
  .heading-3 {
    @apply font-degular text-h3 font-bold uppercase;
  }
  
  .heading-4 {
    @apply font-degular text-h4 font-bold uppercase;
  }
  
  .heading-5 {
    @apply font-degular text-h5 font-bold uppercase;
  }
  
  .body-text {
    @apply font-ibm-plex text-body-16;
  }
  
  .btn-primary {
    @apply w-[72px] h-[72px] rounded-[11.816px] bg-white flex items-center justify-center cursor-pointer transition-transform hover:scale-110;
  }
  
  .btn-text {
    @apply font-degular text-h5 text-white uppercase hover:text-white-80 transition-colors;
  }
}
```

---

## Component Implementation Examples

### Header Component

```typescript
// src/components/layout/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  lang: 'en' | 'ar'
}

export default function Header({ lang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isArabic = lang === 'ar'

  return (
    <header className="fixed top-0 left-0 w-full h-[120px] bg-black border-b border-white-50 z-50">
      <div className="container-padding h-full flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative w-[97px] h-[23px]">
          <Image
            src="/images/dna-logo-white.svg"
            alt="DNA Studio"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {/* Language Switcher */}
          <div className="flex items-center gap-[11px]">
            <Link
              href={pathname.replace(`/${lang}`, '/en')}
              className={`font-degular text-h5 uppercase transition-colors ${
                lang === 'en' ? 'text-white' : 'text-white-50'
              }`}
            >
              English
            </Link>
            <div className="w-px h-[23px] bg-white-50" />
            <Link
              href={pathname.replace(`/${lang}`, '/ar')}
              className={`font-degular text-h5 uppercase transition-colors ${
                lang === 'ar' ? 'text-white' : 'text-white-50'
              }`}
            >
              العربية
            </Link>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-6 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <span className="w-full h-0.5 bg-white transition-transform" />
            <span className="w-full h-0.5 bg-white transition-transform" />
            <span className="w-full h-0.5 bg-white transition-transform" />
          </button>
        </div>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[120px] bg-black/95 z-40">
          <nav className="container-padding py-[120px] flex flex-col gap-20">
            <MenuItem href={`/${lang}`} label={isArabic ? 'المنزل' : 'Home'} description={isArabic ? 'الصفحة الرئيسية' : 'Main page'} />
            <MenuItem href={`/${lang}/about`} label={isArabic ? 'فريق' : 'Team'} description={isArabic ? 'من نحن' : 'Who we are'} />
            <MenuItem href={`/${lang}/portfolio`} label={isArabic ? 'أعمال' : 'Works'} description={isArabic ? 'ما نقوم به' : 'What we do'} />
            <MenuItem href={`/${lang}/blog`} label={isArabic ? 'مدونة' : 'Blog'} description={isArabic ? 'مقالات مفيدة' : 'Useful articles'} />
            <MenuItem href={`/${lang}/contact`} label={isArabic ? 'لنبدأ العمل' : "Let's work"} description={isArabic ? 'اتصل بنا' : 'Contact us'} />
          </nav>
        </div>
      )}
    </header>
  )
}

function MenuItem({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex justify-between items-center border-b border-white-50 pb-10 group"
    >
      <span className="font-degular text-[80px] font-bold uppercase text-white group-hover:text-white-80 transition-colors">
        {label}
      </span>
      <span className="font-ibm-plex text-h5 text-white-50 group-hover:text-white transition-colors">
        {description}
      </span>
    </Link>
  )
}
```

### Footer Component

```typescript
// src/components/layout/Footer.tsx
import Image from 'next/image'

interface FooterProps {
  lang: 'en' | 'ar'
  variant?: 'full' | 'short'
}

export default function Footer({ lang, variant = 'short' }: FooterProps) {
  const isArabic = lang === 'ar'

  if (variant === 'short') {
    return (
      <footer className="relative w-full h-[574px] bg-black">
        <div className="container-padding pt-12">
          {/* Three Columns */}
          <div className="flex gap-12 w-full max-w-[1825px]">
            {/* Office */}
            <div className="flex-1 border-t border-white-50 pt-8 flex flex-col gap-4">
              <h3 className="font-degular text-h5 font-bold uppercase">
                {isArabic ? 'المكتب' : 'OFFICE'}
              </h3>
              <div className="font-ibm-plex text-body-16 leading-[1.4]">
                <p>Jax District, J015 RDDA24700</p>
                <p>Al Diriyah, Riyadh</p>
                <p>Saudi Arabia</p>
              </div>
            </div>

            {/* Mail Us */}
            <div className="flex-1 border-t border-white-50 pt-8 flex flex-col gap-4">
              <h3 className="font-degular text-h5 font-bold uppercase">
                {isArabic ? 'راسلنا' : 'MAIL US'}
              </h3>
              <div className="font-ibm-plex text-body-16 leading-[1.4]">
                <p>Info@dnamedia.tv</p>
                <p>Jobs@dnamedia.tv</p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex-1 border-t border-white-50 pt-8 flex flex-col gap-4">
              <h3 className="font-degular text-h5 font-bold uppercase">
                {isArabic ? 'تابعنا' : 'FOLLOW US'}
              </h3>
              <div className="font-ibm-plex text-body-16 leading-[1.4]">
                <p>Instagram</p>
                <p>X</p>
                <p>TikTok</p>
                <p>Linkedin</p>
                <p>Vimeo</p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-[263px] left-12 right-12 flex justify-between">
            <p className="font-degular text-h7 font-bold uppercase">
              {isArabic ? '© DNA - جميع الحقوق محفوظة' : '© DNA - All rights reserved'}
            </p>
            <p className="font-degular text-h7 font-bold uppercase">
              {isArabic ? 'الشروط العامة' : 'GENERAL TERMS'}
            </p>
          </div>

          {/* Background Decoration */}
          <div className="absolute bottom-0 left-12 w-[1825px] h-[213px] opacity-10">
            <Image
              src="/images/footer-decoration.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </footer>
    )
  }

  // Full footer implementation...
  return null
}
```

### Project Card Component

```typescript
// src/components/portfolio/ProjectCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    service: string
    number: string
    image: string
    video?: string
  }
  lang: 'en' | 'ar'
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/${lang}/portfolio/${project.id}`}
      className="relative w-[896px] h-[896px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image/Video */}
      {project.video && isHovered ? (
        <video
          src={project.video}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-8">
        {/* Project Number */}
        <span className="absolute top-8 left-8 font-degular text-h4 font-bold uppercase text-white">
          {project.number}
        </span>

        {/* Service Type */}
        <span className="absolute top-8 right-8 font-degular text-h4 font-bold uppercase text-white">
          {project.service}
        </span>

        {/* Project Title */}
        <h3 className="absolute bottom-8 left-8 font-degular text-h4 font-bold uppercase text-white">
          {project.title}
        </h3>

        {/* Sound Toggle (if video) */}
        {project.video && (
          <button className="absolute bottom-8 right-8 font-degular text-h4 font-bold uppercase text-white">
            SOUND OFF
          </button>
        )}
      </div>
    </Link>
  )
}
```

### Hero Section Component

```typescript
// src/components/sections/HeroSection.tsx
import Image from 'next/image'

interface HeroSectionProps {
  title: string
  backgroundImage: string
  backgroundVideo?: string
  lang: 'en' | 'ar'
}

export default function HeroSection({
  title,
  backgroundImage,
  backgroundVideo,
  lang,
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[1080px] overflow-hidden">
      {/* Background */}
      {backgroundVideo ? (
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end justify-center pb-40">
        <h1 className="font-degular text-h1 font-bold uppercase text-white text-center">
          {title}
        </h1>
      </div>
    </section>
  )
}
```

---

## Page Implementation Examples

### Home Page

```typescript
// src/app/[lang]/page.tsx
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedWork from '@/components/sections/FeaturedWork'
import AboutSection from '@/components/sections/AboutSection'
import CTASection from '@/components/sections/CTASection'

export default async function HomePage({
  params,
}: {
  params: { lang: 'en' | 'ar' }
}) {
  const { lang } = params

  return (
    <main className="min-h-screen bg-black">
      <Header lang={lang} />
      
      <HeroSection
        title={lang === 'ar' ? 'نحن نكسر القواعد' : 'WE BREAK THE NORMS'}
        backgroundImage="/images/hero-bg.jpg"
        backgroundVideo="/videos/hero-bg.mp4"
        lang={lang}
      />

      <section className="container-padding py-20">
        <h2 className="font-degular text-h1 font-bold uppercase text-white max-w-[902px]">
          {lang === 'ar'
            ? 'إطار واحد في كل مرة. شريكك الإبداعي والإنتاجي المتكامل.'
            : 'One Frame at a Time. Your Full-Fledged Creative and Production Partner.'}
        </h2>
      </section>

      <FeaturedWork lang={lang} />
      
      <AboutSection lang={lang} />
      
      <CTASection lang={lang} />
      
      <Footer lang={lang} variant="short" />
    </main>
  )
}
```

---

## Payload CMS Integration

### Collection Schema Example

```typescript
// src/payload/collections/Projects.ts
import { CollectionConfig } from 'payload/types'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'number',
      type: 'text',
      required: true,
    },
    {
      name: 'service',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredVideo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'client',
      type: 'text',
      localized: true,
    },
    {
      name: 'agency',
      type: 'text',
      localized: true,
    },
    {
      name: 'director',
      type: 'text',
      localized: true,
    },
    {
      name: 'dop',
      type: 'text',
      localized: true,
    },
    {
      name: 'producer',
      type: 'text',
      localized: true,
    },
    {
      name: 'industry',
      type: 'text',
      localized: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
```

---

## Animation Implementation

### Scroll Animations with Framer Motion

```typescript
// src/components/animations/ScrollReveal.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Page Transitions

```typescript
// src/components/animations/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## Performance Optimization

### Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['www.figma.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [393, 768, 1024, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### Font Optimization

```typescript
// src/app/layout.tsx
import localFont from 'next/font/local'

const degular = localFont({
  src: '../fonts/Degular-Bold.woff2',
  variable: '--font-degular',
  display: 'swap',
  weight: '700',
})

const ibmPlex = localFont({
  src: [
    {
      path: '../fonts/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/IBMPlexSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${degular.variable} ${ibmPlex.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Testing Checklist

### Visual Testing
- [ ] Compare with Figma screenshots
- [ ] Check spacing and alignment
- [ ] Verify typography (font, size, weight)
- [ ] Test color accuracy
- [ ] Validate responsive behavior

### Functional Testing
- [ ] Navigation works correctly
- [ ] Forms submit properly
- [ ] Language switching functions
- [ ] Modals open/close
- [ ] Videos play/pause
- [ ] Links navigate correctly

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Images lazy load
- [ ] Fonts load efficiently
- [ ] No layout shift (CLS < 0.1)
- [ ] Fast page transitions

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AAA
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Fonts uploaded to CDN
- [ ] Images optimized and uploaded
- [ ] Videos compressed and uploaded
- [ ] CMS collections created
- [ ] Sample content added
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics integrated
- [ ] Error tracking setup
- [ ] Performance monitoring enabled

---

**Document Version**: 1.0
**Last Updated**: 2026-03-01
