export function AboutIntro({ about = {}, bio = [] }) {
  const {
    eyebrow = 'A LITTLE ABOUT ME',
    title = [],
    introTitle = "Hi, I'm Gabriel.",
    image = '',
    imageAlt = 'Portrait de Gabriel Nganty',
  } = about

  const titleMarkup = (Array.isArray(title) ? title : [title])
    .filter(Boolean)
    .map((line) => `<span class="block">${line}</span>`)
    .join('')
  const bioMarkup = bio.map((paragraph) => `<p>${paragraph}</p>`).join('')
  const imageMarkup = image
    ? `<img class="h-full w-full object-cover" src="${image}" alt="${imageAlt}" loading="lazy" width="1200" height="900" />`
    : `<div class="flex min-h-80 h-full items-center justify-center bg-accent-subtle px-6 text-center text-muted" role="img" aria-label="${imageAlt}">Photo à venir</div>`

  return `
    <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header class="max-w-4xl">
        <p class="label mb-4 text-muted">${eyebrow}</p>
        <h1 class="heading-1">${titleMarkup}</h1>
      </header>

      <div class="mt-8 grid gap-7 md:grid-cols-2 md:items-center md:gap-10">
        <div class="aspect-[4/5] w-full overflow-hidden bg-card shadow-sm md:max-w-sm">
          ${imageMarkup}
        </div>
        <div class="grid gap-4">
          <h2 class="heading-2">${introTitle}</h2>
          <div class="body grid gap-3 text-muted">${bioMarkup}</div>
        </div>
      </div>
    </section>
  `
}

export default AboutIntro
