'use client'

import { useState } from 'react'
import AnimatedButton from '@/src/components/ui/AnimatedButton'

interface CollaborateFormProps {
  lang: 'en' | 'ar'
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

export default function CollaborateForm({
  lang,
  nameLabel,
  namePlaceholder,
  professionLabel,
  professionPlaceholder,
  emailLabel,
  emailPlaceholder,
  portfolioLabel,
  portfolioPlaceholder,
  coverLetterLabel,
  coverLetterPlaceholder,
  submitText,
  submittingText,
}: CollaborateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    email: '',
    portfolio: '',
    coverLetter: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: integrate with backend/API
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', profession: '', email: '', portfolio: '', coverLetter: '' })
    }, 1000)
  }

  return (
    <div
      className="bg-black flex flex-col justify-between w-full max-w-[671px]"
      style={{ padding: '24px', opacity: 1 }}
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

          {/* WHAT ARE YOU DOING? */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {professionLabel || ''}
            </label>
            <input
              type="text"
              placeholder={professionPlaceholder || ''}
              value={formData.profession}
              onChange={e => setFormData(prev => ({ ...prev, profession: e.target.value }))}
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

          {/* PORTFOLIO LINK */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {portfolioLabel || ''}
            </label>
            <input
              type="url"
              placeholder={portfolioPlaceholder || ''}
              value={formData.portfolio}
              onChange={e => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
              className="w-full h-[48px] bg-[#1a1a1a] border border-white/30 rounded-none px-4 text-white text-[14px] placeholder:text-white/40 focus:border-white focus:outline-none transition-colors"
              style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
            />
          </div>

          {/* COVER LETTER */}
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[14px] uppercase text-white tracking-wider"
              style={{ fontFamily: 'Degular, sans-serif' }}
            >
              {coverLetterLabel || ''}
            </label>
            <textarea
              placeholder={coverLetterPlaceholder || ''}
              value={formData.coverLetter}
              onChange={e => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
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
