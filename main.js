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
    ps_plus: 4.99,

    // Sports
    nba: 16.99,
    mlb: 9.16,
  }

  const causes = {
    immigration: 'Immigration',
    reproductive: 'Reproductive Health',
    'civil-rights': 'Civil Rights',
    'climate-change': 'Climate Change',
    'trans-rights': 'Transgender Rights',
    lgbtq: 'LGBTQ Youth',
    criminal: 'Criminal Justice',
    'police-violence': 'Police Violence',
    journalism: 'Nonpartisan Journalism',
  }

  const nonprofitsByCause = {
    immigration: {
      name: 'National Immigration Law Center',
      description: 'The National Immigration Law Center (NILC) is dedicated to defending and advancing the rights of low-income immigrants.',
      url: 'https://nilc.z2systems.com/np/clients/nilc/donation.jsp?campaign=15&'
    },
    reproductive: {
      name: 'Planned Parenthood',
      description: 'Planned Parenthood delivers vital reproductive health care, sex education, and information to millions of women, men, and young people worldwide.',
      url: 'https://secure.ppaction.org/site/Donation2?df_id=12913&12913.donation=form1&_ga=1.38484843.997121566.1477408976'
    },
    'civil-rights': {
      name: 'American Civil Liberties Union',
      description: 'A nonpartisan, nonprofit organization whose stated mission is "to defend and preserve the individual rights and liberties guaranteed to every person in this country by the Constitution and laws of the United States.',
      url: 'https://action.aclu.org/donate-aclu?redirect=donate/join-renew-give#donation-tabs-3'
    },
    'climate-change': {
      name: 'NextGen Climate Action Committee',
      description: 'NextGen Climate acts politically to prevent climate disaster and promote prosperity for every American.',
      url: 'https://nextgenclimate.org/donate/contribute-to-nextgen-climate-action/'
    },
    'trans-rights': {
      name: 'Transgender Law Center',
      description: 'Transgender Law Center works to change law, policy, and attitudes so that all people can live safely, authentically, and free from discrimination regardless of their gender identity or expression.',
      url: 'http://transgenderlawcenter.org/donate'
    },
    lgbtq: {
      name: 'LYRIC',
      description: 'LYRIC’s mission is to build community and inspire positive social change through education enhancement, career trainings, health promotion, and leadership development with LGBTQQ youth, their families, and allies of all races, classes, genders, and abilities.',
      url: 'https://donatenow.networkforgood.org/LYRIC'
    },
    criminal: {
      name: 'The Sentencing Project',
      description: 'The Sentencing Project works for a fair and effective U.S. criminal justice system by promoting reforms in sentencing policy, addressing unjust racial disparities and practices, and advocating for alternatives to incarceration.',
      url: 'http://www.sentencingproject.org/donate/'
    },
    'police-violence': {
      name: 'Campaign Zero',
      description: 'Campaign Zero advocates for policy solutions to end police violence in America.',
      url: 'http://www.joincampaignzero.org/#vision'
    },
    journalism: {
      name: 'ProPublica',
      description: 'ProPublica is an independent, non-profit newsroom that produces investigative journalism in the public interest. ',
      url: 'https://www.propublica.org/donate/'
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

  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  function subscribeToChange() {
    showTotalExpenses()
    showNonprofitCount()
    showAssociatedNonprofits()
    showResults()
    scrollToTop()
  }

  function removeNonprofits() {
    document.getElementById('nonprofits-container').innerHTML = ''
  }

  function reset() {
    removeNonprofits()
    showForm()
    scrollToTop()
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
