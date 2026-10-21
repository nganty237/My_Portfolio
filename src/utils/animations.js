import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Draws a connected particle trail and expanding ripples on mouse clicks. */
export function initCursorTrail() {
  if (
    window.__cursorTrailInitialized ||
    prefersReducedMotion() ||
    !window.matchMedia('(pointer: fine)').matches
  ) {
    return
  }

  window.__cursorTrailInitialized = true

  const canvas = document.createElement('canvas')
  canvas.className = 'cursor-trail-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.append(canvas)

  const context = canvas.getContext('2d')
  if (!context) {
    canvas.remove()
    return
  }

  const particles = []
  const ripples = []
  const particleLifetime = 1450
  const rippleLifetime = 620
  const particleSpacing = 22
  const linkDistance = 92
  let frameId = 0
  let pixelRatio = 1
  let distanceSinceParticle = 0
  let lastPoint = null
  let cursor = null

  const accentColor = () => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim()
    return /^#[\da-f]{3,8}$/i.test(value) ? value : '#315fc4'
  }

  const resizeCanvas = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(window.innerWidth * pixelRatio)
    canvas.height = Math.round(window.innerHeight * pixelRatio)
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  }

  const draw = (now) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    while (particles.length && now - particles[0].time > particleLifetime) particles.shift()
    while (
      ripples.length &&
      now - ripples[0].time > rippleLifetime + ripples[0].delay
    ) {
      ripples.shift()
    }

    const color = accentColor()
    context.lineCap = 'round'
    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index]
      const fade = Math.max(0, 1 - (now - particle.time) / particleLifetime)

      for (let neighborIndex = index + 1; neighborIndex < particles.length; neighborIndex += 1) {
        const neighbor = particles[neighborIndex]
        const distance = Math.hypot(neighbor.x - particle.x, neighbor.y - particle.y)
        if (distance > linkDistance) continue

        const neighborFade = Math.max(0, 1 - (now - neighbor.time) / particleLifetime)
        context.globalAlpha = Math.min(fade, neighborFade) * (1 - distance / linkDistance) * 0.52
        context.strokeStyle = color
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(particle.x, particle.y)
        context.lineTo(neighbor.x, neighbor.y)
        context.stroke()
      }

      context.globalAlpha = fade * 0.25
      context.fillStyle = color
      context.shadowColor = color
      context.shadowBlur = 12
      context.beginPath()
      context.arc(particle.x, particle.y, particle.radius + 2, 0, Math.PI * 2)
      context.fill()
      context.globalAlpha = fade * 0.88
      context.shadowBlur = 5
      context.beginPath()
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      context.fill()
      context.shadowBlur = 0
    }

    if (cursor) {
      context.globalAlpha = 0.48
      context.strokeStyle = color
      context.lineWidth = 1
      context.beginPath()
      context.arc(cursor.x, cursor.y, 23, 0, Math.PI * 2)
      context.stroke()
      context.globalAlpha = 1
      context.fillStyle = color
      context.shadowColor = color
      context.shadowBlur = 10
      context.beginPath()
      context.arc(cursor.x, cursor.y, 3, 0, Math.PI * 2)
      context.fill()
      context.shadowBlur = 0
    }

    ripples.forEach((ripple) => {
      const elapsed = now - ripple.time - ripple.delay
      if (elapsed < 0) return
      const progress = Math.min(1, elapsed / rippleLifetime)
      context.globalAlpha = (1 - progress) * 0.72
      context.strokeStyle = color
      context.lineWidth = 1.7
      context.beginPath()
      context.arc(ripple.x, ripple.y, 3 + progress * ripple.radius, 0, Math.PI * 2)
      context.stroke()
    })

    context.globalAlpha = 1
    if (particles.length || ripples.length) {
      frameId = requestAnimationFrame(draw)
    } else {
      frameId = 0
    }
  }

  const requestDraw = () => {
    if (!frameId) frameId = requestAnimationFrame(draw)
  }

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const point = { x: event.clientX, y: event.clientY, time: performance.now() }
    cursor = point
    const previous = lastPoint && point.time - lastPoint.time < 300 ? lastPoint : null
    if (previous) {
      const deltaX = point.x - previous.x
      const deltaY = point.y - previous.y
      const distance = Math.hypot(deltaX, deltaY)
      let distanceToNextParticle = particleSpacing - distanceSinceParticle
      let remainingDistance = distance
      let travelledDistance = 0

      while (remainingDistance >= distanceToNextParticle && distance > 0) {
        travelledDistance += distanceToNextParticle
        const ratio = travelledDistance / distance
        particles.push({
          x: previous.x + deltaX * ratio + (Math.random() - 0.5) * 12,
          y: previous.y + deltaY * ratio + (Math.random() - 0.5) * 12,
          radius: 1.6 + Math.random() * 1.8,
          time: point.time,
        })
        remainingDistance -= distanceToNextParticle
        distanceToNextParticle = particleSpacing
      }
      distanceSinceParticle = remainingDistance
    } else {
      distanceSinceParticle = 0
      particles.push({ x: point.x, y: point.y, radius: 2.3, time: point.time })
    }
    lastPoint = point
    requestDraw()
  }

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const time = performance.now()
    ;[48, 78, 112].forEach((radius, index) => {
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        radius,
        delay: index * 55,
        time,
      })
    })
    requestDraw()
  }

  const clearCanvas = () => {
    particles.length = 0
    ripples.length = 0
    distanceSinceParticle = 0
    lastPoint = null
    cursor = null
    if (frameId) cancelAnimationFrame(frameId)
    frameId = 0
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('pointerout', (event) => {
    if (event.relatedTarget) return
    cursor = null
    lastPoint = null
    distanceSinceParticle = 0
    requestDraw()
  }, { passive: true })
  window.addEventListener('blur', clearCanvas)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearCanvas()
  })
}

/** Reveals an accent layer from the cursor and lets it recede toward the exit point. */
export function initButtonPaint() {
  if (
    window.__buttonPaintInitialized ||
    prefersReducedMotion() ||
    !window.matchMedia('(hover: hover) and (pointer: fine)').matches
  ) {
    return
  }

  window.__buttonPaintInitialized = true

  document.querySelectorAll('button, a[class*="rounded-full"]').forEach((target) => {
    if (target.matches(':disabled, [aria-disabled="true"]')) return

    target.classList.add('paint-hover-target')
    const paintLayer = document.createElement('span')
    paintLayer.className = 'button-paint-layer'
    paintLayer.setAttribute('aria-hidden', 'true')
    paintLayer.style.clipPath = 'circle(0px at 50% 50%)'

    Array.from(target.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const content = document.createElement('span')
        content.className = 'button-paint-content'
        node.replaceWith(content)
        content.append(node)
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add('button-paint-content')
      }
    })

    target.prepend(paintLayer)

    target.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return
      const bounds = target.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const radius = Math.ceil(Math.max(
        Math.hypot(x, y),
        Math.hypot(bounds.width - x, y),
        Math.hypot(x, bounds.height - y),
        Math.hypot(bounds.width - x, bounds.height - y)
      ) + 2)

      gsap.killTweensOf([paintLayer, target])
      gsap.set(paintLayer, { clipPath: `circle(0px at ${x}px ${y}px)` })
      gsap.to(paintLayer, {
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.52,
        ease: 'power2.out',
      })
      gsap.to(target, {
        color: 'var(--color-background)',
        duration: 0.24,
        ease: 'power1.out',
      })
    })

    target.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return
      const bounds = target.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top

      gsap.killTweensOf([paintLayer, target])
      const paintedColor = target.style.color
      target.style.removeProperty('color')
      const restingColor = getComputedStyle(target).color
      target.style.color = paintedColor

      gsap.to(paintLayer, {
        clipPath: `circle(0px at ${x}px ${y}px)`,
        duration: 0.48,
        ease: 'power2.inOut',
      })
      gsap.to(target, {
        color: restingColor,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: () => target.style.removeProperty('color'),
      })
    })
  })
}

/**
 * Initialize all entrance and scroll animations across the site
 * Accelerated slightly for snappier, more professional feedback
 */
export function initPageAnimations() {
  initCursorTrail()
  initButtonPaint()

  if (prefersReducedMotion()) {
    return
  }

  // 1. Header reveal (subtle fade down on page load)
  const header = document.querySelector('[data-site-header]')
  if (header) {
    gsap.fromTo(
      header,
      { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    )
  }

  // 2. Hero entrance (Home page)
  const heroSection = document.querySelector('[data-hero]')
  if (heroSection) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const heroBg = heroSection.querySelector('[data-hero-bg]')
    const heroItems = heroSection.querySelectorAll('[data-hero-item]')

    if (heroBg) {
      heroTl.fromTo(
        heroBg,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, clearProps: 'opacity', duration: 0.8, ease: 'power2.out' },
        0
      )
    }

    if (heroItems.length > 0) {
      heroTl.fromTo(
        heroItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
        0.1
      )
    }
  }

  // 3. Page Header entrance (for pages without Hero: Projects, About, Contact, Project detail)
  const pageHeader = document.querySelector('[data-page-header]')
  if (pageHeader && !heroSection) {
    const headerItems = pageHeader.children.length > 0 ? pageHeader.children : [pageHeader]
    gsap.fromTo(
      headerItems,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.05 }
    )
  }

  // 4. Project cards scroll reveal (Home & Projects pages)
  const projectCardsContainer = document.querySelector('[data-project-cards]')
  if (projectCardsContainer) {
    const cards = projectCardsContainer.querySelectorAll('[data-project-card]:not(.hidden)')
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectCardsContainer,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }

  // 5. Principles section scroll reveal
  const principlesSection = document.querySelector('#how-i-work')
  if (principlesSection) {
    const header = principlesSection.querySelector('header, .grid:first-child')
    const cards = principlesSection.querySelectorAll('article')

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: principlesSection,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: principlesSection,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }
  }

  // 6. Toolkit section scroll reveal (About page)
  const toolkitSection = document.querySelector('#toolkit')
  if (toolkitSection) {
    const header = toolkitSection.querySelector('header, .grid:first-child')
    const cards = toolkitSection.querySelectorAll('article')

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: toolkitSection,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: toolkitSection,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }
  }

  // 6b. Certifications section scroll reveal (About page)
  const certificationsSection = document.querySelector('#certifications')
  if (certificationsSection) {
    const header = certificationsSection.querySelector('header, .grid:first-child')
    const cards = certificationsSection.querySelectorAll('article')

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certificationsSection,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certificationsSection,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }
  }

  // 7. About page photo and content reveal
  const aboutSection = document.querySelector('[data-about-section]')
  if (aboutSection) {
    const img = aboutSection.querySelector('[data-about-image]')
    const content = aboutSection.querySelector('[data-about-content]')

    if (img) {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.97, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }

    if (content) {
      gsap.fromTo(
        content.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }

  // 8. Contact page panel reveal
  const contactAside = document.querySelector('[data-contact-aside]')
  const contactForm = document.querySelector('[data-contact-form]')
  if (contactAside && contactForm) {
    gsap.fromTo(
      contactAside.children,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.38, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
    )
    gsap.fromTo(
      contactForm,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', delay: 0.12 }
    )
  }

  // 9. Project Detail page reveal
  const projectMedia = document.querySelector('[data-project-media]')
  const projectMeta = document.querySelector('[data-project-meta]')
  const projectUnderHood = document.querySelector('[data-project-under-hood]')

  if (projectMedia) {
    gsap.fromTo(
      projectMedia,
      { opacity: 0, scale: 0.98, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.12 }
    )
  }

  if (projectMeta) {
    gsap.fromTo(
      projectMeta.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.38, stagger: 0.04, ease: 'power2.out', delay: 0.2 }
    )
  }

  if (projectUnderHood) {
    const articles = projectUnderHood.querySelectorAll('article')
    if (articles.length > 0) {
      gsap.fromTo(
        articles,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectUnderHood,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }

  // 10. CTA Footer reveal
  const footerCta = document.querySelector('[data-footer-cta]')
  if (footerCta) {
    gsap.fromTo(
      footerCta,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerCta,
          start: 'top 92%',
          once: true,
        },
      }
    )
  }

  // 11. Selected Work scroll animation
  initSelectedWorkScroll()
}

/**
 * Animate the "Selected Work" button click and smoothly scroll to the section
 */
export function initSelectedWorkScroll() {
  if (window.__selectedWorkScrollBound) {
    return
  }
  window.__selectedWorkScrollBound = true

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-scroll-to-work], a[href="#selected-work"]')
    if (!trigger) {
      return
    }

    const target = document.querySelector('#selected-work')
    if (!target) {
      return
    }

    event.preventDefault()

    // 1. Button click feedback animation & arrow move
    if (!prefersReducedMotion()) {
      gsap.timeline()
        .to(trigger, { scale: 0.95, duration: 0.1, ease: 'power2.in' })
        .to(trigger, { scale: 1, duration: 0.18, ease: 'power2.out' })

      const icon = trigger.querySelector('svg')
      if (icon) {
        gsap.fromTo(
          icon,
          { y: 0 },
          { y: 4, yoyo: true, repeat: 1, duration: 0.18, ease: 'power2.inOut' }
        )
      }
    }

    // 2. Smooth scroll to target section with header offset
    const header = document.querySelector('[data-site-header]')
    const headerHeight = header ? header.offsetHeight : 64
    const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 16)

    if (prefersReducedMotion()) {
      window.scrollTo({ top: targetTop, behavior: 'auto' })
      return
    }

    gsap.killTweensOf(window)
    gsap.to(window, {
      duration: 0.65,
      scrollTo: { y: targetTop, autoKill: false },
      ease: 'power2.inOut',
      onComplete: () => {
        // Highlight section header subtly upon arrival
        const sectionHeader = target.querySelector('header')
        if (sectionHeader && !prefersReducedMotion()) {
          gsap.fromTo(
            sectionHeader,
            { y: -6, opacity: 0.8 },
            { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
          )
        }
      },
    })
  })
}

/**
 * Animate theme toggle with fluid transition and icon rotation/bounce
 */
export function animateThemeToggle(isDark) {
  if (prefersReducedMotion()) {
    return
  }

  // 1. Animate toggle icons with rotation & bounce
  const icons = document.querySelectorAll('[data-theme-icon] svg')
  if (icons.length > 0) {
    gsap.fromTo(
      icons,
      { rotate: isDark ? -110 : 110, scale: 0.5, opacity: 0 },
      { rotate: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' }
    )
  }

  // 2. Add temporary transition class for smooth theme interpolation
  document.documentElement.classList.add('theme-transition')
  if (window.__themeTransitionTimer) {
    clearTimeout(window.__themeTransitionTimer)
  }
  window.__themeTransitionTimer = setTimeout(() => {
    document.documentElement.classList.remove('theme-transition')
  }, 320)

  // 3. Theme color interpolation is handled cleanly by CSS .theme-transition without rasterizing text
}

/**
 * Animate category filtering smoothly
 */
export function animateFilterTransition({ leavingCards, enteringCards, onComplete }) {
  if (prefersReducedMotion()) {
    leavingCards.forEach((c) => c.classList.add('hidden'))
    enteringCards.forEach((c) => c.classList.remove('hidden'))
    onComplete?.()
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      ScrollTrigger.refresh()
      onComplete?.()
    },
  })

  if (leavingCards.length > 0) {
    tl.to(leavingCards, {
      opacity: 0,
      scale: 0.96,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => {
        leavingCards.forEach((c) => c.classList.add('hidden'))
      },
    })
  }

  if (enteringCards.length > 0) {
    enteringCards.forEach((c) => {
      c.classList.remove('hidden')
      gsap.set(c, { opacity: 0, scale: 0.96, y: 12 })
    })

    tl.to(enteringCards, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.28,
      stagger: 0.035,
      ease: 'power2.out',
    })
  }
}

/**
 * Animate mobile menu opening and closing
 */
export function animateMobileMenu(menu, isOpen, onDone) {
  if (prefersReducedMotion()) {
    gsap.killTweensOf(menu)
    gsap.set(menu, { clearProps: 'clipPath,opacity,transform' })
    menu.classList.toggle('hidden', !isOpen)
    onDone?.()
    return
  }

  if (isOpen) {
    menu.classList.remove('hidden')
    gsap.killTweensOf(menu)
    gsap.fromTo(
      menu,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.48,
        ease: 'power3.inOut',
        onComplete: () => gsap.set(menu, { clearProps: 'clipPath' }),
      }
    )
  } else {
    gsap.killTweensOf(menu)
    gsap.fromTo(
      menu,
      { clipPath: 'inset(0 0 0% 0)' },
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          menu.classList.add('hidden')
          gsap.set(menu, { clearProps: 'clipPath' })
          onDone?.()
        },
      }
    )
  }
}

export { gsap, ScrollTrigger, ScrollToPlugin }
