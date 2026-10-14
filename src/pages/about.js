import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'

const app = document.querySelector('#app')

app.innerHTML = Page({
  children: `
    <section class="mx-auto max-w-6xl px-6 py-22 md:py-25">
      <p class="label mb-4 text-muted">ABOUT</p>
      <h1 class="heading-1">About</h1>
    </section>
  `,
})

initNavbar()
initCtaFooter()
