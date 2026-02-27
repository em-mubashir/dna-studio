import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getPageBySlug, getFeaturedPortfolio, getServices } from '@/src/lib/payload'
import HeroSection from '@/src/components/sections/HeroSection'
import ServicesSection from '@/src/components/sections/ServicesSection'
import PortfolioGrid from '@/src/components/sections/PortfolioGrid'

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params
  const page = await getPageBySlug('home')

  if (!page) {
    return {
      title: 'DNA Media',
      description: 'Premium video production company',
    }
  }

  const metaTitle = getBilingualField<string>(page.seo || {}, 'meta_title', lang as Language)
  const metaDescription = getBilingualField<string>(page.seo || {}, 'meta_description', lang as Language)
  const ogImage = page.seo?.og_image
  const keywords = getBilingualField<string>(page.seo || {}, 'keywords', lang as Language)

  // Get the base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}`
  const alternateUrl = `${baseUrl}/${lang === 'en' ? 'ar' : 'en'}`

  return {
    title: metaTitle || getBilingualField<string>(page, 'title', lang as Language),
    description: metaDescription || '',
    keywords: keywords || undefined,
    openGraph: {
      title: metaTitle || getBilingualField<string>(page, 'title', lang as Language),
      description: metaDescription || '',
      url: currentUrl,
      siteName: 'DNA Media',
      locale: lang === 'en' ? 'en_US' : 'ar_SA',
      type: 'website',
      images: ogImage && typeof ogImage === 'object' && 'url' in ogImage 
        ? [{ 
            url: ogImage.url as string,
            width: 1200,
            height: 630,
            alt: metaTitle || getBilingualField<string>(page, 'title', lang as Language),
          }] 
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle || getBilingualField<string>(page, 'title', lang as Language),
      description: metaDescription || '',
      images: ogImage && typeof ogImage === 'object' && 'url' in ogImage 
        ? [ogImage.url as string] 
        : [],
    },
    robots: {
      index: !page.seo?.noindex,
      follow: !page.seo?.nofollow,
    },
    alternates: {
      canonical: page.seo?.canonical_url || currentUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
      },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  
  // Fetch page data from CMS
  const page = await getPageBySlug('home')
  
  if (!page) {
    notFound()
  }

  // Fetch featured portfolio items and services
  const [portfolioItems, services] = await Promise.all([
    getFeaturedPortfolio(6),
    getServices(),
  ])

  return (
    <main>
      {/* Hero Section */}
      {page.hero && (
        <HeroSection
          heading={getBilingualField<string>(page.hero, 'heading', lang as Language)}
          subheading={getBilingualField<string>(page.hero, 'subheading', lang as Language)}
          ctaText={getBilingualField<string>(page.hero, 'cta_text', lang as Language)}
          ctaLink={page.hero.cta_link}
          backgroundVideo={page.hero.background_video}
          backgroundImage={page.hero.background_image}
          lang={lang as Language}
        />
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <ServicesSection
          services={services}
          lang={lang as Language}
        />
      )}

      {/* Featured Portfolio */}
      {portfolioItems.length > 0 && (
        <PortfolioGrid
          items={portfolioItems}
          lang={lang as Language}
          featured
        />
      )}
    </main>
  )
}
