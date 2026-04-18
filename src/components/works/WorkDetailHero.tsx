'use client'

import { useRef, useEffect, useState } from 'react'
import { type Language } from '@/src/lib/utils/language'
import SplitTextReveal from '@/src/components/animations/SplitTextReveal'

/**
 * Extract Vimeo video ID from various URL formats:
 * - https://vimeo.com/123456789
 * - https://vimeo.com/123456789/abcdef (private hash)
 * - https://player.vimeo.com/video/123456789
 * - https://vimeo.com/channels/xxx/123456789
 * - https://vimeo.com/groups/xxx/videos/123456789
 */
function getVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

/** Extract private hash from URLs like vimeo.com/123456789/abcdef1234 */
function getVimeoHash(url: string): string | null {
  const match = url.match(/vimeo\.com\/\d+\/([a-f0-9]+)/)
  return match?.[1] || null
}

interface VideoItem {
  url: string
  thumbnail?: string
  title?: string
}

interface WorkDetailHeroProps {
  title: string
  description: string
  videos: VideoItem[]
  credits: {
    client?: string
    agency?: string
    director?: string
    dop?: string
    executiveProducer?: string
    industry?: string
  }
  lang: Language
}

export default function WorkDetailHero({
  title,
  description,
  videos,
  credits,
  lang,
}: WorkDetailHeroProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scales, setScales] = useState<number[]>(videos.map(() => 1))
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const updateScales = () => {
      const items = carousel.querySelectorAll<HTMLDivElement>('[data-video-item]')
      const containerRect = carousel.getBoundingClientRect()
      const centerX = containerRect.left + containerRect.width / 2

      const newScales: number[] = []
      let closestIdx = 0
      let closestDist = Infinity

      items.forEach((item, i) => {
        const itemRect = item.getBoundingClientRect()
        const itemCenterX = itemRect.left + itemRect.width / 2
        const distance = Math.abs(centerX - itemCenterX)
        const maxDist = containerRect.width / 2

        // Scale from 0.65 (far) to 1.0 (center)
        const normalizedDist = Math.min(distance / maxDist, 1)
        const scale = 1 - normalizedDist * 0.35
        newScales.push(scale)

        if (distance < closestDist) {
          closestDist = distance
          closestIdx = i
        }
      })

      setScales(newScales)
      setActiveIndex(closestIdx)
    }

    carousel.addEventListener('scroll', updateScales, { passive: true })
    // Initial calculation
    updateScales()

    return () => carousel.removeEventListener('scroll', updateScales)
  }, [videos.length])

  const isRtl = lang === 'ar'

  const creditItems = [
    { label: lang === 'en' ? 'CLIENT' : 'العميل', value: credits.client },
    { label: lang === 'en' ? 'AGENCY' : 'الوكالة', value: credits.agency },
    { label: lang === 'en' ? 'DIRECTOR' : 'المخرج', value: credits.director },
    { label: lang === 'en' ? 'DOP' : 'مدير التصوير', value: credits.dop },
    { label: lang === 'en' ? 'EXECUTIVE PRODUCER' : 'المنتج التنفيذي', value: credits.executiveProducer },
    { label: lang === 'en' ? 'INDUSTRY' : 'الصناعة', value: credits.industry },
  ].filter((c) => c.value)

  return (
    <section className="relative bg-black text-white min-h-screen">
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] pt-24 lg:pt-[140px]">
        {/* Left column: description + title */}
        <div
          className="flex flex-col justify-between pl-6 lg:pl-12 pr-0 pb-8 lg:pb-12 shrink-0 w-full lg:w-[455px]"
          style={{ minHeight: '510px' }}
        >
          <p className="text-sm leading-relaxed text-white/80 max-w-[400px]">
            {description}
          </p>
          <SplitTextReveal as="h1" className="text-5xl lg:text-7xl font-bold uppercase mt-8 lg:mt-0">
            {title}
          </SplitTextReveal>
        </div>

        {/* Right: Horizontal scrolling video carousel */}
        <div className="flex-1 overflow-hidden relative" style={{ marginLeft: 'calc(470px - 455px)' }}>
          <div
            ref={carouselRef}
            className="flex items-center gap-0 overflow-x-auto h-full pl-0 pr-4 lg:pr-8 scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {videos.map((video, i) => {
              const vimeoId = getVimeoId(video.url)
              const vimeoHash = getVimeoHash(video.url)

              return (
                <div
                  key={i}
                  data-video-item
                  className="relative shrink-0 rounded-sm overflow-hidden transition-transform duration-300 ease-out"
                  style={{
                    width: '800px',
                    height: '450px',
                    transform: `scale(${scales[i] ?? 1})`,
                    scrollSnapAlign: 'center',
                  }}
                >
                  {vimeoId ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}${vimeoHash ? `?h=${vimeoHash}` : ''}${vimeoHash ? '&' : '?'}badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={video.title || `Video ${i + 1}`}
                    />
                  ) : (
                    <video
                      src={video.url}
                      poster={video.thumbnail}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause()
                        e.currentTarget.currentTime = 0
                      }}
                      aria-label={video.title || `Video ${i + 1}`}
                    />
                  )}
                  {/* Play button overlay - only for non-vimeo videos */}
                  {!vimeoId && i === activeIndex && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 rounded-full border-2 border-white/50 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Credits bar */}
      {creditItems.length > 0 && (
        <div className="border-white/20 px-6 lg:px-12 py-6">
          <div className="grid grid-cols-3" style={{ rowGap: '24px', columnGap: '13.5rem' }}>
            {creditItems.map((credit, i) => (
              <div key={i} className="flex items-center gap-3" style={{ width: '320px', height: '20px' }}>
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  {credit.label}
                </span>
                <span className="flex-1 h-px bg-white/40 shrink-0" aria-hidden="true" />
                <span className="text-xs text-white/70 whitespace-nowrap">
                  {credit.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
