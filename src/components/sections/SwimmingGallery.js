import swimFront from '../../assets/swim-1.jpg'
import swimAction from '../../assets/swim-2.jpg'
import { Icon } from '../ui/Icon.js'
import { Section } from '../ui/Section.js'
import { t } from '../../i18n/index.js'

const photos = [
  {
    src: swimFront,
    altKey: 'swimmingPhotoFrontAlt',
    captionKey: 'swimmingPhotoFrontCaption',
  },
  {
    src: swimAction,
    altKey: 'swimmingPhotoActionAlt',
    captionKey: 'swimmingPhotoActionCaption',
  },
]

export function SwimmingGallery() {
  const images = photos.map(({ src, altKey, captionKey }, index) => `
    <button
      class="group relative m-0 aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-card p-0 text-left shadow-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      type="button"
      data-swim-photo="${index}"
      aria-label="${t('swimmingOpenPhoto', { number: index + 1, caption: t(captionKey) })}"
    >
      <img
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        src="${src}"
        alt=""
        width="810"
        height="900"
        loading="eager"
        decoding="async"
        fetchpriority="low"
      />
      <span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10"></span>
      <span aria-hidden="true" class="absolute left-3 top-3 text-xs font-semibold tracking-wide text-white drop-shadow">0${index + 1}</span>
      <span aria-hidden="true" class="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm">${Icon('expand', { size: 15 })}</span>
      <span aria-hidden="true" class="absolute inset-x-3 bottom-3 text-sm font-medium text-white drop-shadow">${t(captionKey)}</span>
    </button>
  `).join('')

  return Section({
    id: 'swimming',
    className: '',
    children: `
      <header class="mb-6 max-w-2xl" data-page-header>
        <div class="mb-4 flex items-center gap-3">
          <span aria-hidden="true" class="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent-subtle text-accent shadow-xs">${Icon('swimming', { size: 21 })}</span>
          <p class="label text-accent">${t('outsideWork')}</p>
        </div>
        <h2 class="heading-2 max-w-[17ch] text-balance">${t('swimmingGalleryTitle')}</h2>
        <p class="body mt-3 max-w-[34rem] text-muted">${t('swimmingGalleryIntro')}</p>
      </header>
      <div class="max-w-[30rem]" data-swim-reveal>
        <button type="button" class="swimming-gallery-toggle group inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-subtle px-4 py-2 text-sm font-medium text-accent shadow-xs transition hover:border-accent/50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" data-swim-toggle aria-expanded="false" aria-controls="swimming-gallery-photos">
          <span class="transition-transform duration-200 group-hover:scale-110" data-swim-toggle-icon>${Icon('expand', { size: 16 })}</span><span data-swim-toggle-label>${t('swimmingViewPhotos')}</span>
        </button>
        <div id="swimming-gallery-photos" class="mt-4 grid grid-rows-[0fr] opacity-0 -translate-y-2 transition-all duration-200 ease-out" data-swim-panel aria-hidden="true" inert>
          <div class="min-h-0 overflow-hidden">
            <div class="grid grid-cols-2 items-start gap-4 sm:gap-5">
              ${images}
            </div>
          </div>
        </div>
      </div>
      <dialog class="swimming-viewer" data-swim-dialog aria-label="${t('swimmingViewerLabel')}">
        <div class="flex items-center justify-between gap-4 px-1 pb-3">
          <p class="label text-white/75" data-swim-counter></p>
          <button type="button" class="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-swim-close aria-label="${t('swimmingCloseViewer')}">${Icon('close', { size: 20 })}</button>
        </div>
        <img class="mx-auto max-h-[72dvh] w-full rounded-lg object-contain" data-swim-viewer-image alt="" />
        <div class="flex items-center justify-between gap-4 px-1 pt-3">
          <button type="button" class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-swim-previous>${Icon('arrow-left', { size: 18 })}<span>${t('swimmingPreviousPhoto')}</span></button>
          <button type="button" class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-swim-next><span>${t('swimmingNextPhoto')}</span>${Icon('arrow-right', { size: 18 })}</button>
        </div>
      </dialog>
    `,
  })
}

export function initSwimmingGallery() {
  const reveal = document.querySelector('[data-swim-reveal]')
  const dialog = document.querySelector('[data-swim-dialog]')
  if (!reveal || !dialog || dialog.dataset.initialized) return
  dialog.dataset.initialized = 'true'

  const toggle = reveal.querySelector('[data-swim-toggle]')
  const panel = reveal.querySelector('[data-swim-panel]')
  const toggleLabel = reveal.querySelector('[data-swim-toggle-label]')
  const viewerImage = dialog.querySelector('[data-swim-viewer-image]')
  const counter = dialog.querySelector('[data-swim-counter]')
  const photoButtons = [...document.querySelectorAll('[data-swim-photo]')]
  let currentIndex = 0
  let activeTrigger = null
  let isOpen = false
  let isPinned = false
  let pointerInside = false
  let pointerActivation = false

  const preloadPhotos = () => {
    photos.forEach(({ src }) => {
      const image = new Image()
      image.decoding = 'async'
      image.fetchPriority = 'low'
      image.src = src
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadPhotos, { timeout: 1200 })
  } else {
    window.setTimeout(preloadPhotos, 300)
  }

  function setGalleryOpen(open) {
    isOpen = open
    toggle.setAttribute('aria-expanded', String(open))
    panel.setAttribute('aria-hidden', String(!open))
    panel.inert = !open
    panel.classList.toggle('grid-rows-[1fr]', open)
    panel.classList.toggle('grid-rows-[0fr]', !open)
    panel.classList.toggle('opacity-100', open)
    panel.classList.toggle('opacity-0', !open)
    panel.classList.toggle('translate-y-0', open)
    panel.classList.toggle('-translate-y-2', !open)
    reveal.querySelector('[data-swim-toggle-icon]').innerHTML = Icon(open ? 'close' : 'expand', { size: 16 })
    toggleLabel.textContent = t(open ? 'swimmingHidePhotos' : 'swimmingViewPhotos')
  }

  function showPhoto(index) {
    currentIndex = (index + photos.length) % photos.length
    const photo = photos[currentIndex]
    viewerImage.src = photo.src
    viewerImage.alt = t(photo.altKey)
    counter.textContent = t('swimmingPhotoCounter', { current: currentIndex + 1, total: photos.length })
  }

  function openViewer(index, trigger) {
    activeTrigger = trigger
    showPhoto(index)
    dialog.showModal()
    dialog.querySelector('[data-swim-close]').focus()
  }

  function closeViewer() {
    if (dialog.open) dialog.close()
  }

  photoButtons.forEach((button) => {
    button.addEventListener('click', () => openViewer(Number(button.dataset.swimPhoto), button))
  })
  reveal.addEventListener('pointerdown', () => { pointerActivation = true })
  reveal.addEventListener('pointerup', () => { setTimeout(() => { pointerActivation = false }, 0) })
  reveal.addEventListener('mouseenter', () => {
    pointerInside = true
    if (!isPinned) setGalleryOpen(true)
  })
  reveal.addEventListener('mouseleave', () => {
    pointerInside = false
    if (!isPinned) setGalleryOpen(false)
  })
  reveal.addEventListener('focusin', () => {
    if (!pointerActivation) setGalleryOpen(true)
  })
  reveal.addEventListener('focusout', (event) => {
    if (!reveal.contains(event.relatedTarget) && !isPinned && !pointerInside) setGalleryOpen(false)
  })
  toggle.addEventListener('click', (event) => {
    isPinned = event.detail === 0 || !isOpen
    setGalleryOpen(isPinned)
  })
  dialog.querySelector('[data-swim-close]').addEventListener('click', closeViewer)
  dialog.querySelector('[data-swim-previous]').addEventListener('click', () => showPhoto(currentIndex - 1))
  dialog.querySelector('[data-swim-next]').addEventListener('click', () => showPhoto(currentIndex + 1))
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeViewer()
  })
  dialog.addEventListener('close', () => activeTrigger?.focus())
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPhoto(currentIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showPhoto(currentIndex + 1)
    }
  })
}

export default SwimmingGallery
