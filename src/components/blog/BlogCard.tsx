import Image from 'next/image'
import Link from 'next/link'
import { type Language, getBilingualField } from '@/src/lib/utils/language'
import { formatDate } from '@/src/lib/utils/date'

interface BlogCardProps {
  post: any
  lang: Language
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  const title = getBilingualField<string>(post, 'title', lang)
  const excerpt = getBilingualField<string>(post, 'excerpt', lang)
  const featuredImage = post.featured_image

  // Get category label
  const categoryLabels: Record<string, { en: string; ar: string }> = {
    'video-production': { en: 'Video Production', ar: 'إنتاج الفيديو' },
    'industry-news': { en: 'Industry News', ar: 'أخبار الصناعة' },
    'case-studies': { en: 'Case Studies', ar: 'دراسات الحالة' },
    'tips-tutorials': { en: 'Tips & Tutorials', ar: 'نصائح ودروس' },
    'company-news': { en: 'Company News', ar: 'أخبار الشركة' },
  }

  const categoryLabel = categoryLabels[post.category]?.[lang] || post.category

  return (
    <Link
      href={`/${lang}/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Featured Image */}
      {featuredImage && typeof featuredImage === 'object' && 'url' in featuredImage && (
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={featuredImage.url as string}
            alt={featuredImage.alt as string || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="text-primary-600 font-medium">{categoryLabel}</span>
          <span className="text-gray-400">•</span>
          <time className="text-gray-500" dateTime={post.publishedDate}>
            {formatDate(post.publishedDate, lang)}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3">{excerpt}</p>

        {/* Read More */}
        <div className="mt-4 text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
          {lang === 'ar' ? 'اقرأ المزيد ←' : 'Read More →'}
        </div>
      </div>
    </Link>
  )
}
