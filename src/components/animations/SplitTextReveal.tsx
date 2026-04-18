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
  children?: React.ReactNode
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
  /** Render raw HTML (e.g. text with <br> tags from CMS) */
  dangerouslySetInnerHTML?: { __html: string }
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
  dangerouslySetInnerHTML,
}: SplitTextRevealProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const split = SplitText.create(el, { type: 'lines, chars', mask: 'lines' })
    const chars = split.chars

    // Hide all characters initially
    gsap.set(chars, { opacity: 0 })

    // Build a random reveal order
    const order = shuffledIndices(chars.length)
    const staggerGap = chars.length > 1 ? totalDuration / (chars.length - 1) : 0

    // Create timeline paused from the start to avoid race conditions
    const tl = gsap.timeline({ delay, paused: true })

    // Add each character tween at its randomised position in time
    order.forEach((charIndex, i) => {
      tl.to(
        chars[charIndex],
        { opacity: 1, duration, ease: 'power2.out' },
        i * staggerGap // position on the timeline
      )
    })

    // Ensure all chars become visible when the timeline completes,
    // as a safety net against any edge-case where a char stays hidden
    tl.eventCallback('onComplete', () => {
      gsap.set(chars, { opacity: 1 })
    })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tl.play(),
    })

    // If the element is already in the viewport on mount, ScrollTrigger
    // may not fire onEnter. Detect this and play immediately.
    // Use a rAF to let the browser finish layout first.
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight * 0.85
      if (inViewport && tl.paused() && tl.progress() === 0) {
        tl.play()
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      trigger.kill()
      tl.kill()
      split.revert()
    }
  }, [duration, totalDuration, delay])

  if (dangerouslySetInnerHTML) {
    return (
      <Tag
        ref={elementRef as any}
        className={className}
        style={style}
        id={id}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    )
  }

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
