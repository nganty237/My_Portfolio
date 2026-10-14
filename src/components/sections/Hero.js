// ← remplacer par l'export Figma
import heroGrid from '../../assets/hero-grid.svg'
import { Button } from '../ui/Button.js'
import { Icon } from '../ui/Icon.js'

export function Hero({ eyebrow, headline = [], subtitle, cvUrl, socials = [] }) {
  const headlineMarkup = headline?.map(({ text, accent }) => {
    const className = accent ? 'text-accent' : ''

    return `<span class="${className}">${text}</span>`
  }).join('') ?? ''

  const socialLinks = socials?.map(({ label, href, icon }) => `
    <a class="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" href="${href}" target="_blank" rel="noreferrer" aria-label="${label}">
      ${Icon(icon)}
    </a>
  `).join('') ?? ''

  const backgroundSource = heroGrid?.src ?? heroGrid ?? ''

  return `
    <section class="relative isolate overflow-hidden">
      ${backgroundSource ? `<img class="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-80" src="${backgroundSource}" alt="" aria-hidden="true" />` : ''}
      <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-white to-transparent" aria-hidden="true"></div>
      <div class="mx-auto grid max-w-6xl content-center gap-6 px-6 py-16 md:py-20">
        <p class="label text-muted">${eyebrow ?? ''}</p>
        <h1 class="display max-w-5xl text-ink">${headlineMarkup}</h1>
        <p class="body-large max-w-2xl text-muted">${subtitle ?? ''}</p>
        <div class="flex flex-wrap items-center gap-5">
          ${Button({ label: 'Download CV', href: cvUrl ?? '#', variant: 'outline', icon: 'download' })}
          <div class="flex items-center gap-2" aria-label="Réseaux sociaux">
            ${socialLinks}
          </div>
        </div>
        <div class="mt-1">
          ${Button({ label: 'Selected Work', href: '#selected-work', variant: 'outline', icon: 'arrow-down' })}
        </div>
      </div>
    </section>
  `
}

export default Hero
