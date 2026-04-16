import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import {
  getPageBySlug,
  getTeamMembers,
  getTimelineItems,
  getClients,
} from '@/src/lib/payload'
import HeroSection from '@/src/components/sections/HeroSection'
import AboutSection from '@/src/components/sections/AboutSection'
import TimelineSection from '@/src/components/sections/TimelineSection'

interface TeamPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { lang } = await params
  const page = await getPageBySlug('team')

  const fallbackTitle = lang === 'ar' ? 'الفريق - DNA Studio' : 'Team - DNA Studio'
  if (!page) return { title: fallbackTitle }

  const metaTitle = getBilingualField<string>(page.seo || {}, 'meta_title', lang as Language)
  const metaDescription = getBilingualField<string>(page.seo || {}, 'meta_description', lang as Language)
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://dnamedia.com'

  return {
    title: metaTitle || getBilingualField<string>(page, 'title', lang as Language) || fallbackTitle,
    description: metaDescription || '',
    openGraph: {
      title: metaTitle || fallbackTitle,
      description: metaDescription || '',
      url: `${baseUrl}/${lang}/team`,
      siteName: 'DNA Studio',
      locale: lang === 'en' ? 'en_US' : 'ar_SA',
      type: 'website',
    },
    alternates: {
      languages: { en: `${baseUrl}/en/team`, ar: `${baseUrl}/ar/team` },
    },
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { lang } = await params
  const isArabic = lang === 'ar'


  // Fetch all data in parallel
  const [page, teamMembers, timelineItems, clients] = await Promise.all([
    getPageBySlug('team'),
    getTeamMembers(),
    getTimelineItems(),
    getClients(),
  ])

  if (!page) {
    notFound()
  }
  // About section
  const about = page?.aboutSection
  const aboutLabel = isArabic ? about?.label_ar : about?.label_en
  const aboutHeading = isArabic ? about?.heading_ar : about?.heading_en
  const aboutDescription = isArabic ? about?.description_ar : about?.description_en

  return (
    <main className="bg-black">
      {/* Hero Section 1 */}
      <HeroSection
          heading={getBilingualField<string>(page.hero, 'heading', lang as Language)}
          backgroundVideo={page.hero.background_video}
          backgroundImage={page.hero.background_image}
          lang={lang as Language}
          className="p-[32px]"
          innerPadding={32}
          textCenter
      />

      {/* Hero Section 2 */}
      {page.hero2 && (
        <HeroSection
            heading={getBilingualField<string>(page.hero2, 'heading', lang as Language)}
            backgroundVideo={page.hero2.background_video}
            backgroundImage={page.hero2.background_image}
            lang={lang as Language}
            className="p-[32px]"
            innerPadding={32}
        />
      )}

      {/* About Section */}
      <AboutSection
        lang={lang as Language}
        label={aboutLabel ?? undefined}
        heading={aboutHeading ?? undefined}
        image={about?.image}
        description={aboutDescription ?? undefined}
        reverseSizes
      />
      {/* Timeline Section */}
      <TimelineSection lang={lang as Language} items={timelineItems as any} />

    </main>
  )
}