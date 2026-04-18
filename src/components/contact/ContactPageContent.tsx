'use client'

import { useState } from 'react'
import { type Language } from '@/src/lib/utils/language'
import ContactForm from './ContactForm'
import CollaborateForm from './CollaborateForm'

interface ContactPageContentProps {
  lang: Language
  tab1: string
  tab2: string
  bgImageUrl: string | null
  officeHeading: string
  officeAddress: string
  mailHeading: string
  emails: any[]
  followHeading: string
  socialLinks: any[]
  line1: string
  line2: string
  formProps: {
    nameLabel?: string
    namePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    servicesLabel?: string
    services?: any[]
    messageLabel?: string
    messagePlaceholder?: string
    submitText?: string
    submittingText?: string
  }
  collaborateFormProps: {
    nameLabel?: string
    namePlaceholder?: string
    professionLabel?: string
    professionPlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    portfolioLabel?: string
    portfolioPlaceholder?: string
    coverLetterLabel?: string
    coverLetterPlaceholder?: string
    submitText?: string
    submittingText?: string
  }
}

export default function ContactPageContent({
  lang,
  tab1,
  tab2,
  bgImageUrl,
  officeHeading,
  officeAddress,
  mailHeading,
  emails,
  followHeading,
  socialLinks,
  line1,
  line2,
  formProps,
  collaborateFormProps,
}: ContactPageContentProps) {
  const [activeTab, setActiveTab] = useState<'work' | 'collaborate'>('work')

  return (
    <main className="bg-black min-h-screen pt-[72px] md:pt-[90px]">
      {/* Tabs Section */}
      <div className="w-full flex items-center">
        <button
          onClick={() => setActiveTab('work')}
          className={`flex-1 h-[80px] md:h-[76px] flex items-center justify-center font-bold text-[20px] sm:text-[28px] md:text-[32px] uppercase transition-colors ${
            activeTab === 'work' ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
          style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
        >
          {tab1}
        </button>
        <div className="w-px h-[60px] md:h-[76px] bg-white/50" />
        <button
          onClick={() => setActiveTab('collaborate')}
          className={`flex-1 h-[80px] md:h-[76px] flex items-center justify-center font-bold text-[20px] sm:text-[28px] md:text-[32px] uppercase transition-colors ${
            activeTab === 'collaborate' ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
          style={{ fontFamily: 'Degular, sans-serif', lineHeight: '1.0' }}
        >
          {tab2}
        </button>
      </div>

      {/* Main Content Section with background image */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 90px - 76px)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-[1824px] mx-auto px-4 md:px-12 py-10">
          {/* Desktop layout */}
          <div className="hidden lg:flex flex-row justify-between">
            <div className="flex flex-col justify-between min-h-[600px]">
              <div className="flex flex-col max-w-[400px]" style={{ gap: '66px' }}>
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
              <h2 className="font-bold text-[48px] md:text-[60px] uppercase text-white leading-[1.0]" style={{ fontFamily: 'Degular, sans-serif' }}>
                {line1}{line2 && <><br />{line2}</>}
              </h2>
            </div>

            {/* Form - switches based on active tab */}
            <div className="w-full max-w-[671px] flex-shrink-0">
              {activeTab === 'work' ? (
                <ContactForm lang={lang} {...formProps} />
              ) : (
                <CollaborateForm lang={lang} {...collaborateFormProps} />
              )}
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
            {activeTab === 'work' ? (
              <ContactForm lang={lang} {...formProps} />
            ) : (
              <CollaborateForm lang={lang} {...collaborateFormProps} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
