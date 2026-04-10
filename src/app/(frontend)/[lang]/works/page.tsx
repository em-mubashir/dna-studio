import { type Metadata } from 'next'
import { type Language } from '@/src/lib/utils/language'
import { getPageBySlug, getWorks } from '@/src/lib/payload'
import ProjectCard from '@/src/components/ui/ProjectCard'
import CTABanner from '@/src/components/sections/CTABanner'

export const dynamic = 'force-dynamic'

interface WorkPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { lang } = await params
  const title = lang === 'ar' ? 'أعمالنا | DNA Media' : 'Our Work | DNA Media'
  const description =
    lang === 'ar'
      ? 'استكشف مشاريعنا الإبداعية في إنتاج الفيديو'
      : 'Explore our creative video production projects'
  return { title, description }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { lang } = await params
  const page = await getPageBySlug('works')
  const works = await getWorks()

  const heading =
    lang === 'ar'
      ? page?.worksHeading?.heading_ar || 'في DNA، نجسّد جوهر الفن الإبداعي'
      : page?.worksHeading?.heading_en || 'AT DNA, WE EMBODY THE ESSENCE OF THE ART GENE'

  return (
    <main className="bg-black min-h-screen">
      {/* Heading */}
      <section className="pb-12 px-4 text-center" style={{ paddingTop: '180px' }}>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight max-w-4xl mx-auto">
          {heading}
        </h1>
      </section>

      {/* Work Grid - 2 columns */}
      <section className="px-2 sm:px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 max-w-[1840px] mx-auto">
          {works.map((item: any) => (
            <ProjectCard
              key={item.id}
              title={lang === 'ar' ? item.project_ar : item.project_en}
              topic={lang === 'ar' ? item.industry_ar : item.industry_en}
              href={`/${lang}/works/${item.slug}`}
              thumbnail={item.image}
              variant="works"
            />
          ))}
        </div>

        {works.length === 0 && (
          <p className="text-neutral-500 text-center py-20 text-lg">
            {lang === 'ar' ? 'لا توجد مشاريع حالياً' : 'No projects yet'}
          </p>
        )}
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading={lang === 'ar' ? page?.ctaSection?.heading_ar : page?.ctaSection?.heading_en}
        buttonLink={page?.ctaSection?.buttonLink}
        lang={lang}
      />
    </main>
  )
}
