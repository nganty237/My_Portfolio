import { toolkit as defaultToolkit } from '../../data/toolkit.js'
import { Section } from '../ui/Section.js'
import { Tag } from '../ui/Tag.js'

export function Toolkit({ toolkit = defaultToolkit }) {
  const groupsMarkup = toolkit.map(({ group, items = [] }) => `
    <article class="bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h3 class="label text-accent">${group}</h3>
      <div class="mt-3 flex flex-wrap gap-1.5">
        ${items.map((item) => Tag(item)).join('')}
      </div>
    </article>
  `).join('')

  return Section({
    id: 'toolkit',
    className: '',
    children: `<div class="grid gap-5 md:grid-cols-2 md:gap-10"><h2 class="heading-2">My everyday toolkit</h2><p class="body text-muted">The tools I use to design, build and ship reliable software.</p></div><div class="mt-6 grid gap-4 sm:grid-cols-2">${groupsMarkup}</div>`,
  })
}

export default Toolkit
