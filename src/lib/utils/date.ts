// Date utilities for formatting dates in different languages

import { type Language } from './language'

/**
 * Format a date string for display
 * @param dateString - ISO date string
 * @param lang - Language for formatting
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  lang: Language = 'en',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  try {
    const date = new Date(dateString)
    const locale = lang === 'ar' ? 'ar-SA' : 'en-US'
    return new Intl.DateTimeFormat(locale, options).format(date)
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param dateString - ISO date string
 * @param lang - Language for formatting
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string, lang: Language = 'en'): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const rtf = new Intl.RelativeTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
      numeric: 'auto',
    })

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second')
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
    }
  } catch (error) {
    console.error('Error getting relative time:', error)
    return dateString
  }
}
