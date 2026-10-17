import { getLocalizedPrinciples } from '../../i18n/content.js'
import { t } from '../../i18n/index.js'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'

export function Principles() {
  const items = getLocalizedPrinciples().map(({ icon, title, description }) => `
    <article class="grid gap-1 rounded-lg border border-border bg-card p-4.5 shadow-xs transition-all duration-200 hover:shadow-xs hover:border-accent/20">
      <div class="flex items-center gap-3">
        <span class="flex size-9 items-center justify-center rounded-full border border-border/80 bg-surface-strong text-accent shadow-xs">
          ${Icon(icon, { size: 18 })}
        </span>
        <h3 class="text-base font-semibold text-ink">${title}</h3>
      </div>
      <p class="text-sm leading-relaxed text-muted">${description}</p>
    </article>
  `).join('')

  return Section({
    id: 'how-i-work',
    className: '',
    children: `
      <div class="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:items-end md:gap-10">
        <div>
          <p class="label mb-2 text-accent">${t('workEyebrow')}</p>
          <h2 class="heading-2">${t('howWork')}</h2>
        </div>
        <div class="flex max-w-xl items-start gap-4">
          <span aria-hidden="true" class="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent-subtle text-accent shadow-xs">${Icon('server', { size: 18 })}</span>
          <p class="body pt-1 text-muted">${t('workIntro')}</p>
        </div>
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">${items}</div>
    `,
  })
}

export default Principles
