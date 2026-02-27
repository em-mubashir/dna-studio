'use client'

import { type Language, getBilingualField } from '@/src/lib/utils/language'
import PortfolioCard from '@/src/components/portfolio/PortfolioCard'

interface PortfolioItem {
  id: string
  title_en: string
  title_ar: string
  slug: string
  client: string
  category: string
  thumbnail: any
  video_url: string
}

interface PortfolioGridProps {
  items: PortfolioItem[]
  lang: Language
  featured?: boolean
}

export default function PortfolioGrid({ items, lang, featured = false }: PortfolioGridProps) {
  if (items.length === 0) {
    return null
  }

  const sectionTitle = featured
    ? lang === 'en' ? 'Featured Work' : 'أعمالنا المميزة'
    : lang === 'en' ? 'Our Portfolio' : 'معرض أعمالنا'

  const sectionDescription = featured
    ? lang === 'en' 
      ? 'Explore our latest video production projects' 
      : 'استكشف أحدث مشاريع إنتاج الفيديو لدينا'
    : lang === 'en'
      ? 'Browse our complete collection of video projects'
      : 'تصفح مجموعتنا الكاملة من مشاريع الفيديو'

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="portfolio-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <PortfolioCard
              key={item.id}
              title={getBilingualField<string>(item, 'title', lang)}
              client={item.client}
              slug={item.slug}
              thumbnail={item.thumbnail}
              category={item.category}
              videoUrl={item.video_url}
              lang={lang}
            />
          ))}
        </div>

        {/* View All Link (only show in featured mode) */}
        {featured && (
          <div className="text-center mt-12">
            <a
              href={`/${lang}/portfolio`}
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              {lang === 'en' ? 'View All Projects' : 'عرض جميع المشاريع'}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
