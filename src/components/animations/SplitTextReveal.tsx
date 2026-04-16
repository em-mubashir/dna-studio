'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register plugins at module level — runs once on import, before any useEffect
gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Fisher-Yates shuffle — returns a new array with indices in random order.
 */
function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

interface SplitTextRevealProps {
  children: React.ReactNode
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Animation duration per character reveal */
  duration?: number
  /** Total time spread across which all characters appear (seconds) */
  totalDuration?: number
  /** Delay before animation starts */
  delay?: number
  className?: string
  style?: React.CSSProperties
  id?: string
}

export default function SplitTextReveal({
  children,
  as: Tag = 'h2',
  duration = 0.2,
  totalDuration = 0.6,
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

    const split = SplitText.create(el, { type: 'chars' })
    const chars = split.chars

    // Hide all characters initially
    gsap.set(chars, { opacity: 0 })

    // Build a random reveal order
    const order = shuffledIndices(chars.length)
    const staggerGap = chars.length > 1 ? totalDuration / (chars.length - 1) : 0

    const tl = gsap.timeline({ delay })

    // Add each character tween at its randomised position in time
    order.forEach((charIndex, i) => {
      tl.to(
        chars[charIndex],
        { opacity: 1, duration, ease: 'power2.out' },
        i * staggerGap // position on the timeline
      )
    })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tl.play(),
    })

    // Pause until scroll triggers it
    tl.pause()

    return () => {
      trigger.kill()
      tl.kill()
      split.revert()
    }
  }, [duration, totalDuration, delay])

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
