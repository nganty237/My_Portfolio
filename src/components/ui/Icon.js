const icons = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16" />',
  close: '<path d="m6 6 12 12M18 6 6 18" />',
  globe: '<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />',
  'chevron-down': '<path d="m6 9 6 6 6-6" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />',
  moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10" />',
  expand: '<path d="M15 3h6v6M9 21H3v-6m18-6-7 7M3 9l7-7" />',
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
  award: '<circle cx="12" cy="9" r="6" /><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7" />',
  mail: '<rect width="20" height="14" x="2" y="5" rx="2" /><path d="m2.5 7 9.5 6 9.5-6" />',
  swimming: '<path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0M2 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" /><circle cx="7" cy="5" r="2" /><path d="m9 9 3 2 3-2 4 1M10 11l-3 3-3-1" />',
  running: '<circle cx="14" cy="4" r="2" /><path d="m7 21 3-6 3 2 3-5M7 10l4-2 3 2 4 1M10 15l-3-2-3 2M13 17l3 4" />',
  music: '<path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />',
  football: '<circle cx="12" cy="12" r="9" /><path d="m12 8 2.5 1.8-1 3h-3l-1-3L12 8Zm0 0V3m2.5 6.8 4.7-1.5M13.5 12.8l2.9 4.1m-5.4-4.1-2.9 4.1M9.5 9.8 4.8 8.3m5.7 8.7-2.8 3.5m8.7-3.6 2.8 3.5" />',
  code: '<path d="m8 17-5-5 5-5m8 10 5-5-5-5m-3 12 2-14" />',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />',
  palette: '<path d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 1.7-3.9 1.8 1.8 0 0 1 1.3-3.1h1.3A3.5 3.5 0 0 0 21 10.5C21 6.4 17 3 12 3Z" /><circle cx="7.5" cy="10" r="1" /><circle cx="11" cy="7" r="1" /><circle cx="15.5" cy="8" r="1" />',
  'plus-circle': '<circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" />',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1" />',
  send: '<path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />',
  'message-circle': '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z" />',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />',
  whatsapp: '<path stroke="none" fill="currentColor" d="M17.5 14.4l-2-1a.8.8 0 0 0-.8.1l-.7.7a.5.5 0 0 1-.6.1 7.6 7.6 0 0 1-3.6-3.6.5.5 0 0 1 .1-.6l.7-.7a.8.8 0 0 0 .1-.8l-1-2a.8.8 0 0 0-.7-.5h-.7A1.6 1.6 0 0 0 7 8.3a5.8 5.8 0 0 0 1.8 3.9 10 10 0 0 0 4 3A5.8 5.8 0 0 0 16.7 17a1.6 1.6 0 0 0 1.3-1.8v-.7a.8.8 0 0 0-.5-.7Z" /><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.3a.5.5 0 0 0 .6.6l4.3-1.3A10 10 0 1 0 12 2Z" />',
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />',
  'calendar-check': '<rect width="18" height="18" x="3" y="4" rx="2" /><path d="M8 2v4M16 2v4M3 10h18M9 16l2 2 4-4" />',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" />',
}

export function Icon(name, { size = 20, className = '' } = {}) {
  const path = icons[name]

  if (!path) {
    return ''
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true" focusable="false">${path}</svg>`
}

export default Icon
