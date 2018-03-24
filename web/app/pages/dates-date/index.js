import ATV from 'atvjs'
import template from './template.hbs'

import API from 'lib/ivysilani.js'
import fastXmlParser from 'fast-xml-parser'

const DatesDatePage = ATV.Page.create({
  name: 'dates-date',
  template: template,
  ready (options, resolve, reject) {
    ATV.Navigation.showLoading({
      data: {
        message: 'Načítání'
      },
      type: 'document'
    })

    let getCT1 = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '1' }))
    let getCT2 = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '2' }))
    let getCT24 = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '24' }))
    let getCTsport = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '4' }))
    let getCTD = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '5' }))
    let getCTArt = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ date: options.date, channel: '6' }))

    // Then resolve them at once
    Promise
      .all([getCT1, getCT2, getCT24, getCTsport, getCTD, getCTArt])
      .then((xhrs) => {
        let dateCT1 = fastXmlParser.parse(xhrs[0].response).programmes
        let dateCT2 = fastXmlParser.parse(xhrs[1].response).programmes
        let dateCT24 = fastXmlParser.parse(xhrs[2].response).programmes
        let dateCTSport = fastXmlParser.parse(xhrs[3].response).programmes
        let dateCTD = fastXmlParser.parse(xhrs[4].response).programmes
        let dateCTArt = fastXmlParser.parse(xhrs[5].response).programmes

        resolve({
          dateCT1: dateCT1.programme,
          dateCT2: dateCT2.programme,
          dateCT24: dateCT24.programme,
          dateCTSport: dateCTSport.programme,
          dateCTD: dateCTD.programme,
          dateCTArt: dateCTArt.programme,
          dateInfo: options
        })
      }, (xhr) => {
        // error
        reject()
      })
  }
})

export default DatesDatePage
