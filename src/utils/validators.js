import { t } from '../i18n/index.js'

export function isRequired(value) {
  return String(value ?? '').trim().length > 0
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim())
}

export function minLength(value, length) {
  return String(value ?? '').trim().length >= length
}

export function validateContact(values) {
  const errors = {}

  if (!isRequired(values.name)) errors.name = t('requiredName')
  if (!isRequired(values.email)) {
    errors.email = t('requiredEmail')
  } else if (!isEmail(values.email)) {
    errors.email = t('invalidEmail')
  }
  if (!isRequired(values.message)) {
    errors.message = t('requiredMessage')
  } else if (!minLength(values.message, 10)) {
    errors.message = t('shortMessage')
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

