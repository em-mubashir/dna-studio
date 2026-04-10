'use client'

import Link from 'next/link';
import type { Language } from '@/src/lib/utils/language';

interface CTASectionProps {
  lang: Language;
  heading?: string;
  buttonLink?: string;
  backgroundImage?: any;
  circleImage?: any;
}

/**
 * CTA Section - CMS Driven
 * Content managed through Settings > CTA Section
 */
export default function CTASection({ 
  lang,
  heading,
  buttonLink,
  backgroundImage,
  circleImage
}: CTASectionProps) {
  const isArabic = lang === 'ar';

  // Don't render if required content is missing
  if (!heading) {
    return null;
  }

  const bgImageUrl = backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
    ? backgroundImage.url
    : null;

  const circleImageUrl = circleImage && typeof circleImage === 'object' && 'url' in circleImage
    ? circleImage.url
    : null;

  const ctaLink = buttonLink || '/contact';

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[1080px] bg-black overflow-hidden">
      {/* Background Image */}
      {bgImageUrl && (
        <div className="absolute inset-0">
          <img
            src={bgImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start px-4 md:px-12 pb-10 md:pb-20">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
          {/* Headline */}
          <h2 
            className="text-[24px] sm:text-[32px] md:text-[56px] lg:text-[80px] uppercase text-white max-w-[280px] sm:max-w-[400px] md:max-w-[581px]"
            style={{ 
              fontFamily: 'Degular, sans-serif',
              fontWeight: 700,
              lineHeight: '1.0'
            }}
          >
            {heading}
          </h2>

          {/* CTA Button */}
          <Link
            href={`/${lang}${ctaLink}`}
            className="w-[48px] h-[48px] md:w-[72px] md:h-[72px] bg-white rounded-[8px] md:rounded-[11.816px] flex items-center justify-center hover:scale-110 transition-transform duration-300 flex-shrink-0"
            aria-label={isArabic ? 'اتصل بنا' : 'Contact us'}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform rotate-45 md:w-12 md:h-12"
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

        {/* Circular Masked Image */}
        {circleImageUrl && (
          <div className="absolute bottom-10 md:bottom-40 left-1/2 -translate-x-1/2 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden opacity-80">
            <img
              src={circleImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
