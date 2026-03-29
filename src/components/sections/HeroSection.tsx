'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { type Language } from '@/src/lib/utils/language'

interface HeroSectionProps {
  heading: string
  backgroundVideo?: string
  backgroundImage?: any
  lang: Language
}

/**
 * Hero Section - Figma Design Implementation
 * 
 * Total viewport height: 1080px (including header)
 * Header height: 120px (desktop), 72px (mobile)
 * Hero section height: 1080px - header height
 * Text Layout: 788px × 80px at position (48px, 920px from top of viewport)
 * Typography: Degular Bold 80px, line-height 100%, uppercase
 */
export default function HeroSection({
  heading,
  backgroundVideo,
  backgroundImage,
  lang,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLIFrameElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP animations will be added later
  }, [])

  // Get background image URL
  const bgImageUrl = backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
    ? backgroundImage.url
    : null

  console.log('Hero Section Debug:', {
    backgroundVideo,
    backgroundImage,
    bgImageUrl,
    hasVideo: !!backgroundVideo,
    hasImage: !!bgImageUrl
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: 'calc(1080px - 120px)', // 960px on desktop
        marginTop: '120px', // Account for fixed header
      }}
      aria-label={lang === 'en' ? 'Hero section' : 'قسم البطل'}
    >
      {/* Background Image - Always show if available */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImageUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Background Video (Vimeo) - Overlay on top of image */}
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

      {/* Overlay - Lighter for better image visibility */}
      <div className="absolute inset-0 z-10 bg-black/20" aria-hidden="true" />

      {/* Text Content - Positioned as per Figma specs */}
      <div 
        className="absolute z-20 text-white uppercase"
        style={{
          width: 'auto',
          maxWidth: '1824px',
          height: '80px',
          bottom: '80px', // 920px from viewport top = 80px from section bottom (1080 - 120 - 80 = 880)
          left: '48px',
          opacity: 1,
          whiteSpace: 'nowrap',
        }}
      >
        <h1 
          style={{
            fontFamily: 'Degular, sans-serif',
            fontWeight: 700,
            fontSize: '80px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'left',
            textTransform: 'uppercase',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {heading}
        </h1>
      </div>
    </section>
  )
}
