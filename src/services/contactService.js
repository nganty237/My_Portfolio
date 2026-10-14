const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function sendMessage({ name, email, subject, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

  if (!accessKey) {
    return {
      ok: false,
      message: 'Email sending is not configured yet. Please try again later.',
    }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: accessKey, name, email, subject, message }),
    })
    const result = await response.json()

    if (!response.ok || !result.success) {
      return {
        ok: false,
        message: result.message || 'Your message could not be sent. Please try again.',
      }
    }

    return { ok: true, message: 'Thanks for reaching out. Your message has been sent.' }
  } catch {
    return {
      ok: false,
      message: 'A network error prevented your message from being sent. Please try again.',
    }
  }
}
