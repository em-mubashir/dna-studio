import { type Metadata } from 'next'
import { type Language } from '@/src/lib/utils/language'
import { getPageBySlug } from '@/src/lib/payload'
import ContactPageContent from '@/src/components/contact/ContactPageContent'
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

  // Work form labels
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

  // Collaborate form labels (fields stored flat in contactSection via collapsible)
  const collaborateFormProps = {
    nameLabel: isArabic ? cs.collab_name_label_ar : cs.collab_name_label_en,
    namePlaceholder: isArabic ? cs.collab_name_placeholder_ar : cs.collab_name_placeholder_en,
    professionLabel: isArabic ? cs.collab_profession_label_ar : cs.collab_profession_label_en,
    professionPlaceholder: isArabic ? cs.collab_profession_placeholder_ar : cs.collab_profession_placeholder_en,
    emailLabel: isArabic ? cs.collab_email_label_ar : cs.collab_email_label_en,
    emailPlaceholder: isArabic ? cs.collab_email_placeholder_ar : cs.collab_email_placeholder_en,
    portfolioLabel: isArabic ? cs.collab_portfolio_label_ar : cs.collab_portfolio_label_en,
    portfolioPlaceholder: isArabic ? cs.collab_portfolio_placeholder_ar : cs.collab_portfolio_placeholder_en,
    coverLetterLabel: isArabic ? cs.collab_cover_letter_label_ar : cs.collab_cover_letter_label_en,
    coverLetterPlaceholder: isArabic ? cs.collab_cover_letter_placeholder_ar : cs.collab_cover_letter_placeholder_en,
    submitText: isArabic ? cs.collab_submit_ar : cs.collab_submit_en,
    submittingText: isArabic ? cs.collab_submitting_ar : cs.collab_submitting_en,
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
    <ContactPageContent
      lang={lang as Language}
      tab1={tab1}
      tab2={tab2}
      bgImageUrl={bgImageUrl}
      officeHeading={officeHeading}
      officeAddress={officeAddress}
      mailHeading={mailHeading}
      emails={emails}
      followHeading={followHeading}
      socialLinks={socialLinks}
      line1={line1}
      line2={line2}
      formProps={formProps}
      collaborateFormProps={collaborateFormProps}
    />
  )
}
