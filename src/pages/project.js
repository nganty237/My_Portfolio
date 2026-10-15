import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ProjectDetail } from '../components/sections/ProjectDetail.js'
import projects from '../data/projects.js'

const app = document.querySelector('#app')
const params = new URLSearchParams(location.search)
const slug = params.get('slug')
const projectIndex = projects.findIndex(({ id }) => id === slug)
const project = projectIndex === -1 ? null : projects[projectIndex]
const nextProject = project
  ? project.id === 'campuscart'
    ? projects.find(({ id }) => id === 'formuloo-compta')
    : projects[(projectIndex + 1) % projects.length]
  : null

document.title = project ? `${project.title} · Gabriel Nganty` : 'Projet introuvable · Gabriel Nganty'

app.innerHTML = Page({
  children: ProjectDetail({ project, nextProject }),
})

initNavbar()
initCtaFooter()
