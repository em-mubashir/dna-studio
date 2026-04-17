'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import type { Language } from '@/src/lib/utils/language';
import { getImageUrl } from '@/src/lib/utils/image';

interface FeaturedWorkSectionProps {
  lang: Language;
  projectNumber?: string;
  serviceType?: string;
  projectTitle?: string;
  backgroundImage?: any;
  backgroundVideo?: string;
  projectLink?: string;
  soundOnText?: string;
  soundOffText?: string;
}

/**
 * Featured Work Section - Figma Design
 * Size: 1824px × 920px
 * Background: Video/image with overlay
 * Elements: Project number, Service type, Project title, Sound toggle
 */
export default function FeaturedWorkSection({
  lang,
  projectNumber = '01',
  serviceType,
  projectTitle,
  backgroundImage,
  backgroundVideo,
  projectLink,
  soundOnText,
  soundOffText,
}: FeaturedWorkSectionProps) {
  const [soundOn, setSoundOn] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const isArabic = lang === 'ar';

  // Get background image URL
  const bgImageUrl = getImageUrl(backgroundImage);

  // Default texts
  const displayServiceType = serviceType || (isArabic ? 'خدمة' : 'SERVICE');
  const displayProjectTitle = projectTitle || (isArabic ? 'عنوان المشروع' : 'PROJECT TITLE');
  const displaySoundOn = soundOnText || (isArabic ? 'الصوت مفعل' : 'SOUND ON');
  const displaySoundOff = soundOffText || (isArabic ? 'الصوت مغلق' : 'SOUND OFF');

  const content = (
    <div className="relative w-full max-w-[1824px] h-[300px] sm:h-[450px] md:h-[650px] lg:h-[920px] mx-auto overflow-hidden group border border-white/10">
      {/* Background Image - Always show if available */}
      {bgImageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}

      {/* Background Video (Vimeo) - Overlay on top of image */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <iframe
            ref={videoRef}
            src={`https://player.vimeo.com/video/${backgroundVideo}?background=1&autoplay=1&loop=1&muted=${!soundOn ? '1' : '0'}&controls=0`}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
            style={{ aspectRatio: '16/9' }}
            allow="autoplay; fullscreen"
            title={displayProjectTitle}
            aria-hidden="true"
          />
        </div>
      )}
      
      {/* Overlay - Subtle dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/50 group-hover:from-black/40 group-hover:to-black/60 transition-all duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 md:p-10">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          {/* Project Number - Top Left */}
          <span 
            className="text-white text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] leading-none uppercase tracking-wide"
            style={{ fontFamily: 'Degular, sans-serif', fontWeight: 700 }}
          >
            {projectNumber}
          </span>

          {/* Service Type - Top Right */}
          <span 
            className="text-white text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] leading-none uppercase tracking-wide"
            style={{ fontFamily: 'Degular, sans-serif', fontWeight: 700 }}
          >
            {displayServiceType}
          </span>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-end">
          {/* Project Title - Bottom Left */}
          <h3 
            className="text-white text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] leading-tight uppercase tracking-wide max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
            style={{ fontFamily: 'Degular, sans-serif', fontWeight: 700 }}
          >
            {displayProjectTitle}
          </h3>

          {/* Sound Toggle - Bottom Right (only show if video exists) */}
          {backgroundVideo && (
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="text-white text-[14px] sm:text-[18px] md:text-[24px] lg:text-[32px] leading-none uppercase tracking-wide hover:opacity-70 transition-opacity duration-300"
              style={{ fontFamily: 'Degular, sans-serif', fontWeight: 700 }}
              aria-label={soundOn ? displaySoundOn : displaySoundOff}
            >
              {soundOn ? displaySoundOn : displaySoundOff}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-black py-4 md:py-8">
      <div className="px-4 md:px-12 max-w-[1920px] mx-auto">
        {projectLink ? (
          <Link href={`/${lang}${projectLink}`} className="block cursor-pointer">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </section>
  );
}
