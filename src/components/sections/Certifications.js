import { certifications as defaultCertifications } from '../../data/certifications.js'
import { Button } from '../ui/Button.js'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'

export function Certifications({ certifications = defaultCertifications } = {}) {
  const items = certifications.map(({ title, issuer, date, url }) => {
    const heading = url
      ? `<a class="inline-flex items-start gap-1.5 text-ink transition hover:text-accent" href="${url}" target="_blank" rel="noreferrer">${title}${Icon('arrow-up-right', { size: 14, className: 'mt-1 shrink-0' })}</a>`
      : title

    return `
      <article class="group relative grid gap-3 rounded-xl border border-border bg-card p-4.5 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface-strong text-accent shadow-xs transition-colors duration-200 group-hover:border-accent/40">
            ${Icon('award', { size: 18 })}
          </span>
          ${date ? `<span class="label text-muted">${date}</span>` : ''}
        </div>
        <div class="grid gap-1">
          <h3 class="text-base font-semibold leading-6 text-ink">${heading}</h3>
          ${issuer ? `<p class="text-xs font-medium tracking-wide text-accent">${issuer}</p>` : ''}
        </div>
        ${url ? `<div class="mt-1">${Button({ label: 'Verify Certificate', href: url, variant: 'outline', icon: 'arrow-up-right', attrs: 'target="_blank" rel="noopener noreferrer"' })}</div>` : ''}
      </article>
    `
  }).join('')

  return Section({
    id: 'certifications',
    className: '',
    children: `<div class="grid gap-5 md:grid-cols-2 md:gap-10"><h2 class="heading-2">Certifications &amp; Training</h2><p class="body text-muted">Certifications completed through Meta and Google on Coursera.</p></div><div class="mt-6 grid gap-4 sm:grid-cols-2">${items}</div>`,
  })
}

export default Certifications
