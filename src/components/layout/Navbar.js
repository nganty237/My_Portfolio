import { nav, name } from '../../data/profile.js'
// ← remplacer par l'export Figma
import logoNg from '../../assets/logo-ng.svg'
import { on, qs } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'

function navigationLinks(className = '') {
  const currentPath = location.pathname === '/' ? '/index.html' : location.pathname

  return nav.map(({ label, href }) => {
    const isActive = currentPath === href
    const currentAttribute = isActive ? ' aria-current="page"' : ''

    return `<a class="${className} ${isActive ? 'text-accent underline underline-offset-8' : 'text-ink'}" href="${href}"${currentAttribute}>${label}</a>`
  }).join('')
}

export function Navbar() {
  const logoSource = logoNg?.src ?? logoNg ?? ''

  return `
    <header class="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="flex items-center gap-3 font-display text-2xl text-ink" href="/index.html" aria-label="${name}, retour à l'accueil">
          ${logoSource ? `<img class="size-10" src="${logoSource}" alt="" aria-hidden="true" />` : '<span>NG.</span>'}
        </a>

        <nav class="hidden items-center gap-8 text-sm md:flex" aria-label="Navigation principale">
          ${navigationLinks('transition hover:text-accent')}
        </nav>

        <div class="flex items-center gap-2">
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink" type="button" data-theme-toggle aria-label="Activer le mode sombre">
            ${Icon('sun')}
          </button>
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink md:hidden" type="button" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="Ouvrir le menu">
            ${Icon('menu')}
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="fixed inset-0 z-50 hidden bg-white px-6 py-4" data-menu>
        <div class="flex items-center justify-between">
          <a class="font-display text-2xl text-ink" href="/index.html">${logoSource ? `<img class="size-10" src="${logoSource}" alt="" aria-hidden="true" />` : 'NG.'}</a>
          <button class="inline-flex size-10 items-center justify-center rounded-full text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink" type="button" data-menu-close aria-label="Fermer le menu">
            ${Icon('close')}
          </button>
        </div>
        <nav class="mt-20 grid gap-6 text-3xl" aria-label="Navigation mobile">
          ${navigationLinks('font-display transition hover:text-accent').replaceAll('<a ', '<a data-menu-link ')}
        </nav>
      </div>
    </header>
  `
}

export function initNavbar() {
  const menu = qs('[data-menu]')
  const toggle = qs('[data-menu-toggle]')

  if (!menu || !toggle) {
    return
  }

  const setMenuState = (isOpen) => {
    menu.classList.toggle('hidden', !isOpen)
    toggle.setAttribute('aria-expanded', String(isOpen))
    document.body.classList.toggle('overflow-hidden', isOpen)
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
