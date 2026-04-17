'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type Language } from '@/src/lib/utils/language'
import { getImageUrl } from '@/src/lib/utils/image'

interface WorkCardProps {
  title: string
  industry: string
  slug: string
  thumbnail: any
  lang: Language
}

export default function WorkCard({ title, industry, slug, thumbnail, lang }: WorkCardProps) {
  const thumbnailUrl = getImageUrl(thumbnail)

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
        <Image
          src={thumbnailUrl}
          alt={title || ''}
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
