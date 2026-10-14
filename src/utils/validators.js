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

  if (!isRequired(values.name)) errors.name = 'Please enter your name.'
  if (!isRequired(values.email)) {
    errors.email = 'Please enter your email address.'
  } else if (!isEmail(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!isRequired(values.message)) {
    errors.message = 'Please write a message.'
  } else if (!minLength(values.message, 10)) {
    errors.message = 'Your message must contain at least 10 characters.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
