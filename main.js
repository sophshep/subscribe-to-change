(function() {
  function calculateServiceTotal() {
    const serviceCheckboxes = document.querySelectorAll('input[name="subscription"]:checked')
    let total = 0
    for (let i = 0; i < serviceCheckboxes.length; i++) {
      total = total + parseFloat(serviceCheckboxes[i].value)
    }
    return total
  }

  function getNonprofitPhrase() {
    const causeCheckboxes = document.querySelectorAll('inut[name="cause"]:checked')
    console.log(causeCheckboxes)
    const nonprofitCount = causeCheckboxes.length
    if (nonprofitCount === 1) {
      return 'is 1 nonprofit that needs'
    }
    return `are ${nonprofitCount} nonprofits that need`
  }

  function showResults() {
    document.getElementById('service-selection').style.display = 'none'
    document.getElementById('results').style.display = 'block'
  }

  function subscribeToChange(event) {
    const serviceTotal = calculateServiceTotal().toFixed(2)
    document.getElementById('service-total').textContent = `$${serviceTotal}`

    const nonprofitPhrase = getNonprofitPhrase()
    document.getElementById('nonprofit-phrase').textContent = nonprofitPhrase

    showResults()
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
