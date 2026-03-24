import { notFound } from 'next/navigation';
import { isValidLanguage, getLanguageDirection, type Language } from '@/src/lib/utils/language';
import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import { getPayload } from 'payload';
import config from '@/src/payload/payload.config';

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

  // Fetch navigation data from CMS
  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });

  const menuItems = settings?.navigation?.menuItems || [];
  const logo = settings?.branding?.logo;
  const logoAlt = lang === 'ar' 
    ? settings?.branding?.logoAlt_ar 
    : settings?.branding?.logoAlt_en;
  
  // Prepare footer data
  const footerData = {
    office_heading_en: settings?.footer?.office_heading_en,
    office_heading_ar: settings?.footer?.office_heading_ar,
    mail_heading_en: settings?.footer?.mail_heading_en,
    mail_heading_ar: settings?.footer?.mail_heading_ar,
    follow_heading_en: settings?.footer?.follow_heading_en,
    follow_heading_ar: settings?.footer?.follow_heading_ar,
    address_en: settings?.contact?.address_en,
    address_ar: settings?.contact?.address_ar,
    emails: settings?.footer?.emails,
    socialLinks: settings?.footer?.socialLinks,
    copyright_en: settings?.footer?.copyright_en,
    copyright_ar: settings?.footer?.copyright_ar,
    terms_en: settings?.footer?.terms_en,
    terms_ar: settings?.footer?.terms_ar,
    terms_link: settings?.footer?.terms_link,
    background_image: settings?.footer?.background_image,
  };

  return (
    <div lang={lang} dir={direction} className={fontClass}>
      <Header lang={lang as Language} menuItems={menuItems} logo={logo} logoAlt={logoAlt ?? undefined} />
      {children}
      <Footer lang={lang as Language} footerData={footerData} />
    </div>
  );
}
