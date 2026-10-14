export function Section({ id, eyebrow, title, actions = '', children, className = '' }) {
  const idAttribute = id ? ` id="${id}"` : ''
  const heading = eyebrow || title
    ? `<header class="mb-5 flex flex-wrap items-center justify-between gap-4">${eyebrow || title ? `<div class="max-w-2xl">${eyebrow ? `<p class="label mb-2 text-muted">${eyebrow}</p>` : ''}${title ? `<h2 class="heading-2">${title}</h2>` : ''}</div>` : ''}${actions}</header>`
    : ''

  return `<section${idAttribute} class="mx-auto max-w-6xl px-6 py-8 md:py-10 ${className}">${heading}${children}</section>`
}

export default Section
