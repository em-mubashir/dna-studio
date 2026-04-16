import { type Metadata } from 'next'
import WorkDetailHero from '@/src/components/works/WorkDetailHero'
import { isValidLanguage, type Language } from '@/src/lib/utils/language'
import { getWorkBySlug } from '@/src/lib/payload'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface WorkDetailPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) return { title: 'Not Found' }

  const title = lang === 'ar' ? work.project_ar : work.project_en
  const description = lang === 'ar' ? work.description_ar : work.description_en
  return {
    title: `${title} | DNA Studio`,
    description: description || '',
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { lang, slug } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const language = lang as Language
  const work = await getWorkBySlug(slug)

  if (!work) {
    notFound()
  }

  const credits = {
    client: language === 'en' ? work.credits?.client_en : work.credits?.client_ar,
    agency: language === 'en' ? work.credits?.agency_en : work.credits?.agency_ar,
    director: language === 'en' ? work.credits?.director_en : work.credits?.director_ar,
    dop: language === 'en' ? work.credits?.dop_en : work.credits?.dop_ar,
    executiveProducer: language === 'en' ? work.credits?.executiveProducer_en : work.credits?.executiveProducer_ar,
    industry: language === 'en' ? work.credits?.industry_en : work.credits?.industry_ar,
  }

  const videos = (work.videos || []).map((v: any) => ({
    url: v.url,
    thumbnail: v.thumbnail || '',
    title: v.title || '',
  }))

  return (
    <main>
      <WorkDetailHero
        title={language === 'en' ? work.project_en : work.project_ar}
        description={language === 'en' ? (work.description_en || '') : (work.description_ar || '')}
        videos={videos}
        credits={credits}
        lang={language}
      />
    </main>
  )
}
