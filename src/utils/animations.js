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

/**
 * Initialize all entrance and scroll animations across the site
 * Accelerated slightly for snappier, more professional feedback
 */
export function initPageAnimations() {
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
    menu.classList.toggle('hidden', !isOpen)
    onDone?.()
    return
  }

  if (isOpen) {
    menu.classList.remove('hidden')
    gsap.killTweensOf(menu)
    gsap.fromTo(
      menu,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
    )

    const menuItems = menu.querySelectorAll('[data-menu-link], [data-theme-toggle]')
    if (menuItems.length > 0) {
      gsap.killTweensOf(menuItems)
      gsap.fromTo(
        menuItems,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.22, stagger: 0.03, ease: 'power2.out', delay: 0.04 }
      )
    }
  } else {
    gsap.killTweensOf(menu)
    gsap.to(menu, {
      opacity: 0,
      y: -8,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => {
        menu.classList.add('hidden')
        onDone?.()
      },
    })
  }
}

export { gsap, ScrollTrigger, ScrollToPlugin }
