'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'

interface AnimatedButtonProps {
  /** Link destination — renders <Link> when provided, otherwise <button> */
  href?: string
  /** Button type when rendering as <button> */
  type?: 'button' | 'submit' | 'reset'
  /** Visible label */
  children: React.ReactNode
  /** Extra classes on the outer element */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Accessible label */
  ariaLabel?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  /**
   * Colour scheme
   * - "dark"  → default white border/text, fills black→white on hover (text flips to black)
   * - "light" → default black border/text, fills white→black on hover (text flips to white)
   */
  variant?: 'dark' | 'light'
}

/**
 * Animated button inspired by Brave Brand.
 *
 * On hover a radial fill expands from the cursor position and the text
 * colour inverts. Uses a CSS custom-property trick so the fill origin
 * follows the mouse.
 */
export default function AnimatedButton({
  href,
  type = 'button',
  children,
  className = '',
  style,
  ariaLabel,
  disabled,
  onClick,
  variant = 'dark',
}: AnimatedButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }, [])

  // Shared props
  const sharedProps = {
    ref,
    className: `animated-btn ${variant === 'light' ? 'animated-btn--light' : 'animated-btn--dark'} ${className}`.trim(),
    style,
    'aria-label': ariaLabel,
    onMouseMove: handleMouseMove,
    onClick,
  }

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        <span className="animated-btn__label">{children}</span>
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} {...sharedProps}>
      <span className="animated-btn__label">{children}</span>
    </button>
  )
}
