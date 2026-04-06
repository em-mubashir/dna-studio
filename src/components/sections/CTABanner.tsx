'use client'

import Link from 'next/link'

interface CTABannerProps {
  heading: string
  buttonLink?: string
  lang: string
}

export default function CTABanner({ heading, buttonLink = '/contact', lang }: CTABannerProps) {
  if (!heading) return null

  return (
    <section className="bg-black">
      <div className="flex items-end gap-6 md:gap-10 pt-[80px] pb-[80px] pl-[48px]">
        <h2
          className="text-[32px] sm:text-[48px] md:text-[72px] lg:text-[80px] font-bold text-white uppercase leading-[0.95]"
          style={{ width: '581px', height: '160px', fontFamily: 'Degular, sans-serif' }}
        >
          {heading}
        </h2>

        <Link
          href={`/${lang}${buttonLink}`}
          className="shrink-0 w-[52px] h-[52px] md:w-[72px] md:h-[72px] bg-white rounded-[11px] flex items-center justify-center hover:scale-110 transition-transform duration-300"
          aria-label={lang === 'ar' ? 'اتصل بنا' : 'Contact us'}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="transform rotate-[-45deg] md:w-[48px] md:h-[48px]"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
