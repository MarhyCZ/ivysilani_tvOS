import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/ivysilani.js'
import fastXmlParser from 'fast-xml-parser'

const HomePage = ATV.Page.create({
  name: 'home',
  template: template,
  ready (options, resolve, reject) {
    let getTipsMain = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'tipsMain' }))
    let getTipsDay = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'topDay' }))
    let getTipsWeek = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'topWeek' }))
    let getTipsNote = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'tipsNote' }))
    let getTipsArchive = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'tipsArchive' }))
    let getTipsWatching = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ 'spotlight': 'watching' }))

    // Then resolve them at once
    Promise
      .all([getTipsMain, getTipsDay, getTipsWeek, getTipsNote, getTipsArchive, getTipsWatching])
      .then((xhrs) => {
        let tipsMain = fastXmlParser.parse(xhrs[0].response).programmes
        let tipsToday = fastXmlParser.parse(xhrs[1].response).programmes
        let tipsWeek = fastXmlParser.parse(xhrs[2].response).programmes
        let tipsNote = fastXmlParser.parse(xhrs[3].response).programmes
        let tipsArchive = fastXmlParser.parse(xhrs[4].response).programmes
        let tipsWatching = fastXmlParser.parse(xhrs[5].response).programmes

        resolve({
          tipsMain: tipsMain.programme,
          tipsToday: tipsToday.programme,
          tipsWeek: tipsWeek.programme,
          tipsNote: tipsNote.programme,
          tipsArchive: tipsArchive.programme,
          tipsWatching: tipsWatching.programme,
          letters: API.get.alphabetList,
          genres: API.get.genresList
        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default HomePage
