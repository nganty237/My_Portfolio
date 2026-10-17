import '../style.css'
import { initCtaFooter } from '../components/layout/CtaFooter.js'
import { Page } from '../components/layout/Page.js'
import { initNavbar } from '../components/layout/Navbar.js'
import { ContactPanel } from '../components/sections/ContactPanel.js'
import { sendMessage } from '../services/contactService.js'
import { getLocalizedProfile } from '../i18n/content.js'
import { setDocumentMetadata, t } from '../i18n/index.js'
import { validateContact } from '../utils/validators.js'

const app = document.querySelector('#app')

function render(preserveFormValues = false) {
  const previousValues = preserveFormValues
    ? Object.fromEntries(new FormData(document.querySelector('[data-contact-form]') ?? document.createElement('form')))
    : null
  app.innerHTML = Page({ children: ContactPanel({ contactInfo: getLocalizedProfile().contactInfo }) })
  setDocumentMetadata('contact')
  initNavbar()
  initCtaFooter()
  bindContactForm()
  if (previousValues) {
    const form = document.querySelector('[data-contact-form]')
    for (const [name, value] of Object.entries(previousValues)) {
      if (form.elements[name]) form.elements[name].value = value
    }
  }
}

function bindContactForm() {
  const form = document.querySelector('[data-contact-form]')
  if (!form) return
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
    if (isSuccess) statusTimeout = window.setTimeout(() => {
      status.classList.add('is-hiding')
      status.classList.remove('is-visible')
      statusHideTimeout = window.setTimeout(() => {
        status.classList.add('hidden')
        status.classList.remove('is-hiding')
      }, 220)
    }, 4500)
  }

  function hideStatus() {
    window.clearTimeout(statusTimeout)
    window.clearTimeout(statusHideTimeout)
    status.classList.add('hidden')
    status.classList.remove('is-visible', 'is-hiding', 'is-success', 'is-error')
  }

  form.addEventListener('input', (event) => {
    if (['name', 'email', 'message'].includes(event.target.name)) clearError(event.target.name)
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
      showStatus(t('pleaseCorrect'), false)
      form.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    submitButton.disabled = true
    buttonLabel.textContent = t('sending')
    try {
      const result = values.company.trim()
        ? { ok: true, message: t('sent') }
        : await sendMessage(values)
      showStatus(result.message, result.ok)
      if (result.ok) form.reset()
    } catch {
      showStatus(t('sendFailed'), false)
    } finally {
      submitButton.disabled = false
      buttonLabel.textContent = t('send')
    }
  })
}

render()
document.addEventListener('portfolio:localechange', () => render(true))
