'use client'

import { useState } from 'react'

interface BlogFiltersProps {
  lang: string
  onSearch?: (query: string) => void
  onFilterChange?: (filters: { genre: string; topic: string; sortBy: string }) => void
}

export default function BlogFilters({ lang }: BlogFiltersProps) {
  const [genreOpen, setGenreOpen] = useState(false)
  const [topicOpen, setTopicOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const isAr = lang === 'ar'

  const genreLabel = isAr ? 'النوع' : 'Genre'
  const topicLabel = isAr ? 'الموضوع' : 'Topic'
  const sortLabel = isAr ? 'ترتيب حسب' : 'Sort by'
  const searchPlaceholder = isAr ? 'أدخل كلمات مفتاحية...' : 'Enter keywords...'

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
      {/* Dropdowns */}
      <div className="flex items-center gap-3">
        {/* Genre Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setGenreOpen(!genreOpen); setTopicOpen(false); setSortOpen(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-white border border-white/30 rounded-sm hover:border-white/60 transition-colors"
            aria-expanded={genreOpen}
            aria-haspopup="listbox"
          >
            {genreLabel}
            <svg className={`w-3 h-3 transition-transform ${genreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {genreOpen && (
            <div className="absolute top-full left-0 mt-1 bg-neutral-900 border border-white/20 rounded-sm min-w-[140px] z-20">
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'الكل' : 'All'}
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'إعلانات' : 'Advertising'}
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'أفلام' : 'Film'}
              </button>
            </div>
          )}
        </div>

        {/* Topic Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setTopicOpen(!topicOpen); setGenreOpen(false); setSortOpen(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-white border border-white/30 rounded-sm hover:border-white/60 transition-colors"
            aria-expanded={topicOpen}
            aria-haspopup="listbox"
          >
            {topicLabel}
            <svg className={`w-3 h-3 transition-transform ${topicOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {topicOpen && (
            <div className="absolute top-full left-0 mt-1 bg-neutral-900 border border-white/20 rounded-sm min-w-[140px] z-20">
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'الكل' : 'All'}
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'نصائح' : 'Tips & Tricks'}
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'أخبار' : 'News'}
              </button>
            </div>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setSortOpen(!sortOpen); setGenreOpen(false); setTopicOpen(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-white border border-white/30 rounded-sm hover:border-white/60 transition-colors"
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
          >
            {sortLabel}
            <svg className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute top-full left-0 mt-1 bg-neutral-900 border border-white/20 rounded-sm min-w-[140px] z-20">
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'الأحدث' : 'Newest'}
              </button>
              <button className="block w-full text-left px-3 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {isAr ? 'الأقدم' : 'Oldest'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Field */}
      <div className="relative w-full sm:w-auto sm:min-w-[280px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent border border-white/30 rounded-sm px-3 py-1.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
          aria-label={isAr ? 'بحث' : 'Search'}
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
