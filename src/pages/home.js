import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { Hero } from '../components/sections/Hero.js'
import { Principles } from '../components/sections/Principles.js'
import { ProjectGrid, initProjectFilters } from '../components/sections/ProjectGrid.js'
import { Button } from '../components/ui/Button.js'
import { Section } from '../components/ui/Section.js'
import { initPageAnimations } from '../utils/animations.js'
import projects from '../data/projects.js'
import profile from '../data/profile.js'

const app = document.querySelector('#app')

app.innerHTML = Page({
  children: `${Hero(profile)}${Section({
    id: 'selected-work',
    title: 'Selected Work',
    actions: Button({ label: 'View All Work', href: '/projects.html', variant: 'outline-small', icon: 'arrow-up-right' }),
    className: '',
    children: ProjectGrid({ projects }),
  })}${Principles()}`,
})

initNavbar()
initCtaFooter()
initProjectFilters()
initPageAnimations()
