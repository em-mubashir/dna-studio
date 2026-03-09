'use client'

import type { Language } from '@/src/lib/utils/language';

interface AboutSectionProps {
  lang: Language;
  label?: string;
  heading?: string;
  image?: any;
  description?: string;
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
  description 
}: AboutSectionProps) {
  // Don't render if required content is missing
  if (!heading || !description) {
    return null;
  }

  const imageUrl = image && typeof image === 'object' && 'url' in image ? image.url : null;

  return (
    <section className="w-full bg-black py-20 md:py-32">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Label - Left Side */}
          {label && (
            <div style={{ width: '200px', flexShrink: 0 }}>
              <p 
                className="text-[20px] text-white"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400 }}
              >
                {label}
              </p>
            </div>
          )}

          {/* Content - Right Side - Fixed 1368px container */}
          <div 
          style={{ width: '1368px', maxWidth: '100%' }}>
            {/* Heading */}
            <h2 
              className="text-[40px] md:text-[80px] uppercase text-white mb-12"
              style={{ 
                fontFamily: 'Degular, sans-serif',
                fontWeight: 700,
                lineHeight: '1.0',
                width: '100%',
                maxWidth: '1368px',
                paddingLeft: '150px',
                paddingRight: '120px'
              }}
            >
              {heading}
            </h2>

            {/* Image */}
            {imageUrl && (
              <div 
              style={{ height: '618px', width: '100%', maxWidth: '1368px' }}>
                <img
                  src={imageUrl}
                  alt={label || 'About'}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Body Text */}
            <div 
              className="text-[24px] md:text-[40px] uppercase text-white"
              style={{ 
                fontFamily: 'Degular, sans-serif',
                fontWeight: 700,
                lineHeight: '1.2',
                width: '100%',
                maxWidth: '1368px',
                paddingLeft: '150px',
                paddingRight: '120px'
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
