'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl } from '@/src/lib/utils/image'

type LayoutVariant = 'blog' | 'works'

interface ProjectCardProps {
  title: string
  topic: string
  href?: string
  thumbnail: any
  className?: string
  /** 'blog' = title top-left, topic bottom-right; 'works' = title top-left, topic top-right */
  variant?: LayoutVariant
}

export default function ProjectCard({ title, topic, href, thumbnail, className = '', variant = 'blog' }: ProjectCardProps) {
  const thumbnailUrl = getImageUrl(thumbnail)

  const Wrapper = href ? Link : 'div'
  const wrapperProps = href ? { href } : {}

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className={`group relative block aspect-square overflow-hidden bg-neutral-900 ${className}`}
      aria-label={`${title} - ${topic}`}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={title || ''}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Top-left: Title */}
      <div className="absolute top-4 left-4 max-w-[60%]">
        <span className="text-white text-xs sm:text-sm font-bold uppercase leading-tight block whitespace-pre-line">
          {title}
        </span>
      </div>

      {/* Topic position depends on variant */}
      {variant === 'works' ? (
        <span className="absolute top-4 right-4 text-white text-xs sm:text-sm font-medium uppercase tracking-wide">
          {topic}
        </span>
      ) : (
        <span className="absolute bottom-4 right-4 text-white text-xs sm:text-sm font-medium uppercase tracking-wide">
          {topic}
        </span>
      )}
    </Wrapper>
  )
}
