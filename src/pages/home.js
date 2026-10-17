import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { Hero } from '../components/sections/Hero.js'
import { Principles } from '../components/sections/Principles.js'
import { ProjectGrid, initProjectFilters } from '../components/sections/ProjectGrid.js'
import { Button } from '../components/ui/Button.js'
import { Section } from '../components/ui/Section.js'
import { getLocalizedProjects, getLocalizedProfile } from '../i18n/content.js'
import { setDocumentMetadata, t } from '../i18n/index.js'

const app = document.querySelector('#app')

function render() {
  app.innerHTML = Page({
    children: `${Hero(getLocalizedProfile())}${Section({
      id: 'selected-work',
      title: t('selectedWork'),
      actions: Button({ label: t('viewAll'), href: '/projects.html', variant: 'outline-small', icon: 'arrow-up-right' }),
      className: '',
      children: ProjectGrid({ projects: getLocalizedProjects() }),
    })}${Principles()}`,
  })
  setDocumentMetadata('home')
  initNavbar()
  initCtaFooter()
  initProjectFilters()
}

render()
document.addEventListener('portfolio:localechange', render)
