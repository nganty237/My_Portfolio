import { socials } from '../../data/profile.js'
import { on } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'

export function CtaFooter() {
  const linkedIn = socials.find(({ icon }) => icon === 'linkedin')

  return `
    <footer>
      <section class="mx-auto max-w-5xl border-t border-border px-6 py-10 md:py-14" data-footer-cta>
        <div class="pt-2 md:pt-4">
          <h2 class="heading-2 max-w-3xl">You made it! Curious to say <span class="text-accent">hello?</span></h2>
          <a class="mt-1 inline-flex items-center gap-3 heading-2 text-ink transition hover:text-accent" href="/contact.html">View my <span class="text-accent">story</span>, get in touch <span aria-hidden="true">👇</span></a>
          <div class="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink">
            <a class="hover:text-accent" href="/contact.html">Email ${Icon('arrow-up-right', { size: 14, className: 'inline' })}</a>
            ${linkedIn ? `<a class="hover:text-accent" href="${linkedIn.href}" target="_blank" rel="noreferrer">LinkedIn ${Icon('arrow-up-right', { size: 14, className: 'inline' })}</a>` : ''}
          </div>
        </div>
      </section>
      <div>
        <div class="mx-auto flex max-w-5xl flex-col gap-4 border-t border-border px-6 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>Crafted &amp; hand-coded by Gabriel Nganty · Douala, Cameroon · © ${new Date().getFullYear()}</p>
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
