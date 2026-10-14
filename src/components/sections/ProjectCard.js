import { Button } from '../ui/Button.js'
import { Card } from '../ui/Card.js'
import { Tag } from '../ui/Tag.js'

export function ProjectCard({
  id,
  title,
  category = 'Project',
  description = '',
  tags = [],
  image = '',
  alt = '',
}) {
  const imageMarkup = image
    ? `<img class="h-full w-full object-cover" src="${image}" alt="${alt}" loading="lazy" width="1200" height="760" />`
    : `<div class="flex h-full min-h-56 items-center justify-center bg-accent-subtle px-6 text-center text-sm text-muted" role="img" aria-label="${alt || title}">Image à venir</div>`

  return Card({
    className: 'flex h-full flex-col overflow-hidden p-0',
    children: `
      <div class="relative aspect-[1200/760] overflow-hidden bg-surface-strong">
        <span class="absolute left-3 top-3 z-10 rounded-full bg-surface-strong/90 px-2.5 py-1 text-xs font-medium text-muted shadow-sm">${category}</span>
        ${imageMarkup}
      </div>
      <div class="flex flex-1 flex-col p-5">
        <h2 class="heading-3">${title}</h2>
        <p class="mt-2 text-sm leading-relaxed text-muted">${description}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">${tags.map((tag) => Tag(tag)).join('')}</div>
        <div class="mt-4">${Button({ label: 'More read', href: `/project.html?slug=${encodeURIComponent(id)}`, variant: 'outline-small', icon: 'arrow-up-right' })}</div>
      </div>
    `,
  })
}

export default ProjectCard
