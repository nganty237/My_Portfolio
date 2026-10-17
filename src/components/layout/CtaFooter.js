import { socials } from '../../data/profile.js'
import { on } from '../../utils/dom.js'
import { Icon } from '../ui/Icon.js'
import { getMessages, t } from '../../i18n/index.js'
import { getLocalizedProfile } from '../../i18n/content.js'

export function CtaFooter() {
  const email = getLocalizedProfile().contactInfo.find(({ key }) => key === 'email')?.value
  const messages = getMessages()

  return `
    <footer class="site-footer">
      <section class="mx-auto max-w-5xl border-t border-border px-6 py-10 sm:py-12 md:py-14" data-footer-cta>
        <div class="pt-1 md:pt-4">
          <h2 class="heading-2 max-w-3xl">${t('footerTitle')} <span class="whitespace-nowrap text-accent">${t('hello')}</span></h2>
          <a class="mt-2 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 heading-2 text-ink transition hover:text-accent" href="/contact.html">${t('footerLink')} <span class="text-accent">${t('story')}</span>, ${t('getInTouchLink')} <span aria-hidden="true">👇</span></a>
          <nav class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:mt-8" aria-label="${t('contactSocial')}">
            <a class="inline-flex min-h-11 items-center justify-center gap-2 py-2 text-ink transition hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" href="${email ? `mailto:${email}` : '/contact.html'}" aria-label="${messages.email}${email ? ` ${email}` : ''}">
              ${Icon('mail', { size: 16 })}<span>${t('email')}</span>${Icon('arrow-up-right', { size: 14 })}
            </a>
            ${socials.map(({ label, href, icon }) => `<a class="inline-flex min-h-11 items-center justify-center gap-2 py-2 text-ink transition hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}">${Icon(icon, { size: 16 })}<span>${label}</span>${Icon('arrow-up-right', { size: 14 })}</a>`).join('')}
          </nav>
        </div>
      </section>
      <div>
        <div class="mx-auto flex max-w-5xl flex-col gap-5 border-t border-border px-6 py-6 text-sm text-muted sm:gap-4 md:flex-row md:items-center md:justify-between">
          <p class="max-w-full leading-relaxed">${t('crafted')} <span class="whitespace-nowrap">· © ${new Date().getFullYear()}</span></p>
          <button class="inline-flex size-10 items-center justify-center self-start rounded-full border border-border text-ink transition hover:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink md:self-auto" type="button" data-scroll-top aria-label="${t('backTop')}">
            ${Icon('arrow-up-circle')}
          </button>
        </div>
      </div>
    </footer>
  `
}

export function initCtaFooter() {
  if (initCtaFooter.initialized) return
  initCtaFooter.initialized = true
  on(document, 'click', '[data-scroll-top]', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

export default CtaFooter
