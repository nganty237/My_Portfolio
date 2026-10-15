import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ProjectGrid, initProjectFilters } from '../components/sections/ProjectGrid.js'
import { Section } from '../components/ui/Section.js'
import { initPageAnimations } from '../utils/animations.js'
import projects from '../data/projects.js'

const app = document.querySelector('#app')

app.innerHTML = Page({
  children: Section({
    eyebrow: 'DESIGN MEETS DEVELOPMENT',
    title: 'Projects & experiments.',
    children: `<p class="body-large max-w-2xl text-muted">A mix of interfaces, APIs and experiments built to learn, solve problems and ship useful things.</p><div class="mt-6">${ProjectGrid({ projects })}</div>`,
  }),
})

initNavbar()
initCtaFooter()
initProjectFilters()
initPageAnimations()
