'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
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

  const bgImageUrl = getImageUrl(backgroundImage);

  const service = serviceType || (isArabic ? 'خدمة' : 'SERVICE');
  const title = projectTitle || (isArabic ? 'عنوان المشروع' : 'PROJECT TITLE');
  const soundOnLabel = soundOnText || (isArabic ? 'الصوت مفعل' : 'SOUND ON');
  const soundOffLabel = soundOffText || (isArabic ? 'الصوت مغلق' : 'SOUND OFF');

  if (!bgImageUrl) return null;

  const card = (
    <div className="w-full border border-white/10 overflow-hidden">
      {/* Outer wrapper sets the aspect ratio via padding-bottom so the
          container always has a real height for the absolute children. */}
      <div className="relative w-full" style={{ paddingBottom: '42%' /* reduced from 50.44% */ }}>
        {/* Image layer */}
        <div className="absolute inset-0">
          <Image
            src={bgImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1824px"
            className="object-cover"
            priority
          />
        </div>

        {/* Vimeo video layer */}
        {backgroundVideo && (
          <div className="absolute inset-0 z-[1]">
            <iframe
              ref={videoRef}
              src={`https://player.vimeo.com/video/${backgroundVideo}?background=1&autoplay=1&loop=1&muted=${soundOn ? '0' : '1'}&controls=0`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
              style={{ aspectRatio: '16/9' }}
              allow="autoplay; fullscreen"
              title={title}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

        {/* Corner labels */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-between p-4 md:p-8">
          <div className="flex justify-between items-start">
            <span
              className="text-white text-base md:text-2xl lg:text-[32px] font-bold uppercase leading-none"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {projectNumber}
            </span>
            <span
              className="text-white text-base md:text-2xl lg:text-[32px] font-bold uppercase leading-none"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {service}
            </span>
          </div>

          <div className="flex justify-between items-end">
            <h3
              className="text-white text-base md:text-2xl lg:text-[32px] font-bold uppercase leading-tight"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {title}
            </h3>

            {backgroundVideo ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSoundOn(!soundOn);
                }}
                className="text-white text-sm md:text-xl lg:text-[32px] font-bold uppercase leading-none hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Degular, sans-serif' }}
                aria-label={soundOn ? soundOnLabel : soundOffLabel}
              >
                {soundOn ? soundOnLabel : soundOffLabel}
              </button>
            ) : (
              <span
                className="text-white text-sm md:text-xl lg:text-[32px] font-bold uppercase leading-none"
                style={{ fontFamily: 'Degular, sans-serif' }}
              >
                {soundOffLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-black px-4 md:px-12">
      {projectLink ? (
        <Link href={`/${lang}${projectLink}`} className="block">
          {card}
        </Link>
      ) : (
        card
      )}
    </section>
  );
}
