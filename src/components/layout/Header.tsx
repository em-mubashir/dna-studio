'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Language } from '@/src/lib/utils/language';

interface MenuItem {
  label_en: string;
  label_ar: string;
  description_en?: string | null;
  description_ar?: string | null;
  url: string;
  order: number;
}

interface HeaderProps {
  lang: Language;
  menuItems?: MenuItem[];
  logo?: any;
  logoAlt?: string;
}

/**
 * Header component - Figma Design Implementation
 * 
 * Desktop: 1920px × 120px
 * Mobile: 393px × 72px
 * Background: #000000
 * Border-bottom: 1px solid rgba(255, 255, 255, 0.5)
 * Padding: 0 48px (desktop), 0 16px (mobile)
 */
export default function Header({ lang, menuItems = [], logo, logoAlt }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isArabic = lang === 'ar';

  // Sort menu items by order
  const sortedMenuItems = [...menuItems].sort((a, b) => a.order - b.order);

  // Get logo URL from CMS or use default
  const logoUrl = logo && typeof logo === 'object' && 'url' in logo
    ? logo.url
    : '/dna-logo-white.svg';

  const logoAltText = logoAlt || 'DNA Studio';

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[72px] md:h-[120px] bg-black border-b border-white/50 z-50">
        <div className="h-full flex items-center justify-between px-4 md:px-12">
          {/* Logo */}
          <Link href={`/${lang}`} className="relative w-[84.35px] h-5 md:w-[97px] md:h-[23px]">
            <Image
              src={logoUrl}
              alt={logoAltText}
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation - Right Side */}
          <div className="flex items-center gap-8">
            {/* Language Switcher */}
            <div className="flex items-center gap-[11px]">
              <Link
                href={pathname.replace(`/${lang}`, '/en')}
                className={`font-bold text-[24px] uppercase transition-colors ${
                  lang === 'en' ? 'text-white' : 'text-white/50'
                }`}
                style={{ fontFamily: 'Degular, sans-serif' }}
              >
                ENGLISH
              </Link>
              <div className="w-px h-[23px] bg-white/50" />
              <Link
                href={pathname.replace(`/${lang}`, '/ar')}
                className={`font-bold text-[24px] uppercase transition-colors ${
                  lang === 'ar' ? 'text-white' : 'text-white/50'
                }`}
                style={{ fontFamily: 'Degular, sans-serif' }}
              >
                ARABIC
              </Link>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-6 flex flex-col justify-between"
              aria-label="Toggle menu"
            >
              <span className="w-full h-0.5 bg-white transition-transform" />
              <span className="w-full h-0.5 bg-white transition-transform" />
              <span className="w-full h-0.5 bg-white transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 top-[72px] md:top-[120px] bg-black/95 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <nav className="px-4 md:px-12 py-4 md:py-4 flex flex-col items-center gap-0">
            {sortedMenuItems.map((item, index) => {
              // Normalize: handle full URLs, relative paths, strip lang prefix
              let cleanUrl = (item.url || '').trim()
              
              // Strip full URL origin if present (e.g. http://localhost:3000/en/works -> /en/works)
              cleanUrl = cleanUrl.replace(/^https?:\/\/[^/]+/, '')
              
              // Strip leading slash and language prefix
              cleanUrl = cleanUrl.replace(/^\//, '').replace(/^(en|ar)(\/|$)/, '')
              
              const isHome = cleanUrl === '' || cleanUrl === 'home'
              const href = isHome ? `/${lang}` : `/${lang}/${cleanUrl}`
              return (
                <MenuItem 
                  key={index}
                  href={href} 
                  label={isArabic ? item.label_ar : item.label_en} 
                  description={isArabic ? (item.description_ar || '') : (item.description_en || '')} 
                />
              )
            })}
          </nav>
        </div>
      )}
    </>
  );
}

function MenuItem({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex justify-between items-center border-b border-white/50 group"
      style={{
        width: '100%',
        maxWidth: '1824px',
        height: '120px',
        opacity: 1,
      }}
    >
      <span 
        className="uppercase text-white group-hover:text-white/80 transition-colors"
        style={{ 
          fontFamily: 'Degular, sans-serif',
          fontWeight: 700,
          fontSize: '80px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
      <span 
        className="text-white/50 group-hover:text-white transition-colors"
        style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '24px' }}
      >
        {description}
      </span>
    </Link>
  );
}
