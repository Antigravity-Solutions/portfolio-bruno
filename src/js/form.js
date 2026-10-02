import { siteConfig } from '../config/site.js'
import { trackEvent } from './analytics.js'

const form = document.querySelector('#diagnosis-form')
const feedback = document.querySelector('#form-feedback')
const submitButton = form?.querySelector('button[type="submit"]')

if (form && feedback && submitButton) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (!siteConfig.form.endpoint) {
      feedback.textContent =
        'O formulário está temporariamente indisponível.'
      return
    }

    const originalButtonText = submitButton.textContent

    submitButton.disabled = true
    submitButton.textContent = 'Enviando...'

    feedback.textContent = ''

    try {
      const formData = new FormData(form)

      const response = await fetch(siteConfig.form.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      trackEvent('diagnosis_submit', {
        form_id: 'diagnosis-form',
        status: 'success',
      })

      feedback.textContent =
        'Solicitação enviada com sucesso. Em breve entraremos em contato.'

      form.reset()
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)

      trackEvent('diagnosis_submit', {
        form_id: 'diagnosis-form',
        status: 'error',
      })

      feedback.textContent =
        'Não foi possível enviar sua solicitação. Tente novamente em alguns instantes.'
    } finally {
      submitButton.disabled = false
      submitButton.textContent = originalButtonText
    }
  })
}