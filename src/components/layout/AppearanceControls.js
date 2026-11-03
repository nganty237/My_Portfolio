import { on, qs, qsa } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'
import { getLocale, setLocale, t } from '../../i18n/index.js'

export function LanguageSelector(locale = getLocale(), className = '') {
  return `<label class="${className} language-control" aria-label="${t('language')}">
    <span class="language-control__globe">${Icon('globe', { size: 16 })}</span>
    <select class="language-select rounded-full border border-border bg-surface-strong text-ink focus:outline-2 focus:outline-offset-2 focus:outline-accent" data-locale-select aria-label="${t('language')}">
      <option value="fr" ${locale === 'fr' ? 'selected' : ''}>FR</option>
      <option value="en" ${locale === 'en' ? 'selected' : ''}>EN</option>
    </select>
    <span class="language-control__chevron">${Icon('chevron-down', { size: 13 })}</span>
  </label>`
}

export function ThemeToggle(className = '') {
  return `<button class="${className}" type="button" data-theme-toggle aria-pressed="false" aria-label="${t('themeDark')}" title="${t('themeDark')}">
    <span data-theme-icon>${Icon('moon')}</span>
  </button>`
}

function setTheme(isDark, persist = false) {
  if (isDark) document.documentElement.setAttribute('data-theme', 'dark')
  else document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'

  qsa('[data-theme-toggle]').forEach((themeToggle) => {
    themeToggle.setAttribute('aria-pressed', String(isDark))
    themeToggle.setAttribute('aria-label', isDark ? t('themeLight') : t('themeDark'))
    themeToggle.setAttribute('title', isDark ? t('themeLight') : t('themeDark'))
    const icon = qs('[data-theme-icon]', themeToggle)
    const label = qs('[data-theme-label]', themeToggle)
    if (icon) icon.innerHTML = Icon(isDark ? 'sun' : 'moon', { size: label ? 15 : 20 })
    if (label) label.textContent = isDark ? t('lightMode') : t('darkMode')
  })

  if (persist) {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
    import('../../utils/animations.js').then(({ animateThemeToggle }) => animateThemeToggle(isDark))
  }
}

let controlsInitialized = false

export function initAppearanceControls() {
  setTheme(localStorage.getItem('portfolio-theme') === 'dark')
  if (controlsInitialized) return

  on(document, 'click', '[data-theme-toggle]', () => {
    setTheme(!document.documentElement.hasAttribute('data-theme'), true)
  })
  on(document, 'change', '[data-locale-select]', (_, selector) => setLocale(selector.value))
  controlsInitialized = true
}
