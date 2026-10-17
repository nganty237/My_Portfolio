import { toolkit as defaultToolkit } from '../../data/toolkit.js'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'
import { Tag } from '../ui/Tag.js'
import { t } from '../../i18n/index.js'

export function Toolkit({ toolkit = defaultToolkit }) {
  const groupsMarkup = toolkit.map(({ group, icon, items = [] }) => `
    <article class="rounded-xl border border-border bg-card p-4.5 shadow-xs transition-all duration-200 hover:shadow-sm hover:border-accent/40">
      <div class="flex items-center gap-3">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface-strong text-accent shadow-xs">
          ${Icon(icon, { size: 18 })}
        </span>
        <h3 class="label text-accent">${group}</h3>
      </div>
      <div class="mt-3 flex flex-wrap gap-1.5">
        ${items.map((item) => Tag(item)).join('')}
      </div>
    </article>
  `).join('')

  return Section({
    id: 'toolkit',
    className: '',
    children: `
      <div class="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:items-end md:gap-10">
        <div>
          <p class="label mb-2 text-accent">${t('skillsEyebrow')}</p>
          <h2 class="heading-2">${t('skills')}</h2>
        </div>
        <div class="flex max-w-xl items-start gap-4">
          <span aria-hidden="true" class="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent-subtle text-accent shadow-xs">${Icon('grid', { size: 18 })}</span>
          <p class="body pt-1 text-muted">${t('skillsIntro')}</p>
        </div>
      </div>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">${groupsMarkup}</div>
    `,
  })
}

export default Toolkit
