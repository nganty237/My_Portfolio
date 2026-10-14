import { CtaFooter } from './CtaFooter.js'
import { Navbar } from './Navbar.js'

export function Page({ children }) {
  return `${Navbar()}<main id="main-content">${children}</main>${CtaFooter()}`
}

export default Page
