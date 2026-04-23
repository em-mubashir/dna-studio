'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Language } from '@/src/lib/utils/language'
import Footer from './Footer'

interface ConditionalFooterProps {
  lang: Language
  footerData: any
}

export default function ConditionalFooter({ lang, footerData }: ConditionalFooterProps) {
  const pathname = usePathname()
  const footerRef = useRef<HTMLDivElement>(null)
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const footerEl = footerRef.current

    // Measure footer height and set spacer
    const updateHeight = () => {
      const h = footerEl.offsetHeight
      setFooterHeight(h)
    }
    updateHeight()

    // Initial state: card look with scale down and rounded corners
    gsap.set(footerEl, {
      scale: 0.9,
      borderRadius: '24px 24px 0 0',
      overflow: 'hidden',
      transformOrigin: 'center bottom',
    })

    // ScrollTrigger: use the spacer div as trigger
    // When spacer scrolls into view, animate the fixed footer
    const trigger = ScrollTrigger.create({
      trigger: '.footer-spacer',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const scaleVal = 0.9 + (0.1 * progress)
        const radiusVal = 24 * (1 - progress)
        gsap.set(footerEl, {
          scale: scaleVal,
          borderRadius: `${radiusVal}px ${radiusVal}px 0 0`,
        })
      },
    })

    // Recalculate on resize
    const onResize = () => {
      updateHeight()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [pathname])

  // Hide footer on contact page and work detail pages
  const isContactPage = pathname.includes('/contact')
  const isWorkDetailPage = /\/works\/[^/]+/.test(pathname)

  if (isContactPage || isWorkDetailPage) return null

  return (
    <>
      {/* Spacer: pushes content up by footer height so footer is revealed underneath */}
      <div className="footer-spacer" style={{ height: footerHeight }} />
      {/* Fixed footer sits at the bottom of viewport */}
      <div
        ref={footerRef}
        className="footer-reveal-fixed"
      >
        <Footer lang={lang} footerData={footerData} />
      </div>
    </>
  )
}
