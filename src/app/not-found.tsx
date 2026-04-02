import { headers } from 'next/headers';
import { type Language } from '@/src/lib/utils/language';
import Header from '@/src/components/layout/Header';
import NotFoundContent from '@/src/components/NotFoundContent';
import { getPayload } from 'payload';
import config from '@/src/payload/payload.config';
import './globals.css';

export default async function RootNotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const langMatch = pathname.match(/^\/(en|ar)/);
  const lang: Language = (langMatch?.[1] as Language) || 'en';

  let settings: any = null;
  try {
    const payload = await getPayload({ config });
    settings = await payload.findGlobal({ slug: 'settings', depth: 2 });
  } catch {
    // DB unavailable
  }

  const menuItems = settings?.navigation?.menuItems || [];
  const logo = settings?.branding?.logo;
  const logoAlt = lang === 'ar'
    ? settings?.branding?.logoAlt_ar
    : settings?.branding?.logoAlt_en;

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <Header lang={lang} menuItems={menuItems} logo={logo} logoAlt={logoAlt ?? undefined} />
        <NotFoundContent lang={lang} />
      </body>
    </html>
  );
}
