'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Language } from '@/src/lib/utils/language'

interface PortfolioCardProps {
  title: string
  client: string
  slug: string
  thumbnail: any
  category: string
  videoUrl: string
  lang: Language
}

export default function PortfolioCard({
  title,
  client,
  slug,
  thumbnail,
  category,
  videoUrl,
  lang,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get thumbnail URL
  const thumbnailUrl = thumbnail && typeof thumbnail === 'object' && 'url' in thumbnail
    ? thumbnail.url
    : null

  // Format category for display
  const categoryLabels: Record<string, { en: string; ar: string }> = {
    commercial: { en: 'Commercial', ar: 'تجاري' },
    corporate: { en: 'Corporate', ar: 'شركات' },
    documentary: { en: 'Documentary', ar: 'وثائقي' },
    animation: { en: 'Animation', ar: 'رسوم متحركة' },
    event: { en: 'Event', ar: 'فعاليات' },
  }

  const categoryLabel = categoryLabels[category]?.[lang] || category

  return (
    <Link
      href={`/${lang}/portfolio/${slug}`}
      className="group block relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${title} - ${client}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
            <span className="text-gray-500 text-sm">
              {lang === 'en' ? 'No image' : 'لا توجد صورة'}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm">
              {lang === 'en' ? 'Watch Video' : 'شاهد الفيديو'}
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">
            {lang === 'en' ? 'Client:' : 'العميل:'}
          </span>{' '}
          {client}
        </p>
      </div>
    </Link>
  )
}
