(function() {
  function subscribeToChange(event) {
    const serviceSelection = document.getElementById('service-selection')
    serviceSelection.style.display = 'none'

    const results = document.getElementById('results')
    results.style.display = 'block'
  }

  function hookUpButton() {
    const button = document.getElementById('subscribe-to-change')
    button.addEventListener('click', subscribeToChange)
  }

  hookUpButton()
})()
