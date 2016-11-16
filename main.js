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

  function toggleButton() {
    const serviceCheckboxes = document.querySelectorAll('input[name="subscription"]:checked')
    const causeCheckboxes = document.querySelectorAll('inut[name="cause"]:checked')
    console.log('services checked:', serviceCheckboxes.length, '/ causes checked:', causeCheckboxes.length)
    const button = document.getElementById('subscribe-to-change')
    button.disabled = causeCheckboxes.length < 1 || serviceCheckboxes.length < 1
  }

  function listenForCheckboxChanges() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', toggleButton)
    }
  }

  hookUpButton()
  listenForCheckboxChanges()
})()
