import { Icon } from '../ui/Icon.js'
import { t } from '../../i18n/index.js'

export function AboutIntro({ about = {}, bio = [], interests = [], contactInfo = [], cvUrl = '', cvFilename = '' }) {
  const {
    eyebrow = 'A LITTLE ABOUT ME',
    title = [],
    introTitle = "Hi, I'm Gabriel.",
    image = '',
    imageAlt = 'Portrait de Gabriel Nganty',
  } = about

  const email = contactInfo.find(({ key }) => key === 'email')?.value || ''

  const titleMarkup = (Array.isArray(title) ? title : [title])
    .filter(Boolean)
    .map((line) => `<span class="block">${line}</span>`)
    .join('')

  const [lead, ...rest] = bio
  const leadMarkup = lead
    ? `<p class="body-large text-ink">${lead}</p>`
    : ''
  const restMarkup = rest.map((paragraph) => `<p>${paragraph}</p>`).join('')
  const interestsMarkup = interests.map(({ icon, title, description }) => `
    <li class="grid content-start gap-1 rounded-lg border border-border bg-card p-4 shadow-xs">
      <div class="flex items-center gap-3">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface-strong text-accent shadow-xs">
          ${Icon(icon, { size: 18 })}
        </span>
        <h3 class="text-base font-semibold text-ink">${title}</h3>
      </div>
      <p class="text-sm leading-relaxed text-muted">${description}</p>
    </li>
  `).join('')
  const interestsSection = interestsMarkup
    ? `<section class="mt-8" aria-labelledby="about-interests-title">
        <h2 id="about-interests-title" class="heading-3">${t('outsideWork')}</h2>
        <ul class="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">${interestsMarkup}</ul>
      </section>`
    : ''

  const imageMarkup = image
    ? `<img class="h-full w-full object-cover object-center" src="${image}" alt="${imageAlt}" loading="eager" fetchpriority="high" width="1200" height="1500" />`
    : `<div class="flex h-full min-h-80 items-center justify-center bg-surface-strong px-6 text-center text-muted" role="img" aria-label="${imageAlt}">${t('photoComing')}</div>`

  return `
    <section class="mx-auto max-w-6xl px-6 py-16 md:py-24" data-about-section>
      <header class="max-w-4xl" data-page-header>
        <p class="label mb-4 text-muted">${eyebrow}</p>
        <h1 class="heading-1">${titleMarkup}</h1>
      </header>

      <div class="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-start md:gap-14">
        <figure class="relative m-0 w-full md:sticky md:top-24" data-about-image>
          <div class="aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-card shadow-xs">
            ${imageMarkup}
          </div>
        </figure>

        <div class="grid gap-5" data-about-content>
          <h2 class="heading-2">${introTitle}</h2>
          <div class="grid gap-4">
            ${leadMarkup}
            <div class="body grid gap-3 border-l-2 border-accent/30 pl-5 text-muted">${restMarkup}</div>
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-3">
            ${email
              ? `<a class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-strong px-4 py-2 text-xs font-medium text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" href="mailto:${email}">${Icon('mail', { size: 16 })}${email}</a>`
              : ''}
            ${cvUrl
              ? `<a class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-strong px-4 py-2 text-xs font-medium text-ink transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink" href="${cvUrl}" ${cvFilename ? `download="${cvFilename}"` : 'download'}>${Icon('download', { size: 16 })}${t('downloadCv')}</a>`
              : ''}
          </div>
          ${interestsSection}
        </div>
      </div>
    </section>
  `
}

export default AboutIntro
