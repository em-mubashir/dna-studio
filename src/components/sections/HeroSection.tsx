'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Language } from '@/src/lib/utils/language'

interface HeroSectionProps {
  heading: string
  subheading: string
  ctaText?: string
  ctaLink?: string
  backgroundVideo?: string
  backgroundImage?: any
  lang: Language
}

export default function HeroSection({
  heading,
  subheading,
  ctaText,
  ctaLink,
  backgroundVideo,
  backgroundImage,
  lang,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLIFrameElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP animations will be added in Week 3
    // For now, we'll use CSS transitions
  }, [])

  // Get background image URL
  const bgImageUrl = backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
    ? backgroundImage.url
    : null

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label={lang === 'en' ? 'Hero section' : 'قسم البطل'}
    >
      {/* Background Video (Vimeo) */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <iframe
            ref={videoRef}
            src={`https://player.vimeo.com/video/${backgroundVideo}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
            style={{ aspectRatio: '16/9' }}
            allow="autoplay; fullscreen"
            title={lang === 'en' ? 'Background video' : 'فيديو الخلفية'}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Background Image (Fallback) */}
      {!backgroundVideo && bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
            {heading}
          </h1>

          {/* Subheading */}
          <p className="text-lg text-white/90 sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            {subheading}
          </p>

          {/* CTA Button */}
          {ctaText && ctaLink && (
            <div className="animate-fade-in-delay-2">
              <Link
                href={ctaLink}
                className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
