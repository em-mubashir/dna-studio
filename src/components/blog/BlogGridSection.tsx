'use client'

import { useState } from 'react'
import BlogFilters from '@/src/components/ui/BlogFilters'
import ProjectCard from '@/src/components/ui/ProjectCard'
import Pagination from '@/src/components/ui/Pagination'

interface BlogItem {
  id: string
  title: string
  topic: string
  href?: string
  thumbnail: any
}

interface BlogGridSectionProps {
  items: BlogItem[]
  lang: string
  itemsPerPage?: number
}

export default function BlogGridSection({ items, lang, itemsPerPage = 6 }: BlogGridSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="px-4 md:px-12 mt-10 md:mt-14 pb-16">
      {/* Filters + Search */}
      <BlogFilters lang={lang} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-8">
        {paginatedItems.map((item) => (
          <ProjectCard
            key={item.id}
            title={item.title}
            topic={item.topic}
            href={item.href}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>

      {paginatedItems.length === 0 && (
        <p className="text-neutral-500 text-center py-20 text-lg">
          {lang === 'ar' ? 'لا توجد مقالات حالياً' : 'No posts yet'}
        </p>
      )}

      {/* Pagination */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  )
}
