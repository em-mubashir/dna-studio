'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface GrayscaleRevealProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  /** Radius of the color reveal circle in pixels */
  radius?: number
  /** Additional className for the images (e.g. group-hover:scale-105) */
  imageClassName?: string
}

/**
 * Renders a grayscale image that reveals original colors
 * in a circular area around the cursor on hover.
 */
export default function GrayscaleReveal({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  radius = 100,
  imageClassName = '',
}: GrayscaleRevealProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const maskStyle: React.CSSProperties = isHovering
    ? {
        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 70%, black 100%)`,
        maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 70%, black 100%)`,
      }
    : {}

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Bottom layer: original color image */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </div>

      {/* Top layer: grayscale image with mask hole at cursor */}
      <div className="absolute inset-0" style={maskStyle}>
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className={`object-cover grayscale ${imageClassName}`}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
