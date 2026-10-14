export function Card({ children, className = '' }) {
  return `<article class="rounded-2xl border border-border bg-white p-6 ${className}">${children}</article>`
}

export default Card
