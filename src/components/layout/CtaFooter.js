import { socials } from '../../data/profile.js'
import { on } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'

export function CtaFooter() {
  return `
    <footer class="site-footer">
      <section class="mx-auto max-w-5xl border-t border-border px-6 py-10 sm:py-12 md:py-14" data-footer-cta>
        <div class="pt-1 md:pt-4">
          <h2 class="heading-2 max-w-3xl">You made it! Curious to say <span class="text-accent">hello?</span></h2>
          <a class="mt-2 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 heading-2 text-ink transition hover:text-accent" href="/contact.html">View my <span class="text-accent">story</span>, get in touch <span aria-hidden="true">👇</span></a>
          <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink sm:mt-8">
            <a class="hover:text-accent" href="/contact.html">Email ${Icon('arrow-up-right', { size: 14, className: 'inline' })}</a>
            ${socials.map(({ label, href, icon }) => `<a class="inline-flex items-center gap-1.5 hover:text-accent" href="${href}" target="_blank" rel="noreferrer" aria-label="${label}" title="${label}">${Icon(icon, { size: 15 })}${label}</a>`).join('')}
          </div>
        </div>
      </section>
      <div>
        <div class="mx-auto flex max-w-5xl flex-col gap-5 border-t border-border px-6 py-6 text-sm text-muted sm:gap-4 md:flex-row md:items-center md:justify-between">
          <p class="max-w-sm leading-relaxed">Crafted &amp; hand-coded by Gabriel Nganty · Douala, Cameroon · © ${new Date().getFullYear()}</p>
          <button class="inline-flex size-10 items-center justify-center self-start rounded-full border border-border text-ink transition hover:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink md:self-auto" type="button" data-scroll-top aria-label="Retour en haut">
            ${Icon('arrow-up-circle')}
          </button>
        </div>
      </div>
    </footer>
  `
}

export function initCtaFooter() {
  on(document, 'click', '[data-scroll-top]', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

export default CtaFooter
