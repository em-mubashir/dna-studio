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
    <section className="relative w-full h-[600px] md:h-[1080px] bg-black overflow-hidden">
      {/* Background Image */}
      {bgImageUrl && (
        <div className="absolute inset-0">
          <img
            src={bgImageUrl}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end justify-start px-4 md:px-12 pb-20">
        <div className="flex items-center gap-8 md:gap-12">
          {/* Headline */}
          <h2 
            className="text-[40px] md:text-[80px] uppercase text-white max-w-[581px]"
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
            className="w-[72px] h-[72px] bg-white rounded-[11.816px] flex items-center justify-center hover:scale-110 transition-transform duration-300"
            aria-label={isArabic ? 'اتصل بنا' : 'Contact us'}
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform rotate-45"
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
          <div className="absolute bottom-20 md:bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden opacity-80">
            <img
              src={circleImageUrl}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
