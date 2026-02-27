'use client'

import Image from 'next/image'
import { type Language, getBilingualField } from '@/src/lib/utils/language'

interface Service {
  id: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  icon?: any
  slug: string
  category?: string
}

interface ServicesSectionProps {
  services: Service[]
  lang: Language
}

export default function ServicesSection({ services, lang }: ServicesSectionProps) {
  if (services.length === 0) {
    return null
  }

  const sectionTitle = lang === 'en' ? 'Our Services' : 'خدماتنا'
  const sectionDescription = lang === 'en'
    ? 'Comprehensive video production solutions tailored to your needs'
    : 'حلول إنتاج فيديو شاملة مصممة خصيصًا لتلبية احتياجاتك'

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const title = getBilingualField<string>(service, 'title', lang)
            const description = getBilingualField<string>(service, 'description', lang)
            const iconUrl =
              service.icon &&
              typeof service.icon === 'object' &&
              'url' in service.icon
                ? service.icon.url
                : null

            return (
              <div
                key={service.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Icon */}
                {iconUrl && (
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-16 h-16">
                      <Image
                        src={iconUrl as string}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed">
                  {description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
