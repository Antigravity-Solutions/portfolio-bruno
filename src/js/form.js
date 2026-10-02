import { trackEvent } from './analytics.js'

const form = document.querySelector('#diagnosis-form')
const feedback = document.querySelector('#form-feedback')

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    trackEvent('diagnosis_submit', {
      form_id: 'diagnosis-form',
    })

    feedback.textContent =
      'Formulário em configuração. O envio será ativado antes da publicação.'
  })
}