import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ProjectGrid, initProjectFilters } from '../components/sections/ProjectGrid.js'
import { Section } from '../components/ui/Section.js'
import { getLocalizedProjects } from '../i18n/content.js'
import { setDocumentMetadata, t } from '../i18n/index.js'

const app = document.querySelector('#app')

function render() {
  app.innerHTML = Page({
    children: Section({
      eyebrow: t('projectsEyebrow'),
      title: t('projectsHeading'),
      children: `<p class="body-large max-w-2xl text-muted">${t('projectsLead')}</p><div class="mt-6">${ProjectGrid({ projects: getLocalizedProjects() })}</div>`,
    }),
  })
  setDocumentMetadata('projects')
  initNavbar()
  initCtaFooter()
  initProjectFilters()
}

render()
document.addEventListener('portfolio:localechange', render)
