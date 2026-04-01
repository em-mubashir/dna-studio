'use client'

import Link from 'next/link'
import { type Language } from '@/src/lib/utils/language'

interface WorkCardProps {
  title: string
  industry: string
  slug: string
  thumbnail: any
  lang: Language
}

export default function WorkCard({ title, industry, slug, thumbnail, lang }: WorkCardProps) {
  // Handle both populated object and string URL
  let thumbnailUrl: string | null = null
  if (thumbnail) {
    if (typeof thumbnail === 'object' && 'url' in thumbnail) {
      thumbnailUrl = thumbnail.url
    } else if (typeof thumbnail === 'string') {
      thumbnailUrl = thumbnail
    }
  }

  const Wrapper = slug ? Link : 'div'
  const wrapperProps = slug
    ? { href: slug.startsWith('/') || slug.startsWith('http') ? slug : `/${lang}/works/${slug}` }
    : {}

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="group relative block w-[896px] h-[896px] max-w-full overflow-hidden bg-neutral-900"
      aria-label={`${title} - ${industry}`}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title || ''}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Top-left: Project name */}
      <span className="absolute top-4 left-4 text-white text-sm font-medium uppercase tracking-wide">
        {title}
      </span>

      {/* Top-right: Industry */}
      <span className="absolute top-4 right-4 text-white text-sm font-medium uppercase tracking-wide">
        {industry}
      </span>
    </Wrapper>
  )
}
