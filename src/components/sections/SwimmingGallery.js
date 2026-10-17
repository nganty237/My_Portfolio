import swimFront from '../../assets/swim-1.jpg'
import swimAction from '../../assets/swim-2.jpg'
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
    <figure class="group relative m-0 aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <img
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        src="${src}"
        alt="${t(altKey)}"
        width="810"
        height="900"
        loading="lazy"
        decoding="async"
      />
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 opacity-90"></div>
      <span aria-hidden="true" class="absolute left-3 top-3 text-xs font-semibold tracking-wide text-white drop-shadow">0${index + 1}</span>
      <figcaption class="absolute inset-x-3 bottom-3 text-sm font-medium text-white drop-shadow">${t(captionKey)}</figcaption>
    </figure>
  `).join('')

  return Section({
    id: 'swimming',
    className: '',
    children: `
      <header class="mb-6 max-w-2xl" data-page-header>
        <p class="label mb-3 text-muted">${t('outsideWork')}</p>
        <h2 class="heading-2">${t('swimmingGalleryTitle')}</h2>
        <p class="body mt-3 text-muted">${t('swimmingGalleryIntro')}</p>
      </header>
      <div class="grid max-w-[30rem] grid-cols-2 items-start gap-4 sm:gap-5">
        ${images}
      </div>
    `,
  })
}

export default SwimmingGallery
