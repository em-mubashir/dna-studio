import { type Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPageBySlug, getBlogPosts } from '@/src/lib/payload'
import type { Media } from '@/src/payload-types'
import BlogGridSection from '@/src/components/blog/BlogGridSection'
import CTABanner from '@/src/components/sections/CTABanner'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'ar' ? 'المدونة - DNA Media' : 'Blog - DNA Media'
  const description =
    lang === 'ar'
      ? 'اكتشف أحدث الأخبار والنصائح والرؤى حول إنتاج الفيديو والصناعة الإبداعية'
      : 'Discover the latest news, tips, and insights about video production and the creative industry'

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}/blog`

  return {
    title,
    description,
    openGraph: { title, description, url: currentUrl, siteName: 'DNA Media', locale: lang === 'en' ? 'en_US' : 'ar_SA', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: currentUrl, languages: { en: `${baseUrl}/en/blog`, ar: `${baseUrl}/ar/blog` } },
  }
}

function getImageUrl(image: string | Media | undefined | null): string | null {
  if (!image) return null
  if (typeof image === 'string') return image
  return image.url || null
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
        <section className="relative w-full pt-[72px] md:pt-[120px]">
          <div className="relative mx-4 md:mx-12 mt-4 md:mt-[54px]">
            <div className="relative w-full aspect-[1824/1027] overflow-hidden rounded-sm">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={heroTitle || 'Blog hero'}
                  fill
                  unoptimized
                  className="object-cover grayscale"
                  priority
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
                {heroTopic && (
                  <span className="inline-block w-fit px-4 py-1.5 mb-4 md:mb-5 text-xs md:text-sm font-medium text-white border border-white/60 rounded-sm">
                    {heroTopic}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight max-w-3xl mb-5 md:mb-8 whitespace-pre-line">
                  {heroTitle}
                </h1>

                <Link
                  href={heroLink}
                  className="inline-flex items-center gap-2 text-sm md:text-base text-white/90 hover:text-white transition-colors group"
                >
                  {readMoreText}
                  <span className="inline-flex items-center gap-0.5 text-white/70 group-hover:text-white transition-colors">
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span className="w-1 h-1 rounded-full bg-current" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
