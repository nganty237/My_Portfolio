import { certifications as defaultCertifications } from '../../data/certifications.js'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'
import { Tag } from '../ui/Tag.js'

export function Certifications({ certifications = defaultCertifications } = {}) {
  const items = certifications.map(({ title, issuer, year, description, skills = [], url }) => {
    const heading = url
      ? `<a class="inline-flex items-start gap-1.5 text-ink transition hover:text-accent" href="${url}" target="_blank" rel="noreferrer">${title}${Icon('arrow-up-right', { size: 14, className: 'mt-1 shrink-0' })}</a>`
      : title

    return `
      <article class="group relative grid gap-3 rounded-xl border border-border bg-card p-4.5 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface-strong text-accent shadow-xs transition-colors duration-200 group-hover:border-accent/40">
            ${Icon('award', { size: 18 })}
          </span>
          ${year ? `<span class="label text-muted">${year}</span>` : ''}
        </div>
        <div class="grid gap-1">
          <h3 class="text-base font-semibold leading-6 text-ink">${heading}</h3>
          ${issuer ? `<p class="text-xs font-medium tracking-wide text-accent">${issuer}</p>` : ''}
        </div>
        ${description ? `<p class="text-sm leading-relaxed text-muted">${description}</p>` : ''}
        ${skills.length > 0 ? `<div class="mt-0.5 flex flex-wrap gap-1.5">${skills.map((skill) => Tag(skill)).join('')}</div>` : ''}
      </article>
    `
  }).join('')

  return Section({
    id: 'certifications',
    className: '',
    children: `<div class="grid gap-5 md:grid-cols-2 md:gap-10"><h2 class="heading-2">Certifications &amp; training</h2><p class="body text-muted">The programs and credentials that shaped how I build software.</p></div><div class="mt-6 grid gap-4 sm:grid-cols-2">${items}</div>`,
  })
}

export default Certifications
