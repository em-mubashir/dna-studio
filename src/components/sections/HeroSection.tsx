'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { type Language } from '@/src/lib/utils/language'
import { getImageUrl } from '@/src/lib/utils/image'
import SplitTextReveal from '@/src/components/animations/SplitTextReveal'

interface HeroSectionProps {
  heading: string
  backgroundVideo?: string
  backgroundImage?: any
  lang: Language
  className?: string
  innerPadding?: number
  textCenter?: boolean
}

/**
 * Hero Section - Figma Design Implementation
 * 
 * Total viewport height: 1080px (including header)
 * Header height: 90px (desktop), 72px (mobile)
 * Hero section height: 1080px - header height
 * Text Layout: 788px × 80px at position (48px, 920px from top of viewport)
 * Typography: Degular Bold 80px, line-height 100%, uppercase
 */
export default function HeroSection({
  heading,
  backgroundVideo,
  backgroundImage,
  lang,
  className,
  innerPadding,
  textCenter = false,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLIFrameElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP animations will be added later
  }, [])

  // Get background image URL
  const bgImageUrl = getImageUrl(backgroundImage)

  const pad = innerPadding ?? 0

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-black mt-[72px] md:mt-[90px] h-[calc(100svh-72px)] md:h-[calc(1080px-90px)] ${className || ''}`}
      aria-label={lang === 'en' ? 'Hero section' : 'قسم البطل'}
    >
      {/* Inner container — when innerPadding is set, everything lives inside this box */}
      <div
        className={pad ? 'absolute overflow-hidden' : 'absolute inset-0'}
        style={pad ? { top: pad, right: pad, bottom: pad, left: pad, borderRadius: '16px' } : undefined}
      >
        {/* Background Image */}
        {bgImageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

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

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/20" aria-hidden="true" />

        {/* Text Content — always inside the image bounds */}
        <div 
          className={`absolute z-20 text-white uppercase ${textCenter ? 'top-1/2 left-4 right-4 md:left-12 md:right-12 -translate-y-1/2 text-center' : 'bottom-6 left-4 right-4 md:bottom-12 md:left-12 md:right-12'}`}
          style={{ maxWidth: '1824px', whiteSpace: 'pre-line' }}
        >
          <SplitTextReveal 
            as="h1"
            className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] uppercase m-0"
            style={{
              fontFamily: 'Degular, sans-serif',
              fontWeight: 700,
              lineHeight: '100%',
              textAlign: textCenter ? 'center' : 'left',
            }}
          >
            {heading}
          </SplitTextReveal>
        </div>
      </div>
    </section>
  )
}
