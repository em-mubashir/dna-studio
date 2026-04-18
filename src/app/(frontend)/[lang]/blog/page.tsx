import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPageBySlug, getBlogPosts } from '@/src/lib/payload'
import type { Media } from '@/src/payload-types'
import BlogGridSection from '@/src/components/blog/BlogGridSection'
import BlogHeroSection from '@/src/components/blog/BlogHeroSection'
import CTABanner from '@/src/components/sections/CTABanner'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'ar' ? 'المدونة - DNA Studio' : 'Blog - DNA Studio'
  const description =
    lang === 'ar'
      ? 'اكتشف أحدث الأخبار والنصائح والرؤى حول إنتاج الفيديو والصناعة الإبداعية'
      : 'Discover the latest news, tips, and insights about video production and the creative industry'

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}/blog`

  return {
    title,
    description,
    openGraph: { title, description, url: currentUrl, siteName: 'DNA Studio', locale: lang === 'en' ? 'en_US' : 'ar_SA', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: currentUrl, languages: { en: `${baseUrl}/en/blog`, ar: `${baseUrl}/ar/blog` } },
  }
}

function getImageUrl(image: string | Media | undefined | null): string | null {
  if (!image) return null
  if (typeof image === 'string') return image
  const raw = image.url || null
  if (!raw) return null
  // Convert absolute localhost URLs to relative paths so Next.js Image
  // doesn't try to fetch from a "remote" private IP
  try {
    const u = new URL(raw)
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const server = new URL(serverUrl)
    if (u.hostname === server.hostname) {
      return u.pathname
    }
    return u.origin + u.pathname
  } catch {
    return raw
  }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { lang } = await params
  await searchParams

  // Fetch blog page data from Pages collection (slug: 'blog')
  const page = await getPageBySlug('blog')
  const blogHero = page?.blogHero

  const heroTitle = blogHero
    ? (lang === 'ar' ? blogHero.title_ar : blogHero.title_en)
    : null
  const heroTopic = blogHero
    ? (lang === 'ar' ? blogHero.topic_ar : blogHero.topic_en)
    : null
  const heroLink = blogHero?.link || '#'
  const heroImageUrl = getImageUrl(blogHero?.background_image)

  const readMoreText = lang === 'ar' ? 'اقرأ المزيد' : 'Read More'

  // CTA section from CMS
  const blogCta = page?.blogCta
  const ctaHeading = blogCta
    ? (lang === 'ar' ? blogCta.heading_ar : blogCta.heading_en)
    : null
  const ctaButtonLink = blogCta?.buttonLink

  // Fetch blog posts from CMS
  const blogData = await getBlogPosts(1, 100)
  const blogItems = blogData.docs.map((post: any) => ({
    id: post.id,
    title: lang === 'ar' ? (post.title_ar || post.title_en) : post.title_en,
    topic: post.category || 'TOPIC',
    href: `/${lang}/blog/${post.slug}`,
    thumbnail: post.featured_image,
  }))

  return (
    <main className="min-h-screen bg-black" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section — data from CMS Pages > Blog */}
      {blogHero && (
        <BlogHeroSection
          title={heroTitle}
          topic={heroTopic}
          imageUrl={heroImageUrl}
          link={heroLink}
          lang={lang}
        />
      )}

      {/* Blog Grid Section — Filters + Cards + Pagination */}
      <BlogGridSection items={blogItems} lang={lang} itemsPerPage={6} />

      {/* CTA Banner — "LET'S CREATE TOGETHER" */}
      {ctaHeading && (
        <CTABanner
          heading={ctaHeading}
          buttonLink={ctaButtonLink}
          lang={lang}
        />
      )}
    </main>
  )
}
