import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ContactPanel } from '../components/sections/ContactPanel.js'
import { sendMessage } from '../services/contactService.js'
import { validateContact } from '../utils/validators.js'

const app = document.querySelector('#app')

app.innerHTML = Page({
  children: ContactPanel(),
})

initNavbar()
initCtaFooter()

const form = document.querySelector('[data-contact-form]')
const submitButton = form.querySelector('[data-submit-button]')
const buttonLabel = form.querySelector('[data-button-label]')
const status = form.querySelector('[data-form-status]')
let statusTimeout
let statusHideTimeout

function clearError(fieldName) {
  const input = form.elements[fieldName]
  const error = form.querySelector(`[data-error-for="${fieldName}"]`)
  input.removeAttribute('aria-invalid')
  error.textContent = ''
  error.classList.add('hidden')
}

function showStatus(message, isSuccess) {
  window.clearTimeout(statusTimeout)
  window.clearTimeout(statusHideTimeout)
  status.textContent = message
  status.classList.remove('hidden', 'is-success', 'is-error', 'is-hiding')
  status.classList.add('form-status', isSuccess ? 'is-success' : 'is-error', 'is-visible')

  if (isSuccess) {
    statusTimeout = window.setTimeout(() => {
      status.classList.add('is-hiding')
      status.classList.remove('is-visible')
      statusHideTimeout = window.setTimeout(() => {
        status.classList.add('hidden')
        status.classList.remove('is-hiding')
      }, 220)
    }, 4500)
  }
}

function hideStatus() {
  window.clearTimeout(statusTimeout)
  window.clearTimeout(statusHideTimeout)
  status.classList.add('hidden')
  status.classList.remove('is-visible', 'is-hiding', 'is-success', 'is-error')
}

form.addEventListener('input', (event) => {
  const fieldName = event.target.name
  if (['name', 'email', 'message'].includes(fieldName)) clearError(fieldName)
  hideStatus()
})

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  hideStatus()

  const values = Object.fromEntries(new FormData(form))
  const { valid, errors } = validateContact(values)

  for (const fieldName of ['name', 'email', 'message']) {
    clearError(fieldName)
    if (errors[fieldName]) {
      const input = form.elements[fieldName]
      const error = form.querySelector(`[data-error-for="${fieldName}"]`)
      input.setAttribute('aria-invalid', 'true')
      error.textContent = errors[fieldName]
      error.classList.remove('hidden')
    }
  }

  if (!valid) {
    showStatus('Please correct the highlighted fields.', false)
    form.querySelector('[aria-invalid="true"]')?.focus()
    return
  }

  submitButton.disabled = true
  buttonLabel.textContent = 'Sending…'

  try {
    // A filled honeypot usually means an automated submission. Silently ignore it.
    const result = values.company.trim()
      ? { ok: true, message: 'Thanks for reaching out. Your message has been sent.' }
      : await sendMessage(values)

    showStatus(result.message, result.ok)
    if (result.ok) form.reset()
  } catch {
    showStatus('Something went wrong. Please try again in a moment.', false)
  } finally {
    submitButton.disabled = false
    buttonLabel.textContent = 'Send message'
  }
})
