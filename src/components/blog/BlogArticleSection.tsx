'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import SplitTextReveal from '@/src/components/animations/SplitTextReveal'

interface ContentBlock {
  heading: string
  paragraph: string
}

interface BlogArticleSectionProps {
  description: string
  mainHeading: string
  mainImageUrl: string | null
  mainImageAlt: string
  blocks: ContentBlock[]
  lang: string
}

export default function BlogArticleSection({
  description,
  mainHeading,
  mainImageUrl,
  mainImageAlt,
  blocks,
  lang,
}: BlogArticleSectionProps) {
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const articleRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const el = articleRef.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight
      const scrolled = Math.max(0, -rect.top)
      const pct = Math.min(100, Math.round((scrolled / (total - window.innerHeight)) * 100))
      setProgress(Math.max(0, pct))

      let current = -1
      blockRefs.current.forEach((ref, i) => {
        if (ref) {
          const r = ref.getBoundingClientRect()
          if (r.top < window.innerHeight * 0.4) current = i
        }
      })
      setActiveIndex(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBlock = (index: number) => {
    const el = blockRefs.current[index]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const forewordLabel = lang === 'ar' ? 'مقدمة' : 'FOREWORD'
  const readLabel = lang === 'ar' ? 'من المقال' : 'of article read'

  return (
    <section className="px-4 md:px-12 py-12 md:py-20" ref={articleRef}>
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left Sidebar — sticky */}
        <aside className="md:w-[590px] shrink-0">
          <div className="md:sticky md:top-[140px]">
            {/* Reading progress */}
            <div className="mb-8 p-5 border border-white/10 rounded-sm">
              <p className="text-white/60 text-sm mb-2">
                {progress}% {readLabel}
              </p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* TOC nav */}
            <nav className="p-5 border border-white/10 rounded-sm flex flex-col gap-3">
              <span className="text-white/40 text-xs uppercase tracking-wider">{forewordLabel}</span>
              {blocks.map((block, i) => (
                <button
                  key={i}
                  onClick={() => scrollToBlock(i)}
                  className={`text-left text-sm uppercase font-bold transition-colors ${
                    activeIndex === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {block.heading}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {/* 1. Description */}
          {description && (
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">
              {description}
            </p>
          )}

          {/* 2. Main Heading */}
          {mainHeading && (
            <SplitTextReveal
              as="h2"
              className="text-white text-xl md:text-3xl font-bold uppercase mb-6"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {mainHeading}
            </SplitTextReveal>
          )}

          {/* 3. Main Image */}
          {mainImageUrl && (
            <div className="relative w-full aspect-video mb-12 overflow-hidden rounded-sm">
              <Image
                src={mainImageUrl}
                alt={mainImageAlt || mainHeading || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          )}

          {/* 4. Repeatable heading + paragraph blocks */}
          {blocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => { blockRefs.current[i] = el }}
              className="mb-14"
            >
              <SplitTextReveal
                as="h2"
                className="text-white text-lg md:text-xl font-bold uppercase mb-4"
                style={{ fontFamily: 'Degular, sans-serif' }}
              >
                {block.heading}
              </SplitTextReveal>

              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {block.paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
