// Language utilities for bilingual support

export type Language = 'en' | 'ar';

export const languages: Language[] = ['en', 'ar'];

export const defaultLanguage: Language = 'en';

/**
 * Check if a language code is valid
 */
export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language);
}

/**
 * Get bilingual field value based on current language
 * @param data Object containing _en and _ar fields
 * @param fieldName Base field name (without _en or _ar suffix)
 * @param lang Current language
 * @returns Field value in the specified language
 */
export function getBilingualField<T>(
  data: Record<string, any>,
  fieldName: string,
  lang: Language
): T {
  const key = `${fieldName}_${lang}`;
  return data[key] as T;
}

/**
 * Get language direction (ltr or rtl)
 */
export function getLanguageDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Get language name in native script
 */
export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    en: 'English',
    ar: 'العربية',
  };
  return names[lang];
}

/**
 * Get alternate language
 */
export function getAlternateLanguage(lang: Language): Language {
  return lang === 'en' ? 'ar' : 'en';
}
