'use client'

import Image from 'next/image';
import type { Language } from '@/src/lib/utils/language';
import { getImageUrl } from '@/src/lib/utils/image';
import SplitTextReveal from '@/src/components/animations/SplitTextReveal';

interface AboutSectionProps {
  lang: Language;
  label?: string;
  heading?: string;
  image?: any;
  description?: string;
  reverseSizes?: boolean;
}

/**
 * About Section - CMS Driven
 * Content managed through Settings > About Section
 */
export default function AboutSection({ 
  lang, 
  label,
  heading,
  image,
  description,
  reverseSizes = false,
}: AboutSectionProps) {
  // Don't render if required content is missing
  if (!heading || !description) {
    return null;
  }

  const imageUrl = getImageUrl(image);

  const headingSize = reverseSizes ? 'text-[18px] sm:text-[24px] md:text-[40px]' : 'text-[24px] sm:text-[32px] md:text-[48px] lg:text-[60px]';
  const descSize = reverseSizes ? 'text-[24px] sm:text-[32px] md:text-[48px] lg:text-[60px]' : 'text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px]';

  return (
    <section className="w-full bg-black py-12 md:py-16 lg:py-20">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-48">
          {/* Label - Left Side */}
          {label && (
            <div className="md:w-[200px] md:flex-shrink-0">
              <p 
                className="text-[16px] md:text-[20px] text-white"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400 }}
              >
                {label}
              </p>
            </div>
          )}

          {/* Content - Right Side */}
          <div className="w-full max-w-[1368px]">
            {/* Heading */}
            <SplitTextReveal 
              as="h2"
              className={`${headingSize} uppercase text-white mb-6 md:mb-12`}
              style={{ 
                fontFamily: 'Degular, sans-serif',
                fontWeight: 700,
                lineHeight: '1.0',
              }}
            >
              {heading}
            </SplitTextReveal>

            {/* Image */}
            {imageUrl && (
              <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[420px]">
                <Image
                  src={imageUrl}
                  alt={label || 'About'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1368px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Body Text */}
            <div 
              className={`${descSize} uppercase text-white mt-6 md:mt-0`}
              style={{ 
                fontFamily: 'Degular, sans-serif',
                fontWeight: 700,
                lineHeight: '1.2',
              }}
            >
              <p>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
