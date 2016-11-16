(function() {
  function getSelectedServices() {
    return document.querySelectorAll('input[name="subscription"]:checked')
  }

  function getSelectedCauses() {
    return document.querySelectorAll('input[name="cause"]:checked')
  }

  function calculateServiceTotal() {
    const serviceCheckboxes = getSelectedServices()
    let total = 0
    for (let i = 0; i < serviceCheckboxes.length; i++) {
      total = total + parseFloat(serviceCheckboxes[i].value)
    }
    return total
  }

  function getNonprofitPhrase() {
    const causeCheckboxes = getSelectedCauses()
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

  function showForm() {
    document.getElementById('service-selection').style.display = 'block'
    document.getElementById('results').style.display = 'none'
  }

  function showTotalExpenses() {
    const serviceTotal = calculateServiceTotal().toFixed(2)
    document.getElementById('service-total').textContent = `$${serviceTotal}`
  }

  function showNonprofitCount() {
    const nonprofitPhrase = getNonprofitPhrase()
    document.getElementById('nonprofit-phrase').textContent = nonprofitPhrase
  }

  function showAssociatedNonprofits() {
    const causeCheckboxes = getSelectedCauses()
    for (let i = 0; i < causeCheckboxes.length; i++) {
      const cause = causeCheckboxes[i].value
      const nonprofit = document.querySelector(`.nonprofit[data-cause="${cause}"]`)
      nonprofit.style.display = 'block'
    }
  }

  function subscribeToChange() {
    showTotalExpenses()
    showNonprofitCount()
    showAssociatedNonprofits()
    showResults()
  }

  function hideNonprofits() {
    const nonprofits = document.querySelectorAll('.nonprofit')
    for (let i = 0; i < nonprofits.length; i++) {
      nonprofits[i].style.display = 'none'
    }
  }

  function reset() {
    hideNonprofits()
    showForm()
  }

  function hookUpButtons() {
    const subscribeButton = document.getElementById('subscribe-to-change')
    subscribeButton.addEventListener('click', subscribeToChange)

    const resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', reset)
  }

  function toggleButton() {
    const serviceCheckboxes = getSelectedServices()
    const causeCheckboxes = getSelectedCauses()
    const button = document.getElementById('subscribe-to-change')
    button.disabled = causeCheckboxes.length < 1 || serviceCheckboxes.length < 1
  }

  function listenForCheckboxChanges() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', toggleButton)
    }
  }

  hookUpButtons()
  listenForCheckboxChanges()
})()
