'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { Language } from '@/src/lib/utils/language'
import { getImageUrl } from '@/src/lib/utils/image'

interface TimelineItem {
  id: string
  year: number
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  type: 'milestone' | 'award'
  icon?: any
}

interface TimelineSectionProps {
  lang: Language
  items: TimelineItem[]
}

/**
 * Timeline Section — About page
 * Figma: Horizontal scrollable timeline with year markers and award entries
 * Cards: image top, year bold, title + description below
 * Navigation arrows top-right, progress bar at bottom
 */
export default function TimelineSection({ lang, items }: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!items.length) return null

  const isArabic = lang === 'ar'
  const lastIndex = items.length - 1

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[index] as HTMLElement
    if (!card) return
    scrollRef.current.scrollTo({ left: card.offsetLeft - 48, behavior: 'smooth' })
    setActiveIndex(index)
  }

  const goNext = () => scrollToIndex(Math.min(activeIndex + 1, lastIndex))
  const goPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0))

  return (
    <section className="w-full bg-black py-20 md:py-32 overflow-hidden">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        {/* Navigation arrows — top right */}
        <div className="flex justify-end gap-3 mb-10">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="w-[52px] h-[52px] rounded-full border border-white/40 flex items-center justify-center hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={isArabic ? 'السابق' : 'Previous'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === lastIndex}
            className="w-[52px] h-[52px] rounded-full border border-white/40 flex items-center justify-center hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={isArabic ? 'التالي' : 'Next'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable timeline */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-10 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => {
            const iconUrl = getImageUrl(item.icon)

            return (
              <div key={item.id} className="flex-shrink-0 w-[320px] md:w-[450px]">
                {/* Image */}
                {iconUrl && (
                  <div className="relative w-[450px] h-[550px] mb-6 overflow-hidden">
                    <Image
                      src={iconUrl}
                      alt={isArabic ? item.title_ar : item.title_en}
                      fill
                      sizes="450px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Year */}
                <p
                  className="text-white mb-3 uppercase"
                  style={{
                    fontFamily: 'Degular, sans-serif',
                    fontWeight: 700,
                    fontSize: '48px',
                    lineHeight: '110%',
                    letterSpacing: '0%',
                  }}
                >
                  {item.year}
                </p>

                {/* Title */}
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '140%',
                    letterSpacing: '0px',
                  }}
                >
                  {isArabic ? item.title_ar : item.title_en}
                </h3>

                {/* Description */}
                <p
                  className="text-white/60"
                  style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                    lineHeight: '1.5',
                  }}
                >
                  {isArabic ? item.description_ar : item.description_en}
                </p>
              </div>
            )
          })}
        </div>

        {/* Step indicators — one segment per item */}
        <div className="mt-10 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-[2px] flex-1 rounded-full transition-colors duration-300 ${
                i <= activeIndex ? 'bg-white' : 'bg-white/15'
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
