import { Button } from '../ui/Button.js'
import { Card } from '../ui/Card.js'
import { Icon } from '../ui/Icon.js'
import { Tag } from '../ui/Tag.js'
import { t } from '../../i18n/index.js'

export function ProjectCard({
  id,
  title,
  category = 'Project',
  description = '',
  cardDescription = '',
  tags = [],
  image = '',
  alt = '',
}) {
  const imageMarkup = image
    ? `<img class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="${image}" alt="${alt}" loading="lazy" width="1200" height="760" />`
    : `<div class="flex h-full min-h-56 items-center justify-center bg-surface-strong px-6 text-center text-sm text-muted" role="img" aria-label="${alt || title}">
        <span class="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3.5 py-1.5 text-xs text-muted shadow-xs">
          ${t('imageComing')}
        </span>
       </div>`

  return Card({
    className: 'group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-accent/30',
    children: `
      <div class="relative aspect-[1200/760] overflow-hidden bg-surface-strong border-b border-border/80">
        <span class="pointer-events-none absolute left-3 top-3 z-20 rounded-full border border-border/60 bg-surface-strong/95 px-2.5 py-1 text-xs font-medium text-muted shadow-xs">${category}</span>
        ${imageMarkup}
        ${image ? `<a class="project-image-link absolute inset-0 z-10 grid place-items-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" href="/project.html?slug=${encodeURIComponent(id)}" aria-label="${t('readMore')}: ${title}">
          <span class="project-image-action grid size-12 scale-75 place-items-center rounded-full border opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 active:scale-100 active:opacity-100">${Icon('arrow-up-right', { size: 20 })}</span>
        </a>` : ''}
      </div>
      <div class="flex flex-1 flex-col p-5">
        <h2 class="heading-3 transition-colors duration-200 group-hover:text-accent">${title}</h2>
        <p class="mt-2 text-sm leading-relaxed text-muted">${cardDescription || description}</p>
        <div class="mt-4 flex flex-wrap gap-1.5">${tags.map((tag) => Tag(tag)).join('')}</div>
        <div class="mt-4">${Button({ label: t('readMore'), href: `/project.html?slug=${encodeURIComponent(id)}`, variant: 'outline-small', icon: 'arrow-up-right' })}</div>
      </div>
    `,
  })
}

export default ProjectCard
