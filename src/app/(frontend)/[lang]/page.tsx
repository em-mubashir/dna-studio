import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { getPageBySlug } from '@/src/lib/payload'
import HeroSection from '@/src/components/sections/HeroSection'
import TaglineSection from '@/src/components/sections/TaglineSection'
import FeaturedWorkSection from '@/src/components/sections/FeaturedWorkSection'
import AboutSection from '@/src/components/sections/AboutSection'
import CTASection from '@/src/components/sections/CTASection'

export const dynamic = 'force-dynamic'

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

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'
  const currentUrl = `${baseUrl}/${lang}`

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
  
  const page = await getPageBySlug('home')
  
  if (!page) {
    notFound()
  }

  const taglineText = lang === 'ar' ? page?.tagline?.text_ar : page?.tagline?.text_en
  const taglineButtonText = lang === 'ar' ? page?.tagline?.button_text_ar : page?.tagline?.button_text_en
  const taglineButtonLink = page?.tagline?.button_link

  const featuredWork = page?.featuredWork
  const featuredWorkServiceType = lang === 'ar' ? featuredWork?.serviceType_ar : featuredWork?.serviceType_en
  const featuredWorkProjectTitle = lang === 'ar' ? featuredWork?.projectTitle_ar : featuredWork?.projectTitle_en
  const featuredWorkSoundOn = lang === 'ar' ? featuredWork?.soundOn_ar : featuredWork?.soundOn_en
  const featuredWorkSoundOff = lang === 'ar' ? featuredWork?.soundOff_ar : featuredWork?.soundOff_en

  const about = page?.aboutSection
  const aboutLabel = lang === 'ar' ? about?.label_ar : about?.label_en
  const aboutHeading = lang === 'ar' ? about?.heading_ar : about?.heading_en
  const aboutDescription = lang === 'ar' ? about?.description_ar : about?.description_en

  const cta = page?.ctaSection
  const ctaHeading = lang === 'ar' ? cta?.heading_ar : cta?.heading_en

  return (
    <main>
      {page.hero && (
        <HeroSection
          heading={getBilingualField<string>(page.hero, 'heading', lang as Language)}
          backgroundVideo={page.hero.background_video}
          backgroundImage={page.hero.background_image}
          lang={lang as Language}
        />
      )}

      <TaglineSection 
        lang={lang as Language} 
        taglineText={taglineText ?? undefined}
        buttonText={taglineButtonText ?? undefined}
        buttonLink={taglineButtonLink ?? undefined}
      />

      <FeaturedWorkSection 
        lang={lang as Language}
        projectNumber={featuredWork?.projectNumber ?? undefined}
        serviceType={featuredWorkServiceType ?? undefined}
        projectTitle={featuredWorkProjectTitle ?? undefined}
        backgroundImage={featuredWork?.backgroundImage}
        backgroundVideo={featuredWork?.backgroundVideo ?? undefined}
        projectLink={featuredWork?.projectLink ?? undefined}
        soundOnText={featuredWorkSoundOn ?? undefined}
        soundOffText={featuredWorkSoundOff ?? undefined}
      />

      <AboutSection 
        lang={lang as Language}
        label={aboutLabel ?? undefined}
        heading={aboutHeading ?? undefined}
        image={about?.image}
        description={aboutDescription ?? undefined}
      />

      <CTASection 
        lang={lang as Language}
        heading={ctaHeading ?? undefined}
        buttonLink={cta?.buttonLink ?? undefined}
        backgroundImage={cta?.backgroundImage}
        circleImage={cta?.circleImage}
      />
    </main>
  )
}
