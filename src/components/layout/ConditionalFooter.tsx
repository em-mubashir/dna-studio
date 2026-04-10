'use client'

import { usePathname } from 'next/navigation'
import type { Language } from '@/src/lib/utils/language'
import Footer from './Footer'

interface ConditionalFooterProps {
  lang: Language
  footerData: any
}

export default function ConditionalFooter({ lang, footerData }: ConditionalFooterProps) {
  const pathname = usePathname()

  // Hide footer on contact page and work detail pages
  const isContactPage = pathname.includes('/contact')
  const isWorkDetailPage = /\/works\/[^/]+/.test(pathname)

  if (isContactPage || isWorkDetailPage) return null

  return <Footer lang={lang} footerData={footerData} />
}
