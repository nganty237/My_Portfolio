import { principles } from '../../data/principles.js'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'

export function Principles() {
  const items = principles.map(({ icon, title, description }) => `
    <article class="grid gap-3 border-t border-border pt-4">
      <div class="flex items-center gap-3">
        <span class="flex size-10 items-center justify-center rounded-full bg-accent-subtle text-accent">
          ${Icon(icon, { size: 18 })}
        </span>
        <h3 class="text-base font-semibold text-ink">${title}</h3>
      </div>
      <p class="text-sm leading-relaxed text-muted">${description}</p>
    </article>
  `).join('')

  return Section({
    id: 'how-i-work',
    className: 'border-t border-border',
    children: `<div class="grid gap-6 md:grid-cols-2 md:gap-10"><h2 class="heading-2">How I like to work</h2><p class="body text-muted">I care about writing reliable software and shipping it properly.</p></div><div class="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">${items}</div>`,
  })
}

export default Principles
