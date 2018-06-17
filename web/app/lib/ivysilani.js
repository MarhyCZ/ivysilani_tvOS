import ATV from 'atvjs'

import staticData from './static-data'

const _ = ATV._ // lodash

// import qs from 'qs';

const BASE_GET_URL = 'http://ivysilani.marstad.cz/api/'
const BASE_XML_URL = 'https://www.ceskatelevize.cz'
const BASE_XML_PROXY = 'https://www.ceskatelevize.cz'
const TOKEN_URL = `${BASE_XML_URL}/services/ivysilani/xml/token/`

const makeParams = params => (params ? `?${Object.keys(params).map(key => ([key, params[key]].map(encodeURIComponent).join('='))).join('&')}` : '')
const toQueryString = obj => (
  _.map(obj, (v, k) => {
    if (_.isArray(v)) {
      return (_.map(v, av => `${k}[]=${av}`)).join('&')
    }
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  })
).join('&')

function buildUrl (url, params) {
//    console.log(baseUrl + url + qs.stringify(params));
  return BASE_GET_URL + url + makeParams(params)
}

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
    imageType: 1280
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

const resizeImgUrl = (object) => {
  let stringified = JSON.stringify(object)
  stringified = stringified.replace(/(imgct.ceskatelevize.cz\/cache\/w)([0-9]*)/gm, 'imgct.ceskatelevize.cz/cache/w1280')
  return JSON.parse(stringified)
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
      date: `${yyyy}-${mm + 1 < 10 ? (`0${mm}`) : mm}-${dd + 1 < 10 ? (`0${dd}`) : dd}`,
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
    return `${BASE_XML_PROXY}/services/ivysilani/xml/programmelist/`
  },
  get programmeDetails () {
    return `${BASE_XML_URL}/services/ivysilani/xml/programmedetail/`
  },
  get playlist () {
    return `${BASE_XML_URL}/services/ivysilani/xml/playlisturl/`
  },
  videoUrl (params) {
    return buildUrl('modules/videoplayer-v2/services/videodetail.php', params)
  },
  get timeshift () {
    return `${BASE_XML_URL}/services/ivysilani/xml/timeshifturl`
  }
}

const get = {
  get token () {
    return makeToken()
  },
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
    return 1280
  }
}

const apis = {

  // URLS Generators
  listTips (type) {
    return buildUrl(`ivysilani/services/tips.php?type=${type}`)
  },
  programmeList (params) {
    return buildUrl('ivysilani/services/relatedp.php', params)
  },
  programmeDetails (id) {
    return buildUrl(`modules/videoplayer-v2/services/programmedetail.php?id=${id}`)
  },
  relatedList (id) {
    return buildUrl(`ivysilani/services/related.php?id=${id}`)
  },
  liveList () {
    return buildUrl('ivysilani/services/live.php')
  }
}

export default {
  makeToken,
  xhrOptions,
  resizeImgUrl,
  syncAjax,
  url,
  get,
  apis
}
