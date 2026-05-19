export function formatDate(value?: string, locale = 'zh') {
  if (!value) {
    return '--'
  }

  const language = locale === 'en' ? 'en-US' : 'zh-CN'

  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value))
}

export function splitTags(value?: string[] | string) {
  if (Array.isArray(value)) {
    return value
  }

  if (!value) {
    return []
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
