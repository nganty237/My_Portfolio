import { nav, name } from '../../data/profile.js'
// ← remplacer par l'export Figma
import logoNg from '../../assets/logo-ng.svg'
import { on, qs, qsa } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'

function loadAnimations() {
  return import('../../utils/animations.js')
}

function navigationLinks(className = '') {
  const currentPath = location.pathname === '/' ? '/index.html' : location.pathname

  return nav.map(({ label, href }) => {
    const isActive = currentPath === href
    const currentAttribute = isActive ? ' aria-current="page"' : ''
    const activeClassName = isActive ? 'text-accent underline underline-offset-8' : 'text-ink'

    return `<a class="${className} ${activeClassName}" href="${href}"${currentAttribute}>${label}</a>`
  }).join('')
}

export function Navbar() {
  const logoSource = logoNg?.src ?? logoNg ?? ''

  return `
    <header class="site-header sticky top-0 z-40 bg-transparent" data-site-header>
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="flex items-center gap-3 font-display text-2xl text-ink" href="/index.html" aria-label="${name}, retour à l'accueil">
          ${logoSource ? `<img class="theme-logo size-10" src="${logoSource}" alt="" aria-hidden="true" />` : '<span>NG.</span>'}
        </a>

        <nav class="hidden items-center gap-8 text-sm font-sans md:flex" aria-label="Navigation principale">
          ${navigationLinks('transition hover:text-accent')}
        </nav>

        <div class="flex items-center gap-3">
          <button class="hidden size-10 items-center cursor-pointer justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink md:inline-flex" type="button" data-theme-toggle aria-pressed="false" aria-label="Activer le mode sombre">
            <span data-theme-icon>${Icon('moon')}</span>
          </button>
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink md:hidden" type="button" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="Ouvrir le menu">
            ${Icon('menu')}
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu fixed inset-0 z-50 hidden overflow-y-auto px-6 py-4" data-menu aria-hidden="true">
        <div class="flex items-center justify-between">
          <a class="font-display text-2xl text-ink" href="/index.html">${logoSource ? `<img class="theme-logo size-10" src="${logoSource}" alt="" aria-hidden="true" />` : 'NG.'}</a>
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink" type="button" data-menu-close aria-label="Fermer le menu">
            ${Icon('close')}
          </button>
        </div>
        <nav class="mt-14 grid gap-5 text-sm font-sans" aria-label="Navigation mobile">
          ${navigationLinks('transition hover:text-accent').replaceAll('<a ', '<a data-menu-link ')}
        </nav>
        <button class="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-surface-strong px-4 py-2 text-xs font-medium text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" type="button" data-theme-toggle aria-pressed="false" aria-label="Activer le mode sombre">
          <span data-theme-icon>${Icon('moon', { size: 15 })}</span>
          <span data-theme-label>Dark mode</span>
        </button>
      </div>
    </header>
  `
}

export function initNavbar() {
  const header = qs('[data-site-header]')
  const menu = qs('[data-menu]')
  const toggle = qs('[data-menu-toggle]')
  const themeToggles = qsa('[data-theme-toggle]')

  const updateHeaderBackground = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  updateHeaderBackground()
  window.addEventListener('scroll', updateHeaderBackground, { passive: true })

  const setTheme = (isDark, persist = false) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'

    themeToggles.forEach((themeToggle) => {
      themeToggle.setAttribute('aria-pressed', String(isDark))
      themeToggle.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre')
      const icon = qs('[data-theme-icon]', themeToggle)
      const label = qs('[data-theme-label]', themeToggle)
      if (icon) {
        icon.innerHTML = Icon(isDark ? 'sun' : 'moon', { size: label ? 15 : 20 })
      }
      if (label) {
        label.textContent = isDark ? 'Light mode' : 'Dark mode'
      }
    })

    if (persist) {
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
      loadAnimations().then(({ animateThemeToggle }) => animateThemeToggle(isDark))
    }
  }

  const savedTheme = localStorage.getItem('portfolio-theme')
  setTheme(savedTheme === 'dark')

  on(document, 'click', '[data-theme-toggle]', () => {
    setTheme(!document.documentElement.hasAttribute('data-theme'), true)
  })

  loadAnimations().then(({ initPageAnimations }) => initPageAnimations())

  if (!menu || !toggle) {
    return
  }

  const setMenuState = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen))
    header?.classList.toggle('is-menu-open', isOpen)
    menu.setAttribute('aria-hidden', String(!isOpen))
    document.body.classList.toggle('overflow-hidden', isOpen)
    loadAnimations().then(({ animateMobileMenu }) => animateMobileMenu(menu, isOpen))
  }

  on(document, 'click', '[data-menu-toggle]', () => {
    setMenuState(menu.classList.contains('hidden'))
  })

  on(document, 'click', '[data-menu-close]', () => {
    setMenuState(false)
  })

  on(document, 'click', '[data-menu-link]', () => {
    setMenuState(false)
  })

  on(document, 'keydown', 'body', (event) => {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
      setMenuState(false)
    }
  })
}

export default Navbar
