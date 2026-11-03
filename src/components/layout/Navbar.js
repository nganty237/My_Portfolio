import { nav, name } from '../../data/profile.js'
import logoNg from '../../assets/logo-ng.svg'
import { on, qs } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'
import { getLocale, t } from '../../i18n/index.js'
import { initAppearanceControls, LanguageSelector, ThemeToggle } from './AppearanceControls.js'

function loadAnimations() {
  return import('../../utils/animations.js')
}

function navigationLinks(className = '') {
  const currentPath = location.pathname === '/' ? '/index.html' : location.pathname

  return nav.map(({ label, href }) => {
    const isActive = currentPath === href
    const currentAttribute = isActive ? ' aria-current="page"' : ''
    const activeClassName = isActive ? 'text-accent underline underline-offset-8' : 'text-ink'

    return `<a class="${className} ${activeClassName}" href="${href}"${currentAttribute}>${t(label.toLowerCase())}</a>`
  }).join('')
}

export function Navbar() {
  const logoSource = logoNg?.src ?? logoNg ?? ''
  const locale = getLocale()

  return `
    <header class="site-header sticky top-0 z-40 bg-transparent" data-site-header>
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="flex items-center gap-3 font-display text-2xl text-ink" href="/index.html" aria-label="${name}, ${getLocale() === 'fr' ? 'retour à l’accueil' : 'back to home'}">
          ${logoSource ? `<img class="theme-logo size-10" src="${logoSource}" alt="" aria-hidden="true" />` : '<span>NG.</span>'}
        </a>

        <nav class="hidden items-center gap-8 text-sm font-sans md:flex" aria-label="${t('primaryNav')}">
          ${navigationLinks('transition hover:text-accent')}
        </nav>

        <div class="flex items-center gap-3">
          ${LanguageSelector(locale)}
          ${ThemeToggle('hidden size-10 items-center cursor-pointer justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink md:inline-flex')}
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink md:hidden" type="button" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="${t('menuOpen')}">
            ${Icon('menu')}
          </button>
        </div>
      </div>

    </header>

    <div id="mobile-menu" class="mobile-menu fixed inset-0 z-50 hidden overflow-y-auto px-6 py-4" data-menu aria-hidden="true">
      <div class="flex items-center justify-between">
        <a class="font-display text-2xl text-ink" href="/index.html">${logoSource ? `<img class="theme-logo size-10" src="${logoSource}" alt="" aria-hidden="true" />` : 'NG.'}</a>
        <div class="flex items-center gap-2">
          ${ThemeToggle('inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-strong text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink')}
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink" type="button" data-menu-close aria-label="${t('menuClose')}">
            ${Icon('close')}
          </button>
        </div>
      </div>
      <nav class="mt-14 grid gap-5 text-sm font-sans" aria-label="${t('mobileNav')}">
        ${navigationLinks('transition hover:text-accent').replaceAll('<a ', '<a data-menu-link ')}
      </nav>
      ${LanguageSelector(locale, 'mt-8')}
    </div>
  `
}

let navbarInitialized = false
let menuAnimationVersion = 0
let bodyScrollSnapshot = null

function lockPageScroll() {
  if (bodyScrollSnapshot) return

  const body = document.body
  const root = document.documentElement
  const scrollY = window.scrollY
  bodyScrollSnapshot = {
    scrollY,
    bodyStyles: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    },
    rootOverflow: root.style.overflow,
  }

  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  body.style.overflow = 'hidden'
  root.style.overflow = 'hidden'
}

function unlockPageScroll() {
  if (!bodyScrollSnapshot) return

  const { scrollY, bodyStyles, rootOverflow } = bodyScrollSnapshot
  bodyScrollSnapshot = null
  Object.assign(document.body.style, bodyStyles)
  document.documentElement.style.overflow = rootOverflow
  window.scrollTo(0, scrollY)
}

export function initNavbar() {
  const setMenuState = (isOpen) => {
    const header = qs('[data-site-header]')
    const menu = qs('[data-menu]')
    const toggle = qs('[data-menu-toggle]')
    if (!menu || !toggle) return
    toggle.setAttribute('aria-expanded', String(isOpen))
    header?.classList.toggle('is-menu-open', isOpen)
    menu.setAttribute('aria-hidden', String(!isOpen))
    if (isOpen) menu.classList.remove('hidden')
    document.body.classList.toggle('overflow-hidden', isOpen)
    if (isOpen) lockPageScroll()
    const animationVersion = ++menuAnimationVersion
    loadAnimations().then(({ animateMobileMenu }) => {
      if (animationVersion !== menuAnimationVersion) return
      animateMobileMenu(menu, isOpen, () => {
        if (animationVersion === menuAnimationVersion && !isOpen) unlockPageScroll()
      })
    })
  }

  const closeMenuOnDesktop = () => {
    const toggle = qs('[data-menu-toggle]')
    if (window.matchMedia('(min-width: 48rem)').matches && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenuState(false)
    } 
  }

  initAppearanceControls()
  const updateHeaderBackground = () => qs('[data-site-header]')?.classList.toggle('is-scrolled', window.scrollY > 8)
  updateHeaderBackground()
  if (!navbarInitialized) {
    window.addEventListener('scroll', updateHeaderBackground, { passive: true })
    window.addEventListener('resize', closeMenuOnDesktop, { passive: true })
    on(document, 'change', '[data-locale-select]', () => {
      if (qs('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true') setMenuState(false)
    })
    on(document, 'click', '[data-menu-toggle]', (_, toggle) => setMenuState(toggle.getAttribute('aria-expanded') !== 'true'))
    on(document, 'click', '[data-menu-close]', () => setMenuState(false))
    on(document, 'click', '[data-menu-link]', () => setMenuState(false))
    on(document, 'keydown', 'body', (event) => {
      if (event.key === 'Escape' && qs('[data-menu]') && !qs('[data-menu]').classList.contains('hidden')) setMenuState(false)
    })
    navbarInitialized = true
  }
  loadAnimations().then(({ initPageAnimations }) => initPageAnimations())
}

export default Navbar
