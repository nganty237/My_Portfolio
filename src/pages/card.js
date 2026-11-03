import '../style.css'
import { about, socials } from '../data/profile.js'
import { Button } from '../components/ui/Button.js'
import { Icon } from '../components/ui/Icon.js'
import { initAppearanceControls, LanguageSelector, ThemeToggle } from '../components/layout/AppearanceControls.js'
import { initCardBackground } from '../utils/cardBackground.js'
import { initCardNameAnimation } from '../utils/cardNameAnimation.js'
import { getLocale } from '../i18n/index.js'
import { getLocalizedProfile } from '../i18n/content.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="card-page relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-14 sm:px-10">
    <canvas class="card-page__scene pointer-events-none absolute inset-0 size-full" aria-hidden="true"></canvas>
    <div class="card-page__controls absolute right-5 top-5 z-10 flex items-center gap-2">
      ${LanguageSelector(getLocale())}
      ${ThemeToggle('inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-strong text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink')}
    </div>
    <div class="card-page__content relative z-10 mx-auto w-full max-w-3xl">
      <section class="card-page__profile text-center" aria-labelledby="card-name">
        <p class="card-page__eyebrow mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
          <span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
          <span data-card-location></span>
        </p>

        <div class="flex flex-col items-center gap-6">
          <img class="card-page__portrait size-28 shrink-0 rounded-full object-cover sm:size-32" src="${about.image}" alt="${about.imageAlt}" />
          <div class="min-w-0">
            <h1 id="card-name" class="card-page__name display mx-auto text-5xl leading-[0.95] text-ink sm:text-6xl" aria-label="Nganty Gabriel"><span data-card-name aria-hidden="true">Nganty Gabriel</span></h1>
            <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base" data-card-role></p>
          </div>
        </div>

        <div class="mt-8 flex flex-col items-center gap-6">
          ${Button({ label: '<span data-card-portfolio-label></span>', href: '/index.html', variant: 'primary', icon: 'arrow-up-right', attrs: 'data-card-cta' })}
          <nav class="flex items-center gap-3" aria-label="Social links">
            ${socials.map(({ label, href, icon }) => `<a class="card-page__social inline-flex size-11 items-center justify-center rounded-full text-ink transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}">${Icon(icon, { size: 19 })}</a>`).join('')}
          </nav>
        </div>
      </section>
    </div>
  </main>
`

function updateCardLocale(locale = getLocale()) {
  const localizedProfile = getLocalizedProfile()
  document.querySelector('[data-card-location]').textContent = locale === 'fr' ? 'Douala, Cameroun' : 'Douala, Cameroon'
  document.querySelector('[data-card-role]').textContent = localizedProfile.about.title.join(' ')
  document.querySelector('[data-card-portfolio-label]').textContent = locale === 'fr' ? 'Voir mon portfolio' : 'View my portfolio'
  document.querySelector('.card-page__profile nav').setAttribute('aria-label', locale === 'fr' ? 'Liens vers les réseaux sociaux' : 'Social links')
}

document.addEventListener('portfolio:localechange', (event) => updateCardLocale(event.detail.locale))
updateCardLocale()
initAppearanceControls()
initCardBackground(document.querySelector('.card-page__scene'))
initCardNameAnimation(document.querySelector('[data-card-name]'))
