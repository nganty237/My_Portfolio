import gsap from 'gsap'

const names = ['Nganty Gabriel']

export function initCardNameAnimation(element) {
  if (!element) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = names[0]
    return
  }

  element.textContent = names[0]
  const counter = { length: names[0].length }
  const timeline = gsap.timeline({ repeat: -1 })

  timeline.to({}, { duration: 1.35 })
  names.forEach((currentName, index) => {
    timeline.to(counter, {
      length: 0,
      duration: Math.max(0.45, currentName.length * 0.055),
      ease: 'none',
      onUpdate: () => {
        element.textContent = currentName.slice(0, Math.round(counter.length))
      },
    })
    timeline.to({}, { duration: 0.28 })

    const nextName = names[(index + 1) % names.length]
    timeline.to(counter, {
      length: nextName.length,
      duration: nextName.length * 0.09,
      ease: 'none',
      onUpdate: () => {
        element.textContent = nextName.slice(0, Math.round(counter.length))
      },
    })
    timeline.to({}, { duration: 1.35 })
  })

  return timeline
}
