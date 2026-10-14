// ← remplacer par l'export Figma
import heroBackground from '../../assets/Grillage bleu-blanc.svg'
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

  const backgroundSource = heroBackground?.src ?? heroBackground ?? ''

  return `
    <section class="hero-section relative isolate overflow-hidden">
      ${backgroundSource ? `<img class="hero-background pointer-events-none absolute inset-0 h-full w-full object-cover" src="${backgroundSource}" alt="" aria-hidden="true" />` : ''}
      <div class="relative z-10 mx-auto grid max-w-6xl content-center gap-5 px-6 py-14 md:py-18">
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
