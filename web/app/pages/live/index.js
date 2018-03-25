import ATV from 'atvjs'
import fastXmlParser from 'fast-xml-parser'

import template from './template.hbs'
import API from 'lib/ivysilani.js'

const LivePage = ATV.Page.create({
  name: 'live',
  template,
  ready (options, resolve, reject) {
    // get data from multiple requests
    let getLiveChannels = ATV.Ajax.post(API.url.programmeList, API.xhrOptions({ current: 1 }))

    // Then resolve them at once
    Promise
      .all([getLiveChannels])
      .then((xhrs) => {
        // Modifikace kanálů
        let channels = fastXmlParser.parse(xhrs[0].response).programmes
        console.log(channels)
        channels.channel1.tintColor = '#ff0000'
        channels.channel1.channelLogo = 'img/channels/ct1.lcr'

        channels.channel2.tintColor = '#f7a400'
        channels.channel2.channelLogo = 'img/channels/ct2.lcr'

        if ('channel5' in channels) {
          channels.channel5.tintColor = '#ff6400'
          channels.channel5.channelLogo = 'img/channels/ctd.lcr'
        }

        channels.channel6.tintColor = 'gray'
        channels.channel6.channelLogo = 'img/channels/ctart.lcr'

        channels.channel24.tintColor = '#027dee'
        channels.channel24.channelLogo = 'img/channels/ct24.lcr'

        channels.channel4.tintColor = '#33cc00'
        channels.channel4.channelLogo = 'img/channels/ctsport.lcr'

        Object.entries(channels).forEach(([key, value]) => {
          if (value.live.programme.channelTitle === '') { value.live.programme.title = 'Nyní nevysílá online' }
        })

        resolve({
          channels
        })
      }, (xhr) => {
        // error
        reject(xhr)
      })
  }
})

export default LivePage
