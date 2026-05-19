import type { Experience, LocalizedText, LocalizedValue, Post } from '../types/content'

export type SupportedLocale = 'zh' | 'en'

export function createEmptyLocalizedText(): LocalizedText {
  return {
    zh: '',
    en: '',
  }
}

export function toLocalizedText(value?: LocalizedValue): LocalizedText {
  if (typeof value === 'string') {
    return {
      zh: value,
      en: value,
    }
  }

  return {
    zh: value?.zh ?? value?.en ?? '',
    en: value?.en ?? value?.zh ?? '',
  }
}

export function resolveLocalizedText(value: LocalizedValue | undefined, locale: string): string {
  if (typeof value === 'string') {
    return value
  }

  const normalizedLocale = locale === 'en' ? 'en' : 'zh'
  const fallbackLocale: SupportedLocale = normalizedLocale === 'zh' ? 'en' : 'zh'

  return value?.[normalizedLocale] || value?.[fallbackLocale] || ''
}

export function getPostTitle(post: Post, locale: string) {
  return resolveLocalizedText(post.title, locale)
}

export function getPostContent(post: Post, locale: string) {
  return resolveLocalizedText(post.content, locale)
}

export function getPostSummary(post: Post, locale: string) {
  return resolveLocalizedText(post.summary, locale)
}

export function getPostCategory(post: Post, locale: string) {
  return resolveLocalizedText(post.category, locale)
}

export function getExperienceName(experience: Experience, locale: string) {
  return resolveLocalizedText(experience.projectName, locale)
}

export function getExperienceDescription(experience: Experience, locale: string) {
  return resolveLocalizedText(experience.description, locale)
}

export function getExperienceAchievement(experience: Experience, locale: string) {
  return resolveLocalizedText(experience.achievement, locale)
}

export function getExperienceDuration(experience: Experience, locale: string) {
  return resolveLocalizedText(experience.duration, locale)
}
