'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register plugins at module level — runs once on import, before any useEffect
gsap.registerPlugin(ScrollTrigger, SplitText)

interface SplitTextRevealProps {
  children: React.ReactNode
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Split by 'chars', 'words', or 'chars,words' */
  splitType?: 'chars' | 'words' | 'chars,words'
  /** Animation duration per element */
  duration?: number
  /** Stagger delay between elements */
  stagger?: number
  /** Y offset to animate from */
  yOffset?: number
  /** Delay before animation starts */
  delay?: number
  className?: string
  style?: React.CSSProperties
  id?: string
}

export default function SplitTextReveal({
  children,
  as: Tag = 'h2',
  splitType = 'chars',
  duration = 0.6,
  stagger = 0.02,
  yOffset = 40,
  delay = 0,
  className,
  style,
  id,
}: SplitTextRevealProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const split = SplitText.create(el, { type: splitType })
    const targets = splitType.includes('chars') ? split.chars : split.words

    gsap.set(targets, { y: yOffset, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      trigger.kill()
      split.revert()
    }
  }, [splitType, duration, stagger, yOffset, delay])

  return (
    <Tag
      ref={elementRef as any}
      className={className}
      style={style}
      id={id}
    >
      {children}
    </Tag>
  )
}
