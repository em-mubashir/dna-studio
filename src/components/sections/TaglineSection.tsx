'use client'

import type { Language } from '@/src/lib/utils/language';
import SplitTextReveal from '@/src/components/animations/SplitTextReveal';
import AnimatedButton from '@/src/components/ui/AnimatedButton';

interface TaglineSectionProps {
  lang: Language;
  taglineText?: string;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * Tagline Section - Figma Design
 * Position: 1330px from top
 * Width: 902px
 * Text: "One Frame at a Time. Your Full-Fledged Creative and Production Partner."
 * Font: Degular Bold, 80px, uppercase
 */
export default function TaglineSection({ 
  lang, 
  taglineText, 
  buttonText, 
  buttonLink 
}: TaglineSectionProps) {
  const isArabic = lang === 'ar';

  // Use CMS content or fallback to defaults
  const text = taglineText || (isArabic 
    ? 'إطار واحد في كل مرة. شريكك الإبداعي والإنتاجي المتكامل.'
    : 'ONE FRAME AT A TIME. YOUR FULL-FLEDGED CREATIVE AND PRODUCTION PARTNER.');

  const btnText = buttonText || (isArabic ? 'عرض جميع الأعمال' : 'VIEW ALL WORKS');
  const btnLink = buttonLink || '/works';

  return (
    <section className="w-full bg-black py-12 md:py-20 lg:py-32">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        <div className="max-w-full md:max-w-[902px]">
          <SplitTextReveal 
            as="h2"
            className="text-[28px] sm:text-[40px] md:text-[60px] lg:text-[80px] uppercase text-white"
            style={{ 
              fontFamily: 'Degular, sans-serif',
              fontWeight: 700,
              lineHeight: '1.0',
              textAlign: 'justify'
            }}
          >
            {text}
          </SplitTextReveal>
        </div>
        
        {/* View All Works Button */}
        <div className="mt-16 md:mt-32 lg:mt-64 text-center">
          <AnimatedButton 
            href={`/${lang}${btnLink}`}
            className="px-8 py-3 rounded-full font-bold text-[18px] md:text-[24px] uppercase"
            style={{ fontFamily: 'Degular, sans-serif' }}
            variant="dark"
          >
            {btnText}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
