'use client'

import { useState } from 'react'
import AnimatedButton from '@/src/components/ui/AnimatedButton'

interface ServiceOption {
  label_en: string
  label_ar: string
}

interface ContactFormProps {
  lang: 'en' | 'ar'
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  servicesLabel?: string
  services?: ServiceOption[]
  messageLabel?: string
  messagePlaceholder?: string
  submitText?: string
  submittingText?: string
}

export default function ContactForm({
  lang,
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  servicesLabel,
  services,
  messageLabel,
  messagePlaceholder,
  submitText,
  submittingText,
}: ContactFormProps) {
  const isArabic = lang === 'ar'
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [scrollIndex, setScrollIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const serviceList = services && services.length > 0
    ? services.map(s => isArabic ? s.label_ar : s.label_en)
    : []

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
  }

  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 3
  const maxScroll = Math.max(0, serviceList.length - visibleCount)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: integrate with backend/API
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      setSelectedServices([])
    }, 1000)
  }

  return (
    <div
      className="bg-black flex flex-col justify-between w-full max-w-[671px]"
      style={{
        padding: '24px',
        opacity: 1,
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full gap-6">
        <div className="flex flex-col gap-5">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {nameLabel || ''}
            </label>
            <input
              type="text"
              placeholder={namePlaceholder || ''}
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full h-[48px] bg-[#1a1a1a] border border-white/30 rounded-none px-4 text-white text-[14px] placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {emailLabel || ''}
            </label>
            <input
              type="email"
              placeholder={emailPlaceholder || ''}
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full h-[48px] bg-[#1a1a1a] border border-white/30 rounded-none px-4 text-white text-[14px] placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            />
          </div>

          {/* SERVICES */}
          {serviceList.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  className="font-bold text-[14px] uppercase text-white tracking-wider"
                  style={{ fontFamily: 'Degular, sans-serif' }}
                >
                  {servicesLabel || ''}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
                    disabled={scrollIndex === 0}
                    className="w-4 h-4 flex items-center justify-center text-white disabled:opacity-30 hover:text-white/80 transition-colors"
                    aria-label="Previous services"
                  >
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScrollIndex(Math.min(maxScroll, scrollIndex + 1))}
                    disabled={scrollIndex >= maxScroll}
                    className="w-4 h-4 flex items-center justify-center text-white disabled:opacity-30 hover:text-white/80 transition-colors"
                    aria-label="Next services"
                  >
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="flex gap-2 transition-transform duration-300"
                  style={{ transform: `translateX(-${scrollIndex * 150}px)` }}
                >
                  {serviceList.map((label, i) => {
                    const isSelected = selectedServices.includes(label)
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleService(label)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-bold uppercase transition-all whitespace-nowrap border ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-white border-white/50 hover:border-white'
                        }`}
                        style={{ fontFamily: 'Degular, sans-serif' }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGE */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {messageLabel || ''}
            </label>
            <textarea
              placeholder={messagePlaceholder || ''}
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full bg-[#1a1a1a] border border-white/30 rounded-none p-4 text-white text-[14px] placeholder:text-white/40 focus:border-white focus:outline-none transition-colors resize-none flex-1"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif', minHeight: '140px' }}
            />
          </div>
        </div>

        {/* SUBMIT */}
        <AnimatedButton
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] font-bold text-[18px] uppercase rounded-none mt-4"
          style={{ fontFamily: 'Degular, sans-serif' }}
          variant="dark"
        >
          {isSubmitting
            ? (submittingText || '')
            : (submitText || '')}
        </AnimatedButton>
      </form>
    </div>
  )
}
