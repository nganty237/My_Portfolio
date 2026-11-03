import '../style.css'
import { about, name, socials } from '../data/profile.js'
import { Button } from '../components/ui/Button.js'
import { Icon } from '../components/ui/Icon.js'
import { initCardBackground } from '../utils/cardBackground.js'

if (localStorage.getItem('portfolio-theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark')
  document.documentElement.style.colorScheme = 'dark'
}

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="card-page relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-14 sm:px-10">
    <canvas class="card-page__scene pointer-events-none absolute inset-0 size-full" aria-hidden="true"></canvas>
    <div class="card-page__content relative z-10 mx-auto w-full max-w-3xl">
      <section class="card-page__profile text-center" aria-labelledby="card-name">
        <p class="card-page__eyebrow mb-7 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-accent">
          <span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
          Douala, Cameroun
        </p>

        <div class="flex flex-col items-center gap-6">
          <img class="card-page__portrait size-28 shrink-0 rounded-full object-cover sm:size-32" src="${about.image}" alt="${about.imageAlt}" />
          <div class="min-w-0">
            <h1 id="card-name" class="card-page__name display mx-auto text-5xl leading-[0.95] text-ink sm:text-6xl">${name}</h1>
            <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">${about.title.join(' ')}</p>
          </div>
        </div>

        <div class="mt-8 flex flex-col items-center gap-6">
          ${Button({ label: 'Voir mon portfolio', href: '/index.html', variant: 'primary', icon: 'arrow-up-right', attrs: 'data-card-cta' })}
          <nav class="flex items-center gap-3" aria-label="Réseaux sociaux">
            ${socials.map(({ label, href, icon }) => `<a class="card-page__social inline-flex size-11 items-center justify-center rounded-full text-ink transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}">${Icon(icon, { size: 19 })}</a>`).join('')}
          </nav>
        </div>
      </section>
    </div>
  </main>
`

initCardBackground(document.querySelector('.card-page__scene'))
