'use client'

import { type Language, getBilingualField } from '@/src/lib/utils/language'
import WorkCard from '@/src/components/works/WorkCard'
import SplitTextReveal from '@/src/components/animations/SplitTextReveal'

interface WorkItem {
  id: string
  title_en: string
  title_ar: string
  industry_en?: string
  industry_ar?: string
  slug: string
  thumbnail: any
}

interface WorksGridProps {
  items: WorkItem[]
  lang: Language
  featured?: boolean
}

export default function WorksGrid({ items, lang, featured = false }: WorksGridProps) {
  if (items.length === 0) {
    return null
  }

  const sectionTitle = featured
    ? lang === 'en' ? 'Featured Work' : 'أعمالنا المميزة'
    : lang === 'en' ? 'Our Work' : 'أعمالنا'

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black" aria-labelledby="works-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SplitTextReveal as="h2" id="works-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {sectionTitle}
          </SplitTextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <WorkCard
              key={item.id}
              title={getBilingualField<string>(item, 'title', lang)}
              industry={getBilingualField<string>(item, 'industry', lang) || ''}
              slug={item.slug}
              thumbnail={item.thumbnail}
              lang={lang}
            />
          ))}
        </div>

        {featured && (
          <div className="text-center mt-12">
            <a
              href={`/${lang}/works`}
              className="inline-block bg-white hover:bg-white/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              {lang === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
