export function Card({ children, className = '' }) {
  return `<article class="bg-card border border-border rounded-xl p-5 shadow-xs transition-all duration-200 hover:shadow-sm ${className}">${children}</article>`
}

export default Card
