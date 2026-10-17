export function Section({ id, eyebrow, title, actions = '', children, className = '' }) {
  const idAttribute = id ? ` id="${id}"` : ''
  const heading = eyebrow || title
    ? `<header class="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between" data-page-header>${eyebrow || title ? `<div class="min-w-0 max-w-2xl">${eyebrow ? `<p class="label mb-2 text-muted">${eyebrow}</p>` : ''}${title ? `<h2 class="heading-2 break-words">${title}</h2>` : ''}</div>` : ''}${actions}</header>`
    : ''

  return `<section${idAttribute} class="mx-auto max-w-6xl px-6 py-8 md:py-10 ${className}">${heading}${children}</section>`
}

export default Section
