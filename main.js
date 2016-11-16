(function() {
  const serviceCosts = {
    // Television
    netflix: 9.99,
    hulu: 7.99,
    amazon: 8.99,
    hbo: 14.99,
    showtime: 10.99,
    sling: 20,
    ps_vue: 29.99,

    // Music
    spotify: 9.99,
    apple_music: 9.99,
    google_music: 9.99,
    pandora: 4.99,
    soundcloud: 7,

    // Books
    audible: 14.95,
    kindle: 9.99,

    // Games
    xbox: 4.99,

    // Sports
    nba: 16.99,
    mlb: 9.16,
  }

  const causes = {
    immigration: 'Immigration',
    reproductive: 'Reproductive Health',
    'civil-rights': 'Civil Rights',
    'climate-change': 'Climate Change',
    education: 'Education',
    'trans-rights': 'Transgender Rights',
    lgbtq: 'LGBTQ Youth',
    criminal: 'Criminal Justice',
    'police-violence': 'Police Violence',
    journalism: 'Nonpartisan Journalism',
  }

  const nonprofitsByCause = {
    immigration: {
      name: 'insert immigration nonprofit here',
      description: '',
      url: ''
    },
    reproductive: {
      name: 'Planned Parenthood',
      description: '',
      url: ''
    },
    'civil-rights': {
      name: 'American Civil Liberties Union',
      description: 'A nonpartisan, nonprofit organization whose stated mission is "to defend and preserve the individual rights and liberties guaranteed to every person in this country by the Constitution and laws of the United States.',
      url: ''
    },
    'climate-change': {
      name: 'Union of Concerned Scientists',
      description: '',
      url: ''
    },
    education: {
      name: 'insert education nonprofit here',
      description: '',
      url: ''
    },
    'trans-rights': {
      name: 'Trans lifeline',
      description: '',
      url: ''
    },
    lgbtq: {
      name: 'insert LGBTQ nonprofit here',
      description: '',
      url: ''
    },
    criminal: {
      name: 'insert criminal justice nonprofit here',
      description: '',
      url: ''
    },
    'police-violence': {
      name: 'Campaign Zero',
      description: 'Campaign Zero advocates for policy solutions to end police violence in America.',
      url: ''
    },
    journalism: {
      name: 'insert nonpartisan journalism nonprofit here',
      description: '',
      url: ''
    },
  }

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
    const template = document.getElementById('nonprofit-template').innerHTML
    Mustache.parse(template)
    let nonprofitsHTML = ''
    for (let i = 0; i < causeCheckboxes.length; i++) {
      const cause = causeCheckboxes[i].value
      const nonprofit = nonprofitsByCause[cause]
      nonprofitsHTML += Mustache.render(template, nonprofit)
    }
    document.getElementById('nonprofits-container').innerHTML = nonprofitsHTML
  }

  function subscribeToChange() {
    showTotalExpenses()
    showNonprofitCount()
    showAssociatedNonprofits()
    showResults()
  }

  function removeNonprofits() {
    document.getElementById('nonprofits-container').innerHTML = ''
  }

  function reset() {
    removeNonprofits()
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

  function listServices() {
    const container = document.getElementById('services-container')
    const template = document.getElementById('service-template').innerHTML
    Mustache.parse(template)
    let servicesHTML = ''
    for (let service in serviceCosts) {
      const cost = serviceCosts[service]
      servicesHTML += Mustache.render(template, {service: service, cost: cost})
    }
    container.innerHTML = servicesHTML
  }

  function listCauses() {
    const container = document.getElementById('causes-container')
    const template = document.getElementById('cause-template').innerHTML
    Mustache.parse(template)
    let causesHTML = ''
    for (let key in causes) {
      const name = causes[key]
      causesHTML += Mustache.render(template, {key: key, name: name})
    }
    container.innerHTML = causesHTML
  }

  listServices()
  listCauses()
  hookUpButtons()
  listenForCheckboxChanges()
})()
