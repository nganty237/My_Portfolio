import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { AboutIntro } from '../components/sections/AboutIntro.js'
import { Certifications } from '../components/sections/Certifications.js'
import { Principles } from '../components/sections/Principles.js'
import { SwimmingGallery } from '../components/sections/SwimmingGallery.js'
import { Toolkit } from '../components/sections/Toolkit.js'
import { getLocalizedProfile, getLocalizedToolkit } from '../i18n/content.js'
import { setDocumentMetadata } from '../i18n/index.js'

const app = document.querySelector('#app')

function render() {
  const profile = getLocalizedProfile()
  app.innerHTML = Page({
    children: `${AboutIntro(profile)}${SwimmingGallery()}${Toolkit({ toolkit: getLocalizedToolkit() })}${Certifications()}${Principles()}`,
  })
  setDocumentMetadata('about')
  initNavbar()
  initCtaFooter()
}

render()
document.addEventListener('portfolio:localechange', render)
