'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(SplitText)
  }, [])

  return <>{children}</>
}
