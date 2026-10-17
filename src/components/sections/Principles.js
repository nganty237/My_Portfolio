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
    children: `<div class="grid gap-5 md:grid-cols-2 md:gap-10"><h2 class="heading-2">${t('howWork')}</h2><p class="body text-muted">${t('workIntro')}</p></div><div class="mt-6 grid gap-4 sm:grid-cols-2">${items}</div>`,
  })
}

export default Principles
