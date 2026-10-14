export function MetaItem({ label, value, href }) {
  const content = href
    ? `<a class="text-sm text-ink underline decoration-border underline-offset-4 hover:text-accent" href="${href}">${value}</a>`
    : `<span class="text-sm text-ink">${value}</span>`

  return `<div class="grid gap-1"><span class="label text-muted">${label}</span>${content}</div>`
}

export default MetaItem
