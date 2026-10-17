import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ProjectDetail } from '../components/sections/ProjectDetail.js'
import { getLocalizedProjects } from '../i18n/content.js'
import { setDocumentMetadata } from '../i18n/index.js'

const app = document.querySelector('#app')
const slug = new URLSearchParams(location.search).get('slug')

function render() {
  const projects = getLocalizedProjects()
  const projectIndex = projects.findIndex(({ id }) => id === slug)
  const project = projectIndex === -1 ? null : projects[projectIndex]
  const nextProject = project
    ? project.id === 'campuscart'
      ? projects.find(({ id }) => id === 'formuloo-compta')
      : projects[(projectIndex + 1) % projects.length]
    : null
  app.innerHTML = Page({ children: ProjectDetail({ project, nextProject }) })
  setDocumentMetadata('project', { description: project?.description })
  if (project) document.title = `${project.title} · Gabriel Nganty`
  initNavbar()
  initCtaFooter()
}

render()
document.addEventListener('portfolio:localechange', render)
