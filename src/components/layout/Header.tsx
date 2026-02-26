import Link from 'next/link';
import type { Language } from '@/src/lib/utils/language';

interface HeaderProps {
  lang: Language;
}

/**
 * Header component placeholder
 * 
 * Design specs:
 * - Desktop: Height 80px, transparent background (white with shadow on scroll)
 * - Mobile: Height 64px
 * - Logo: Left aligned
 * - Nav Items: Center (desktop)
 * - Language Switcher: Right
 * - Sticky positioning
 * 
 * TODO (Week 4, Day 16-17):
 * - Add logo from CMS Settings
 * - Create Navigation component integration
 * - Add language switcher
 * - Add mobile menu (hamburger)
 * - Add scroll-based header background
 * - Add header entrance animation
 */
export default function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-20 md:h-20 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo - Left aligned */}
        <div className="flex-shrink-0">
          <Link href={`/${lang}`} className="text-xl font-bold text-primary-500">
            DNA Media
          </Link>
        </div>

        {/* Navigation - Center (desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${lang}`} className="text-gray-700 hover:text-primary-500 transition-colors">
            {lang === 'en' ? 'Home' : 'الرئيسية'}
          </Link>
          <Link href={`/${lang}/about`} className="text-gray-700 hover:text-primary-500 transition-colors">
            {lang === 'en' ? 'About' : 'من نحن'}
          </Link>
          <Link href={`/${lang}/portfolio`} className="text-gray-700 hover:text-primary-500 transition-colors">
            {lang === 'en' ? 'Portfolio' : 'أعمالنا'}
          </Link>
          <Link href={`/${lang}/blog`} className="text-gray-700 hover:text-primary-500 transition-colors">
            {lang === 'en' ? 'Blog' : 'المدونة'}
          </Link>
          <Link href={`/${lang}/contact`} className="text-gray-700 hover:text-primary-500 transition-colors">
            {lang === 'en' ? 'Contact' : 'اتصل بنا'}
          </Link>
        </nav>

        {/* Language Switcher - Right */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${lang === 'en' ? 'ar' : 'en'}`}
            className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </Link>
          
          {/* Mobile menu button placeholder */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary-500"
            aria-label={lang === 'en' ? 'Open menu' : 'فتح القائمة'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
