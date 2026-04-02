import { headers } from 'next/headers';
import { type Language } from '@/src/lib/utils/language';
import NotFoundContent from '@/src/components/NotFoundContent';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const langMatch = pathname.match(/^\/(en|ar)/);
  const lang: Language = (langMatch?.[1] as Language) || 'en';

  return <NotFoundContent lang={lang} />;
}
