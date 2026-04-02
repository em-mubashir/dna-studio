import Link from 'next/link';
import Image from 'next/image';
import { type Language } from '@/src/lib/utils/language';

const messages = {
  en: {
    description: 'Whoops! Page is not found',
    button: 'Go Home',
  },
  ar: {
    description: 'عذراً! الصفحة غير موجودة',
    button: 'العودة للرئيسية',
  },
};

export default function NotFoundContent({ lang }: { lang: Language }) {
  const content = messages[lang];

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 pt-[120px]"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="mb-8">
        <Image
          src="/images/404.png"
          alt="404 Not Found"
          width={1104}
          height={610}
          priority
          className="w-full max-w-[1104px] h-auto"
        />
      </div>

      <p
        className="text-center text-white max-w-[1033px] mb-8 uppercase"
        style={{
          fontFamily: 'Degular, sans-serif',
          fontWeight: 700,
          fontSize: '42px',
          lineHeight: '100%',
          letterSpacing: '0%',
        }}
      >
        {content.description}
      </p>

      <Link
        href={`/${lang}`}
        className="flex items-center justify-center w-[400px] h-[64px] bg-white text-black uppercase tracking-widest hover:bg-white/90 transition-colors duration-300"
        style={{
          padding: '8px 16px',
          gap: '10px',
          fontFamily: 'Degular, sans-serif',
          fontWeight: 700,
        }}
      >
        {content.button}
      </Link>
    </main>
  );
}
