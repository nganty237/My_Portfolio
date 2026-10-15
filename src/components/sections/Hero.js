import heroBackground from '../../assets/Grillage bleu-blanc.svg'
import portraitPhoto from '../../assets/nganty.jpeg'
import { Button } from '../ui/Button.js'
import { Icon } from '../ui/Icon.js'

export function Hero({ eyebrow, headline = [], subtitle, cvUrl, socials = [], photo = portraitPhoto }) {
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
  const photoSource = photo?.src ?? photo ?? ''

  return `
    <section class="hero-section relative isolate overflow-hidden" data-hero>
      ${backgroundSource ? `<img class="hero-background pointer-events-none absolute inset-0 h-full w-full object-cover" src="${backgroundSource}" alt="" aria-hidden="true" data-hero-bg />` : ''}
      <div class="relative z-10 mx-auto grid max-w-6xl content-center gap-5 px-6 py-14 md:py-18">
        <div class="flex items-center justify-between gap-4" data-hero-item>
          <p class="label hero-eyebrow text-muted">${eyebrow ?? ''}</p>
          ${photoSource ? `
            <div class="relative shrink-0">
              <div class="size-14 sm:size-16 md:size-20 overflow-hidden rounded-full border-2 border-border bg-surface-strong shadow-md ring-2 ring-accent/20 transition-transform duration-300 hover:scale-105 hover:ring-accent/40">
                <img class="h-full w-full object-cover object-top" src="${photoSource}" alt="Gabriel Nganty" width="80" height="80" loading="eager" />
              </div>
            </div>
          ` : ''}
        </div>
        <h1 class="display max-w-5xl text-ink" data-hero-item>${headlineMarkup}</h1>
        <p class="body-large max-w-2xl text-muted" data-hero-item>${subtitle ?? ''}</p>
        <div class="flex flex-wrap items-center gap-5" data-hero-item>
          ${Button({ label: 'Download CV', href: cvUrl ?? '#', variant: 'outline', icon: 'download', attrs: 'download="CV_NGANTY_BIKELE.pdf"' })}
          <div class="flex items-center gap-2" aria-label="Social media">
            ${socialLinks}
          </div>
        </div>
        <div class="mt-1" data-hero-item>
          ${Button({ label: 'Selected Work', href: '#selected-work', variant: 'outline', icon: 'arrow-down', attrs: 'data-scroll-to-work' })}
        </div>
      </div>
    </section>
  `
}

export default Hero
