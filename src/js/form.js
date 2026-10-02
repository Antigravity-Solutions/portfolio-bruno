const form = document.querySelector('#diagnosis-form')
const feedback = document.querySelector('#form-feedback')

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    feedback.textContent =
      'Formulário em configuração. O envio será ativado antes da publicação.'
  })
}