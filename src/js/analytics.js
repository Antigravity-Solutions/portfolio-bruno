window.dataLayer = window.dataLayer || []

export function trackEvent(eventName, eventData = {}) {
  if (!eventName) {
    return
  }

  window.dataLayer.push({
    event: eventName,
    ...eventData,
  })
}

document
  .querySelectorAll('[data-contact-type]')
  .forEach((element) => {
    element.addEventListener('click', () => {
      trackEvent('contact_click', {
        contact_type: element.dataset.contactType,
        contact_location: element.dataset.contactLocation,
        contact_label: element.dataset.contactLabel,
      })
    })
  })