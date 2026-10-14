import { on, qs, qsa } from '../../utils/dom.js'
import { ProjectCard } from './ProjectCard.js'

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Figma', value: 'Figma' },
  { label: 'GitHub', value: 'GitHub' },
]

const activeFilterClasses = ['border-accent', 'bg-accent-subtle', 'text-accent']
const inactiveFilterClasses = ['border-border', 'bg-white', 'text-ink']

export function ProjectGrid({ projects = [], filters = true, limit }) {
  const visibleProjects = typeof limit === 'number' ? projects.slice(0, limit) : projects
  const filterMarkup = filters
    ? `
      <div class="mb-5 flex flex-wrap gap-2" data-project-filters aria-label="Filtrer les projets">
        ${filterOptions.map(({ label, value }, index) => `
          <button class="rounded-full border px-4 py-2 text-sm transition hover:border-accent hover:text-accent focus:outline-2 focus:outline-offset-2 focus:outline-ink ${index === 0 ? activeFilterClasses.join(' ') : inactiveFilterClasses.join(' ')}" type="button" data-filter="${value}" aria-pressed="${index === 0}">
            ${label}
          </button>
        `).join('')}
      </div>
    `
    : ''

  return `
    <div data-project-grid>
      ${filterMarkup}
      <p class="mb-6 text-sm text-muted" data-filter-status aria-live="polite">${visibleProjects.length} projet${visibleProjects.length > 1 ? 's' : ''} affiché${visibleProjects.length > 1 ? 's' : ''}</p>
      <div class="grid gap-6 md:grid-cols-2" data-project-cards>
        ${visibleProjects.map((project) => `<div data-project-card data-category="${project.category}">${ProjectCard(project)}</div>`).join('')}
      </div>
      <p class="hidden py-10 text-center text-muted" data-filter-empty>Aucun projet ne correspond à ce filtre.</p>
    </div>
  `
}

export function initProjectFilters() {
  const grid = qs('[data-project-grid]')

  if (!grid) {
    return
  }

  const cards = qsa('[data-project-card]', grid)
  const status = qs('[data-filter-status]', grid)
  const emptyState = qs('[data-filter-empty]', grid)

  on(grid, 'click', '[data-filter]', (_, button) => {
    const selectedCategory = button.dataset.filter
    const visibleCards = cards.filter((card) => selectedCategory === 'all' || card.dataset.category === selectedCategory)

    cards.forEach((card) => {
      card.classList.toggle('hidden', !visibleCards.includes(card))
    })

    qsa('[data-filter]', grid).forEach((filterButton) => {
      const isActive = filterButton === button
      filterButton.setAttribute('aria-pressed', String(isActive))
      filterButton.classList.toggle('border-accent', isActive)
      filterButton.classList.toggle('bg-accent-subtle', isActive)
      filterButton.classList.toggle('text-accent', isActive)
      filterButton.classList.toggle('border-border', !isActive)
      filterButton.classList.toggle('bg-white', !isActive)
      filterButton.classList.toggle('text-ink', !isActive)
    })

    const count = visibleCards.length
    status.textContent = `${count} projet${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`
    emptyState.classList.toggle('hidden', count !== 0)
  })
}

export default ProjectGrid
