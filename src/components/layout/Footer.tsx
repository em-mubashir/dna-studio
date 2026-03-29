import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/src/lib/utils/language';

interface FooterProps {
  lang: Language;
  footerData?: any;
}

/**
 * Footer component - Figma Design Implementation
 * 
 * Desktop: 1920px × 574px
 * Background: #000000
 * Padding: 48px
 * 3 columns layout with border-top
 */
export default function Footer({ lang, footerData }: FooterProps) {
  const isArabic = lang === 'ar';

  // Get footer content from CMS or use defaults
  const officeHeading = isArabic 
    ? (footerData?.office_heading_ar || 'المكتب')
    : (footerData?.office_heading_en || 'OFFICE');
  
  const mailHeading = isArabic 
    ? (footerData?.mail_heading_ar || 'راسلنا')
    : (footerData?.mail_heading_en || 'MAIL US');
  
  const followHeading = isArabic 
    ? (footerData?.follow_heading_ar || 'تابعنا')
    : (footerData?.follow_heading_en || 'FOLLOW US');

  const copyright = isArabic
    ? (footerData?.copyright_ar || '© DNA - جميع الحقوق محفوظة')
    : (footerData?.copyright_en || '© DNA - ALL RIGHTS RESERVED');

  const terms = isArabic
    ? (footerData?.terms_ar || 'الشروط العامة')
    : (footerData?.terms_en || 'GENERAL TERMS');

  const emails = footerData?.emails || [];
  const socialLinks = footerData?.socialLinks || [];
  const backgroundImage = footerData?.background_image;
  const termsLink = footerData?.terms_link;

  // Get background image URL
  const bgImageUrl = backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage
    ? backgroundImage.url
    : '/footer-background.jpg';

  return (
    <footer className="relative w-full h-[574px] bg-black">
      <div className="relative h-full px-4 md:px-12 pt-12">
        {/* Three Columns */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full max-w-[1825px] mx-auto">
          {/* Office */}
          <div className="flex-1 border-t border-white/50 pt-8 flex flex-col gap-4">
            <h3 
              className="font-bold text-[24px] uppercase text-white"
              style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
            >
              {officeHeading}
            </h3>
            <div 
              style={{ 
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '0%',
                color: '#FFFFFF'
              }}
            >
              {/* Office address from contact settings */}
              <p style={{ whiteSpace: 'pre-line' }}>
                {isArabic ? footerData?.address_ar : footerData?.address_en}
              </p>
            </div>
          </div>

          {/* Mail Us */}
          <div className="flex-1 border-t border-white/50 pt-8 flex flex-col gap-4">
            <h3 
              className="font-bold text-[24px] uppercase text-white"
              style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
            >
              {mailHeading}
            </h3>
            <div 
              style={{ 
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '0%',
                color: '#FFFFFF'
              }}
            >
              {emails.map((item: any, index: number) => (
                <p key={index}>
                  <a href={`mailto:${item.email}`} className="hover:text-white/80 transition-colors">
                    {item.email}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex-1 border-t border-white/50 pt-8 flex flex-col gap-4">
            <h3 
              className="font-bold text-[24px] uppercase text-white"
              style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
            >
              {followHeading}
            </h3>
            <div 
              style={{ 
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '140%',
                letterSpacing: '0%',
                color: '#FFFFFF'
              }}
            >
              {socialLinks.map((item: any, index: number) => (
                <p key={index}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white/80 transition-colors"
                  >
                    {item.platform}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute top-[263px] left-4 md:left-12 right-4 md:right-12 flex flex-col md:flex-row justify-between gap-4 z-10">
          <p 
            className="font-bold text-[16px] uppercase text-white"
            style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.2' }}
          >
            {copyright}
          </p>
          {termsLink ? (
            <Link 
              href={`/${lang}${termsLink}`}
              className="font-bold text-[16px] uppercase text-white hover:text-white/80 transition-colors"
              style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.2' }}
            >
              {terms}
            </Link>
          ) : (
            <p 
              className="font-bold text-[16px] uppercase text-white"
              style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.2' }}
            >
              {terms}
            </p>
          )}
        </div>

        {/* Background Image - Exact Figma Specs */}
        <div className="absolute top-[313px] left-4 md:left-[-194px] right-4 md:right-12 h-[213px] w-auto md:w-[1908px] md:mx-auto">
          <div className="relative w-full h-full">
            <Image
              src={bgImageUrl}
              alt=""
              fill
              className="object-cover"
              style={{ opacity: 1 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
