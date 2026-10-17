import { t } from '../i18n/index.js'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function sendMessage({ name, email, subject, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

  if (!accessKey) {
    return { ok: false, message: t('emailNotConfigured') }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: accessKey, name, email, subject, message }),
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      return { ok: false, message: result.message || t('unableToSend') }
    }
    return { ok: true, message: t('sent') }
  } catch {
    return { ok: false, message: t('networkError') }
  }
}
