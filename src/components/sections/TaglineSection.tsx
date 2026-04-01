import Link from 'next/link';
import type { Language } from '@/src/lib/utils/language';

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
    <section className="w-full bg-black py-20 md:py-32">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        <div className="max-w-[902px]">
          <h2 
            className="text-[40px] md:text-[80px] uppercase text-white"
            style={{ 
              fontFamily: 'Degular, sans-serif',
              fontWeight: 700,
              lineHeight: '1.0',
              textAlign: 'justify'
            }}
          >
            {text}
          </h2>
        </div>
        
        {/* View All Works Button */}
        <div className="mt-64 text-center">
          <Link 
            href={`/${lang}${btnLink}`}
            className="inline-block font-bold text-[24px] uppercase text-white hover:text-white/80 transition-colors"
            style={{ fontFamily: 'Degular, sans-serif' }}
          >
            {btnText}
          </Link>
        </div>
      </div>
    </section>
  );
}
