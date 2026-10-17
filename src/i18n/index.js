import en from './en.json'
import fr from './fr.json'

const dictionaries = { en, fr }
const supportedLocales = Object.keys(dictionaries)
let activeLocale

function browserLocale() {
  const preferred = navigator.language?.slice(0, 2).toLowerCase()
  return supportedLocales.includes(preferred) ? preferred : 'en'
}

export function getLocale() {
  if (!activeLocale) {
    const savedLocale = localStorage.getItem('portfolio-locale')
    activeLocale = supportedLocales.includes(savedLocale) ? savedLocale : browserLocale()
    document.documentElement.lang = activeLocale
  }
  return activeLocale
}

export function getMessages() {
  return dictionaries[getLocale()]
}

export function t(key, values = {}) {
  const template = key.split('.').reduce((value, part) => value?.[part], getMessages())
  if (typeof template !== 'string') return key
  return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''))
}

export function setLocale(locale) {
  if (!supportedLocales.includes(locale) || locale === getLocale()) return
  activeLocale = locale
  localStorage.setItem('portfolio-locale', locale)
  document.documentElement.lang = locale
  document.dispatchEvent(new CustomEvent('portfolio:localechange', { detail: { locale } }))
}

export function setDocumentMetadata(page, { description: pageDescription } = {}) {
  const titleKey = page === 'project' && new URLSearchParams(location.search).has('slug')
    ? 'projectPageTitle'
    : page === 'project' ? 'projectMissingTitle'
      : page === 'contact' ? 'contactPageTitle' : `${page}Title`
  const descriptionKey = page === 'home' ? 'homeDescription'
    : page === 'about' ? 'aboutDescription'
      : page === 'projects' ? 'projectsDescription'
        : page === 'contact' ? 'contactDescription'
          : page === 'project' ? 'projectNotFoundBody' : null
  document.title = t(titleKey)
  const description = document.querySelector('meta[name="description"]')
  if (description && (descriptionKey || pageDescription)) description.content = pageDescription || t(descriptionKey)
}
