export function Card({ children, className = '' }) {
  return `<article class="bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md ${className}">${children}</article>`
}

export default Card
