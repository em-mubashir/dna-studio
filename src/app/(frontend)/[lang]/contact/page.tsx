import { type Metadata } from 'next'
import { type Language } from '@/src/lib/utils/language'
import { getPageBySlug } from '@/src/lib/payload'
import ContactForm from '@/src/components/contact/ContactForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params
  const page = await getPageBySlug('contact')
  const isArabic = lang === 'ar'

  const metaTitle = isArabic
    ? (page?.seo?.meta_title_ar || page?.title_ar || 'تواصل معنا - DNA Studio')
    : (page?.seo?.meta_title_en || page?.title_en || "Let's Work - DNA Studio")
  const metaDesc = isArabic
    ? (page?.seo?.meta_description_ar || '')
    : (page?.seo?.meta_description_en || '')

  return { title: metaTitle, description: metaDesc }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const isArabic = lang === 'ar'

  const page = await getPageBySlug('contact')
  if (!page) notFound()

  const cs = page.contactSection || {} as any

  // Tabs
  const tab1 = isArabic ? (cs.tab1_ar || '') : (cs.tab1_en || '')
  const tab2 = isArabic ? (cs.tab2_ar || '') : (cs.tab2_en || '')

  // Background image
  let bgImageUrl: string | null = null
  const bgImg = cs.background_image
  if (bgImg) {
    bgImageUrl = typeof bgImg === 'object' ? (bgImg.url || null) : (typeof bgImg === 'string' ? bgImg : null)
  }

  // Left side content
  const officeHeading = isArabic ? (cs.office_heading_ar || '') : (cs.office_heading_en || '')
  const officeAddress = isArabic ? (cs.office_address_ar || '') : (cs.office_address_en || '')
  const mailHeading = isArabic ? (cs.mail_heading_ar || '') : (cs.mail_heading_en || '')
  const emails: any[] = cs.emails || []
  const followHeading = isArabic ? (cs.follow_heading_ar || '') : (cs.follow_heading_en || '')
  const socialLinks: any[] = cs.socialLinks || []
  const bottomHeading = isArabic ? (cs.bottom_heading_ar || '') : (cs.bottom_heading_en || '')

  // Form labels
  const formProps = {
    nameLabel: isArabic ? cs.form_name_label_ar : cs.form_name_label_en,
    namePlaceholder: isArabic ? cs.form_name_placeholder_ar : cs.form_name_placeholder_en,
    emailLabel: isArabic ? cs.form_email_label_ar : cs.form_email_label_en,
    emailPlaceholder: isArabic ? cs.form_email_placeholder_ar : cs.form_email_placeholder_en,
    servicesLabel: isArabic ? cs.form_services_label_ar : cs.form_services_label_en,
    services: cs.services || [],
    messageLabel: isArabic ? cs.form_message_label_ar : cs.form_message_label_en,
    messagePlaceholder: isArabic ? cs.form_message_placeholder_ar : cs.form_message_placeholder_en,
    submitText: isArabic ? cs.form_submit_ar : cs.form_submit_en,
    submittingText: isArabic ? cs.form_submitting_ar : cs.form_submitting_en,
  }

  // Split bottom heading into 2 lines (after ~10 chars)
  const headingWords = bottomHeading.split(' ')
  let line1 = ''
  let line2 = ''
  let charCount = 0
  for (const word of headingWords) {
    if (charCount + word.length <= 10 || line1 === '') {
      line1 += (line1 ? ' ' : '') + word
      charCount = line1.length
    } else {
      line2 += (line2 ? ' ' : '') + word
    }
  }

  return (
    <main className="bg-black min-h-screen pt-[72px] md:pt-[90px]">
      {/* Tabs Section */}
      <div className="w-full flex items-center">
        <Link
          href={`/${lang}/contact`}
          className="flex-1 h-[80px] md:h-[112px] flex items-center justify-center font-bold text-[20px] sm:text-[28px] md:text-[32px] uppercase text-white transition-colors"
          style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
        >
          {tab1}
        </Link>
        <div className="w-px h-[60px] md:h-[112px] bg-white/50" />
        <Link
          href={`/${lang}/contact`}
          className="flex-1 h-[80px] md:h-[112px] flex items-center justify-center font-bold text-[20px] sm:text-[28px] md:text-[32px] uppercase text-white/50 hover:text-white transition-colors"
          style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
        >
          {tab2}
        </Link>
      </div>

      {/* Main Content Section with background image */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 90px - 112px)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-[1824px] mx-auto px-4 md:px-12 py-10">
          {/* Desktop layout */}
          <div className="hidden lg:flex flex-row justify-between">
            <div className="flex flex-col justify-between min-h-[600px]">
              <div className="flex flex-col max-w-[400px]" style={{ gap: '80px' }}>
                {/* OFFICE */}
                <div className="flex flex-row gap-4">
                  <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>
                      {officeHeading}
                    </h3>
                    <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      <p style={{ whiteSpace: 'pre-line' }}>{officeAddress}</p>
                    </div>
                  </div>
                </div>

                {/* MAIL US */}
                <div className="flex flex-row gap-4">
                  <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>
                      {mailHeading}
                    </h3>
                    <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {emails.map((item: any, i: number) => (
                        <p key={i}><a href={`mailto:${item.email}`} className="hover:text-white transition-colors">{item.email}</a></p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FOLLOW US */}
                <div className="flex flex-row gap-4">
                  <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>
                      {followHeading}
                    </h3>
                    <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {socialLinks.map((item: any, i: number) => (
                        <p key={i}><a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{item.platform}</a></p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM HEADING */}
              <h2 className="font-bold text-[48px] md:text-[80px] uppercase text-white leading-[1.0]" style={{ fontFamily: 'Degular, sans-serif' }}>
                {line1}{line2 && <><br />{line2}</>}
              </h2>
            </div>

            {/* Form modal */}
            <div className="w-full max-w-[671px] flex-shrink-0">
              <ContactForm lang={lang as Language} {...formProps} />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-8 py-6">
            <div className="flex flex-col" style={{ gap: '40px' }}>
              <div className="flex flex-row gap-4">
                <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>{officeHeading}</h3>
                  <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}><p style={{ whiteSpace: 'pre-line' }}>{officeAddress}</p></div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>{mailHeading}</h3>
                  <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {emails.map((item: any, i: number) => (<p key={i}><a href={`mailto:${item.email}`} className="hover:text-white transition-colors">{item.email}</a></p>))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-px bg-white/50" style={{ marginTop: '-16px', marginBottom: '-16px', alignSelf: 'stretch' }} />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[20px] uppercase text-white" style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}>{followHeading}</h3>
                  <div className="text-[14px] text-white/80 leading-[1.5]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {socialLinks.map((item: any, i: number) => (<p key={i}><a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{item.platform}</a></p>))}
                  </div>
                </div>
              </div>
            </div>
            <h2 className="font-bold text-[32px] sm:text-[48px] uppercase text-white leading-[1.0]" style={{ fontFamily: 'Degular, sans-serif' }}>
              {line1}{line2 && <><br />{line2}</>}
            </h2>
            <ContactForm lang={lang as Language} {...formProps} />
          </div>
        </div>
      </div>
    </main>
  )
}
