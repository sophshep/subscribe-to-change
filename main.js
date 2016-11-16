(function() {
  function calculateServiceTotal() {
    const serviceCheckboxes = document.querySelectorAll('input[name="subscription"]:checked')
    let total = 0
    for (let i = 0; i < serviceCheckboxes.length; i++) {
      total = total + parseFloat(serviceCheckboxes[i].value)
    }
    return total
  }

  function subscribeToChange(event) {
    const serviceSelection = document.getElementById('service-selection')
    serviceSelection.style.display = 'none'

    const serviceTotal = calculateServiceTotal().toFixed(2)
    document.getElementById('service-total').textContent = `$${serviceTotal}`

    const results = document.getElementById('results')
    results.style.display = 'block'
  }

  function hookUpButton() {
    const button = document.getElementById('subscribe-to-change')
    button.addEventListener('click', subscribeToChange)
  }

  hookUpButton()
})()
