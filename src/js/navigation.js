const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('#main-navigation')

if (menuToggle && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('is-open')
    menuToggle.classList.remove('is-open')
    menuToggle.setAttribute('aria-expanded', 'false')
    menuToggle.setAttribute('aria-label', 'Abrir menu')
  }

  const openMenu = () => {
    navigation.classList.add('is-open')
    menuToggle.classList.add('is-open')
    menuToggle.setAttribute('aria-expanded', 'true')
    menuToggle.setAttribute('aria-label', 'Fechar menu')
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.contains('is-open')

    if (isOpen) {
      closeMenu()
      return
    }

    openMenu()
  })

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = navigation.contains(event.target)
    const clickedToggle = menuToggle.contains(event.target)

    if (
      navigation.classList.contains('is-open') &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {
      closeMenu()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu()
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      closeMenu()
    }
  })
}