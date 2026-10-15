import { Button } from '../ui/Button.js'
import { MetaItem } from '../ui/MetaItem.js'
import { Tag } from '../ui/Tag.js'

export function ProjectDetail({ project, nextProject }) {
  if (!project) {
    return `
      <section class="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p class="label mb-4 text-accent">PROJECT</p>
        <h1 class="heading-1 max-w-3xl">Projet introuvable</h1>
        <p class="body-large mt-5 max-w-2xl text-muted">Ce projet n'existe pas ou le lien est incomplet.</p>
        <div class="mt-8">${Button({ label: 'All projects', href: '/projects.html', variant: 'outline', icon: 'arrow-left' })}</div>
      </section>
    `
  }

  const {
    title,
    category = 'Project',
    kicker = '',
    description = '',
    tags = [],
    role = '—',
    year = '—',
    type = '—',
    stack = [],
    image = '',
    alt = '',
    links = [],
    highlights = [],
  } = project

  const eyebrow = [category, kicker].filter(Boolean).join(' · ').toUpperCase()
  const imageMarkup = image
    ? `<img class="aspect-[16/9] h-auto w-full object-cover" src="${image}" alt="${alt || title}" width="1200" height="760" />`
    : `<div class="flex aspect-[16/9] items-center justify-center bg-card px-6 text-center text-muted" role="img" aria-label="${alt || title}">Image à venir</div>`
  const tagsMarkup = tags.map((tag) => Tag(tag)).join('')
  const linksMarkup = links
    .filter(({ label, href }) => label && href)
    .map(({ label, href }) => Button({
      label,
      href,
      variant: 'outline-small',
      icon: 'arrow-up-right',
      attrs: 'target="_blank" rel="noreferrer"',
    }))
    .join('')
  const highlightsMarkup = highlights.map(({ title: highlightTitle, description: highlightDescription }) => `
    <article class="rounded-lg border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-sm">
      <h3 class="font-semibold text-ink">${highlightTitle}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-muted">${highlightDescription}</p>
    </article>
  `).join('')
  const nextProjectMarkup = nextProject
    ? `
      <a class="group mt-10 block py-5 transition hover:text-accent" href="/project.html?slug=${encodeURIComponent(nextProject.id)}">
        <p class="label text-muted">NEXT PROJECT <span class="text-accent">→</span></p>
        <h2 class="heading-2 mt-2 transition group-hover:text-accent">${nextProject.title}</h2>
      </a>
    `
    : ''

  return `
    <article class="mx-auto max-w-5xl px-6 py-8 md:py-12">
      <div>${Button({ label: 'All projects', href: '/projects.html', variant: 'outline', icon: 'arrow-left' })}</div>
      <header class="mt-10 max-w-4xl md:mt-12" data-page-header>
        <p class="label text-accent">${eyebrow}</p>
        <h1 class="heading-2 mt-3">${title}</h1>
        <p class="body mt-4 max-w-3xl text-muted">${description}</p>
        <div class="mt-4 flex flex-wrap gap-2">${tagsMarkup}</div>
      </header>

      <div class="mt-8 overflow-hidden rounded-xl border border-border bg-card md:mt-10" data-project-media>
        ${imageMarkup}
      </div>

      <div class="mt-6 grid gap-5 border-y border-border py-5 sm:grid-cols-2 md:grid-cols-4" data-project-meta>
        ${MetaItem({ label: 'ROLE', value: role })}
        ${MetaItem({ label: 'YEAR', value: year })}
        ${MetaItem({ label: 'TYPE', value: type })}
        ${MetaItem({ label: 'STACK', value: Array.isArray(stack) ? stack.join(' · ') : stack })}
      </div>

      ${linksMarkup ? `<div class="mt-5 flex flex-wrap gap-3">${linksMarkup}</div>` : ''}

      <section class="mt-14 max-w-3xl" data-project-under-hood>
        <p class="label mb-4 text-muted">UNDER THE HOOD</p>
        <h2 class="heading-2">What makes this project work.</h2>
        <div class="mt-6 grid gap-4">${highlightsMarkup}</div>
      </section>

      ${nextProjectMarkup}
    </article>
  `
}

export default ProjectDetail
