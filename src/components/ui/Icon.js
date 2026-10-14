const icons = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16" />',
  close: '<path d="m6 6 12 12M18 6 6 18" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />',
  moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10" />',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6" />',
  'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7" />',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7" />',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14" />',
  github: '<path d="M15 22v-4c.1-1.2-.4-2.4-1.2-3.2 3.9-.4 8-1.9 8-8.5A6.7 6.7 0 0 0 20 1.7 6.2 6.2 0 0 0 19.8 0S18.5-.4 15.2 1.7a13.8 13.8 0 0 0-6.4 0C5.5-.4 4.2 0 4.2 0A6.2 6.2 0 0 0 4 1.7 6.7 6.7 0 0 0 2.2 6.3c0 6.6 4.1 8.1 8 8.5A3.6 3.6 0 0 0 9 17.6V22" />',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />',
  terminal: '<path d="m4 17 6-5-6-5M12 19h8" />',
  server: '<rect width="18" height="6" x="3" y="3" rx="1" /><rect width="18" height="6" x="3" y="15" rx="1" /><path d="M7 6h.01M7 18h.01" />',
  'arrow-up-circle': '<circle cx="12" cy="12" r="9" /><path d="m16 12-4-4-4 4M12 16V8" />',
}

export function Icon(name, { size = 20, className = '' } = {}) {
  const path = icons[name]

  if (!path) {
    return ''
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true" focusable="false">${path}</svg>`
}

export default Icon
