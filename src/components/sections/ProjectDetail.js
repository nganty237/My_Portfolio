import { Button } from '../ui/Button.js'
import { MetaItem } from '../ui/MetaItem.js'
import { Tag } from '../ui/Tag.js'
import { Icon } from '../ui/Icon.js'
import { t } from '../../i18n/index.js'

export function ProjectDetail({ project, nextProject }) {
  if (!project) return `
    <section class="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <p class="label mb-4 text-accent">${t('categoryProject')}</p>
      <h1 class="heading-1 max-w-3xl">${t('projectNotFound')}</h1>
      <p class="body-large mt-5 max-w-2xl text-muted">${t('projectNotFoundBody')}</p>
      <div class="mt-8">${Button({ label: t('allProjects'), href: '/projects.html', variant: 'outline', icon: 'arrow-left' })}</div>
    </section>`

  const {
    id, title, category = t('categoryProject'), kicker = '', description = '', tags = [],
    role = '—', year = '—', type = '—', stack = [], image = '', alt = '', links = [], highlights = [],
  } = project
  const isCampusCart = id === 'campuscart'
  const isPortfolioWebsite = id === 'portfolio-website'
  const isFormuloo = id === 'formuloo-compta'
  const isProjectManagement = id === 'project-management-app'
  const eyebrow = [category, kicker].filter(Boolean).join(' · ').toUpperCase()
  const imageMarkup = image
    ? `<img class="aspect-[16/9] h-auto w-full object-cover" src="${image}" alt="${alt || title}" width="1200" height="760" />`
    : `<div class="flex aspect-[16/9] items-center justify-center bg-card px-6 text-center text-muted" role="img" aria-label="${alt || title}">${t('imageComing')}</div>`
  const linksMarkup = links.filter(({ label, href }) => label && href).map(({ label, href }) => Button({
    label, href, variant: 'outline-small', icon: 'arrow-up-right', attrs: 'target="_blank" rel="noreferrer"',
  })).join('')
  const highlightsMarkup = highlights.map(({ title: highlightTitle, description: highlightDescription }) => `
    <article class="rounded-lg border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-sm">
      <h3 class="font-semibold text-ink">${highlightTitle}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-muted">${highlightDescription}</p>
    </article>`).join('')
  const campusCartFeaturesMarkup = isCampusCart
    ? project.campuscartSections.features.items.map(({ icon, title: featureTitle, description: featureDescription }) => `
      <article class="rounded-lg border border-border bg-card p-5 shadow-xs">
        <div class="flex items-start gap-3">
          <span class="mt-0.5 inline-flex shrink-0 text-accent">${Icon(icon, { size: 18 })}</span>
          <div>
            <h3 class="font-semibold text-ink">${featureTitle}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">${featureDescription}</p>
          </div>
        </div>
      </article>`).join('')
    : ''
  const previewMarkup = isProjectManagement ? `
    <section class="mt-8" aria-labelledby="project-preview-title">
      <h2 id="project-preview-title" class="label text-muted">${project.previewHeading}</h2>
      <div class="mt-3 overflow-hidden rounded-xl border border-border bg-card" data-project-media>${imageMarkup}</div>
    </section>` : `
      <div class="mt-8 overflow-hidden rounded-xl border border-border bg-card md:mt-10" data-project-media>${imageMarkup}</div>`
  const overviewMarkup = isProjectManagement ? `
    <section class="max-w-3xl" aria-labelledby="project-overview-title">
      <h2 id="project-overview-title" class="heading-2">${project.overviewHeading}</h2>
      <p class="body-large mt-3">${project.overviewSubtitle}</p>
      <p class="body mt-3 text-muted">${project.overviewDescription}</p>
    </section>` : ''
  const projectContentMarkup = isFormuloo ? `
    <div class="mt-14 grid gap-12">
      <section class="max-w-3xl" aria-labelledby="project-overview-title">
        <h2 id="project-overview-title" class="heading-2">${project.overviewHeading}</h2>
        <p class="body-large mt-3">${project.overviewSubtitle}</p>
        <p class="body mt-3 text-muted">${project.overviewDescription}</p>
      </section>
      <section aria-labelledby="core-features-title">
        <h2 id="core-features-title" class="heading-2">${project.featuresHeading}</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">${highlightsMarkup}</div>
      </section>
      <section class="max-w-3xl" aria-labelledby="technical-approach-title">
        <h2 id="technical-approach-title" class="heading-2">${project.technicalHeading}</h2>
        <p class="body-large mt-3">${project.technicalSubtitle}</p>
        <p class="body mt-3 text-muted">${project.technicalDescription}</p>
        <div class="mt-5 flex flex-wrap gap-2" aria-label="${t('stack')}">
          ${(Array.isArray(stack) ? stack : [stack]).filter(Boolean).map((technology) => Tag(technology)).join('')}
        </div>
      </section>
      <section class="max-w-3xl" aria-labelledby="my-contribution-title">
        <h2 id="my-contribution-title" class="heading-2">${project.contributionHeading}</h2>
        <ul class="body mt-4 list-inside list-disc space-y-2 text-muted">
          ${project.contributions.map((contribution) => `<li>${contribution}</li>`).join('')}
        </ul>
      </section>
    </div>` : isProjectManagement ? `
    <div class="mt-14 grid gap-12">
      ${overviewMarkup}
      <section aria-labelledby="project-features-title">
        <h2 id="project-features-title" class="heading-2">${project.featuresHeading}</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">${highlightsMarkup}</div>
      </section>
      <section class="max-w-3xl" aria-labelledby="project-technologies-title">
        <h2 id="project-technologies-title" class="heading-2">${project.technologiesHeading}</h2>
        <ul class="mt-5 divide-y divide-border border-y border-border">
          ${project.technologies.map(({ name: technology, description: technologyDescription }) => `
            <li class="grid gap-1.5 py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-5">
              <h3 class="font-medium text-ink">${technology}</h3>
              <p class="text-sm leading-relaxed text-muted">${technologyDescription}</p>
            </li>`).join('')}
        </ul>
      </section>
      ${project.challenges.length ? `
        <section class="max-w-3xl" aria-labelledby="project-challenges-title">
          <h2 id="project-challenges-title" class="heading-2">${project.challengesHeading}</h2>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            ${project.challenges.map(({ title: challenge, solution }) => `
              <article class="rounded-lg border border-border bg-card p-5">
                <h3 class="font-semibold text-ink">${challenge}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-muted">${solution}</p>
              </article>`).join('')}
          </div>
        </section>` : ''}
      <section class="max-w-3xl" aria-labelledby="project-demonstrates-title">
        <h2 id="project-demonstrates-title" class="heading-2">${project.demonstratesHeading}</h2>
        <ul class="body mt-4 list-inside list-disc space-y-2 text-muted">
          ${project.demonstrates.map((skill) => `<li>${skill}</li>`).join('')}
        </ul>
      </section>
    </div>` : isCampusCart ? '' : `
      <section class="mt-14 max-w-3xl" data-project-under-hood>
        <p class="label mb-4 text-muted">${t('underHood')}</p>
        <h2 class="heading-2">${t('projectBodyHeading')}</h2>
        <div class="mt-6 grid gap-4">${highlightsMarkup}</div>
      </section>`
  const portfolioDetailsMarkup = isPortfolioWebsite ? `
    <section class="mt-10 max-w-3xl" aria-labelledby="portfolio-design-intent-title">
      <p class="label mb-4 text-muted">${project.portfolioDetails.label}</p>
      <h2 id="portfolio-design-intent-title" class="heading-2">${project.portfolioDetails.title}</h2>
      <p class="body mt-4 text-muted">${project.portfolioDetails.description}</p>
    </section>` : ''
  const campusCartContentMarkup = isCampusCart ? `
    <div class="mt-14 grid gap-12">
      <section class="max-w-3xl" aria-labelledby="project-overview-title">
        <h2 id="project-overview-title" class="heading-2">${project.overviewHeading}</h2>
        <p class="body-large mt-3">${project.overviewSubtitle}</p>
        <p class="body mt-3 text-muted">${project.overviewDescription}</p>
      </section>
      <section aria-labelledby="core-features-title">
        <h2 id="core-features-title" class="heading-2">${project.featuresHeading}</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">${campusCartFeaturesMarkup}</div>
      </section>
      <section class="max-w-3xl" aria-labelledby="my-contribution-title">
        <h2 id="my-contribution-title" class="heading-2">${project.contributionHeading}</h2>
        <ul class="body mt-4 list-inside list-disc space-y-2 text-muted">
          ${project.contributions.map((contribution) => `<li>${contribution}</li>`).join('')}
        </ul>
      </section>
    </div>` : ''
  const nextProjectMarkup = nextProject ? `
    <a class="group mt-10 block py-5 transition hover:text-accent" href="/project.html?slug=${encodeURIComponent(nextProject.id)}">
      <p class="label text-muted">${t('nextProject')} <span class="text-accent">→</span></p>
      <h2 class="heading-2 mt-2 transition group-hover:text-accent">${nextProject.title}</h2>
    </a>` : ''
  return `
    <article class="mx-auto max-w-5xl px-6 py-8 md:py-12">
      <div>${Button({ label: t('allProjects'), href: '/projects.html', variant: 'outline', icon: 'arrow-left' })}</div>
      <header class="mt-10 max-w-4xl md:mt-12" data-page-header>
        <p class="label text-accent">${eyebrow}</p>
        <h1 class="heading-2 mt-3">${title}</h1>
        <p class="body mt-4 max-w-3xl text-muted">${description}</p>
        ${!isFormuloo && !isProjectManagement && tags.length ? `<div class="mt-4 flex flex-wrap gap-2">${tags.map((tag) => Tag(tag)).join('')}</div>` : ''}
      </header>
      ${previewMarkup}
      <div class="mt-6 grid gap-5 border-y border-border py-5 sm:grid-cols-2 md:grid-cols-4" data-project-meta>
        ${MetaItem({ label: t('role'), value: role })}
        ${MetaItem({ label: t('year'), value: year })}
        ${MetaItem({ label: t('type'), value: type })}
        ${MetaItem({ label: t('stack'), value: Array.isArray(stack) ? stack.join(' · ') : stack })}
      </div>
      ${linksMarkup ? `<div class="mt-5 flex flex-wrap gap-3">${linksMarkup}</div>` : ''}
      ${projectContentMarkup}
      ${portfolioDetailsMarkup}
      ${campusCartContentMarkup}
      ${nextProjectMarkup}
    </article>`
}

export default ProjectDetail
