import { headers } from 'next/headers';
import Link from 'next/link';
import { type Language } from '@/src/lib/utils/language';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Try to extract language from pathname
  const langMatch = pathname.match(/^\/(en|ar)/);
  const lang: Language = (langMatch?.[1] as Language) || 'en';

  const messages = {
    en: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
      button: 'Go Home',
    },
    ar: {
      title: '404 - الصفحة غير موجودة',
      description: 'الصفحة التي تبحث عنها غير موجودة.',
      button: 'العودة للرئيسية',
    },
  };

  const content = messages[lang];

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <Link href={`/${lang}`}>{content.button}</Link>
    </div>
  );
}
