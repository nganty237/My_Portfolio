import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { AboutIntro } from '../components/sections/AboutIntro.js'
import { Certifications } from '../components/sections/Certifications.js'
import { Principles } from '../components/sections/Principles.js'
import { Toolkit } from '../components/sections/Toolkit.js'
import profile from '../data/profile.js'
import toolkit from '../data/toolkit.js'

const app = document.querySelector('#app')

app.innerHTML = Page({
  children: `${AboutIntro(profile)}${Toolkit({ toolkit })}${Certifications()}${Principles()}`,
})

initNavbar()
initCtaFooter()
