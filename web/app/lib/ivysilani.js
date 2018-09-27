import ATV from 'atvjs'

import staticData from './static-data'

const _ = ATV._ // lodash

// import qs from 'qs';

const BASE_XML_URL = 'https://www.ceskatelevize.cz'
const TOKEN_URL = `${BASE_XML_URL}/services/ivysilani/xml/token/`
const IMAGE_WIDTH = 1280

const toQueryString = obj => (
  _.map(obj, (v, k) => {
    if (_.isArray(v)) {
      return (_.map(v, av => `${k}[]=${av}`)).join('&')
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  })
).join('&')

const makeToken = () => {
  const params = 'user=iDevicesMotion'

  const http = new XMLHttpRequest()
  http.open('POST', TOKEN_URL, false)
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  http.send(params)

  if (http.status === 200) {
    const token = http.responseXML.firstChild.textContent
    console.log(token)
    return token
  }
  return 'Neco se pokazilo'
}

const xhrOptions = (params) => {
  const baseParams = {
    token: makeToken(),
    imageType: IMAGE_WIDTH
  }
  console.log(`${toQueryString(baseParams)}&${toQueryString(params)}`)
  return {
    data: `${toQueryString(baseParams)}&${toQueryString(params)}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    responseType: 'text'
  }
}

const generateDates = () => {
  const data = []
  for (let i = 0; i <= 30; i += 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dd = date.getDate()
    const mm = date.getMonth() + 1 // January is 0!
    const yyyy = date.getFullYear()
    data.push({
      date: `${yyyy}-${mm < 10 ? (`0${mm}`) : mm}-${dd + 1 < 10 ? (`0${dd}`) : dd}`,
      title: `${dd}.${mm}.${yyyy}`,
      poster_path: `img/dates/${dd}.lcr`
    })
  }
  return data
}

const syncAjax = (url, options) => {
  const http = new XMLHttpRequest()
  http.open('GET', url, false)
  http.responseType = options.responseType
  http.send()
  if (http.status === 200) {
    return http.response
  }
  return 'Neco se pokazilo'
}

const url = {
  // URLS Generators
  get programmeList () {
    return `${BASE_XML_URL}/services/ivysilani/xml/programmelist/`
  },
  get programmeDetails () {
    return `${BASE_XML_URL}/services/ivysilani/xml/programmedetail/`
  },
  get playlist () {
    return `${BASE_XML_URL}/services/ivysilani/xml/playlisturl/`
  },
  get timeshift () {
    return `${BASE_XML_URL}/services/ivysilani/xml/timeshifturl`
  }
}

const get = {
  get alphabetList () {
    return staticData.alphabet
  },
  get datesList () {
    return generateDates()
  },
  get genresList () {
    return staticData.genres
  },
  liveChannel (name) {
    if (name === 'ČT1') { return 'CT1' }
    if (name === 'ČT2') { return 'CT2' }
    if (name === 'ČT24') { return 'CT24' }
    if (name === 'ČT Sport') { return 'CT4' }
    if (name === 'ČT :D') { return 'CT5' }
    if (name === 'ČT Art') { return 'CT6' }
    return name
  },
  get imageWidth () {
    return IMAGE_WIDTH
  }
}

export default {
  xhrOptions,
  syncAjax,
  url,
  get
}
