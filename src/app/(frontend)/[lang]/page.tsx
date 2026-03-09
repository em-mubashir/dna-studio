import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getPageBySlug, getFeaturedPortfolio } from '@/src/lib/payload'
import { getPayload } from 'payload'
import config from '@/src/payload/payload.config'
import HeroSection from '@/src/components/sections/HeroSection'
import TaglineSection from '@/src/components/sections/TaglineSection'
import FeaturedWorkSection from '@/src/components/sections/FeaturedWorkSection'
import AboutSection from '@/src/components/sections/AboutSection'
import PortfolioGrid from '@/src/components/sections/PortfolioGrid'
import CTASection from '@/src/components/sections/CTASection'

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

  // Fetch settings for tagline
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'settings',
  })

  // Fetch featured portfolio items
  const portfolioItems = await getFeaturedPortfolio(6)

  // Get tagline content
  const taglineText = lang === 'ar' 
    ? settings?.tagline?.text_ar 
    : settings?.tagline?.text_en
  const taglineButtonText = lang === 'ar'
    ? settings?.tagline?.button_text_ar
    : settings?.tagline?.button_text_en
  const taglineButtonLink = settings?.tagline?.button_link

  // Get featured work content
  const featuredWork = settings?.featuredWork
  const featuredWorkServiceType = lang === 'ar'
    ? featuredWork?.serviceType_ar
    : featuredWork?.serviceType_en
  const featuredWorkProjectTitle = lang === 'ar'
    ? featuredWork?.projectTitle_ar
    : featuredWork?.projectTitle_en
  const featuredWorkSoundOn = lang === 'ar'
    ? featuredWork?.soundOn_ar
    : featuredWork?.soundOn_en
  const featuredWorkSoundOff = lang === 'ar'
    ? featuredWork?.soundOff_ar
    : featuredWork?.soundOff_en

  // Get about section content
  const about = settings?.about
  const aboutLabel = lang === 'ar'
    ? about?.label_ar
    : about?.label_en
  const aboutHeading = lang === 'ar'
    ? about?.heading_ar
    : about?.heading_en
  const aboutDescription = lang === 'ar'
    ? about?.description_ar
    : about?.description_en

  // Get CTA section content
  const cta = settings?.cta
  const ctaHeading = lang === 'ar'
    ? cta?.heading_ar
    : cta?.heading_en

  return (
    <main>
      {/* Hero Section */}
      {page.hero && (
        <HeroSection
          heading={getBilingualField<string>(page.hero, 'heading', lang as Language)}
          backgroundVideo={page.hero.background_video}
          backgroundImage={page.hero.background_image}
          lang={lang as Language}
        />
      )}

      {/* Tagline Section */}
      <TaglineSection 
        lang={lang as Language} 
        taglineText={taglineText}
        buttonText={taglineButtonText}
        buttonLink={taglineButtonLink}
      />

      {/* Featured Work Section */}
      <FeaturedWorkSection 
        lang={lang as Language}
        projectNumber={featuredWork?.projectNumber}
        serviceType={featuredWorkServiceType}
        projectTitle={featuredWorkProjectTitle}
        backgroundImage={featuredWork?.backgroundImage}
        backgroundVideo={featuredWork?.backgroundVideo}
        projectLink={featuredWork?.projectLink}
        soundOnText={featuredWorkSoundOn}
        soundOffText={featuredWorkSoundOff}
      />

      {/* About Section */}
      <AboutSection 
        lang={lang as Language}
        label={aboutLabel}
        heading={aboutHeading}
        image={about?.image}
        description={aboutDescription}
      />

      {/* Featured Portfolio */}
      {portfolioItems.length > 0 && (
        <PortfolioGrid
          items={portfolioItems}
          lang={lang as Language}
          featured
        />
      )}

      {/* CTA Section */}
      <CTASection 
        lang={lang as Language}
        heading={ctaHeading}
        buttonLink={cta?.buttonLink}
        backgroundImage={cta?.backgroundImage}
        circleImage={cta?.circleImage}
      />
    </main>
  )
}
