import { notFound } from 'next/navigation';
import { isValidLanguage, getLanguageDirection, type Language } from '@/src/lib/utils/language';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ar' },
  ];
}

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  const direction = getLanguageDirection(lang as Language);
  const fontClass = lang === 'ar' ? 'font-arabic' : 'font-sans';

  return (
    <div lang={lang} dir={direction} className={fontClass}>
      <Header lang={lang as Language} />
      {children}
      <Footer lang={lang as Language} />
    </div>
  );
}
