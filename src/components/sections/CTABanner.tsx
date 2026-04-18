'use client'

import SplitTextReveal from '@/src/components/animations/SplitTextReveal'
import AnimatedButton from '@/src/components/ui/AnimatedButton'

interface CTABannerProps {
  heading: string
  buttonLink?: string
  lang: string
}

export default function CTABanner({ heading, buttonLink = '/contact', lang }: CTABannerProps) {
  if (!heading) return null

  return (
    <section className="bg-black">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 md:gap-10 py-12 px-5 sm:py-16 sm:px-8 md:py-[80px] md:pl-[48px]">
        <SplitTextReveal
          as="h2"
          className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-bold text-white uppercase leading-[0.95] max-w-full sm:max-w-[581px]"
          style={{ fontFamily: 'Degular, sans-serif' }}
        >
          {heading}
        </SplitTextReveal>

        <AnimatedButton
          href={`/${lang}${buttonLink}`}
          className="shrink-0 w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] md:w-[72px] md:h-[72px] rounded-[11px]"
          ariaLabel={lang === 'ar' ? 'اتصل بنا' : 'Contact us'}
          variant="dark"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transform rotate-[-45deg] sm:w-[32px] sm:h-[32px] md:w-[48px] md:h-[48px]"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </AnimatedButton>
      </div>
    </section>
  )
}
