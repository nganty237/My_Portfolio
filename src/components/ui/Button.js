import { Icon } from './Icon.js'

const variants = {
  primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink',
  outline: 'inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink transition hover:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink',
  'outline-small': 'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-ink transition hover:border-ink hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-ink',
  link: 'inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-border underline-offset-4 transition hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink',
}

export function Button({ label, href, variant = 'primary', type = 'button', icon, attrs = '' }) {
  const className = variants[variant] || variants.primary
  const iconMarkup = icon ? Icon(icon, { size: 16 }) : ''
  const attributes = attrs ? ` ${attrs}` : ''
  const content = `${label}${iconMarkup}`

  if (href) {
    return `<a href="${href}" class="${className}"${attributes}>${content}</a>`
  }

  return `<button type="${type}" class="${className}"${attributes}>${content}</button>`
}

export default Button
