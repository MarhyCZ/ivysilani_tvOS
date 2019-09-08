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
        let channels = fastXmlParser.parse(xhrs[0].response).programmes
        // Modifikace kanálů
        console.log(channels)
        channels.channel1.tintColor = '#ff0000'
        channels.channel1.channelLogo = 'img/channels/ct1.png'

        channels.channel2.tintColor = '#f7a400'
        channels.channel2.channelLogo = 'img/channels/ct2.png'

        if ('channel5' in channels) {
          channels.channel5.tintColor = '#ff6400'
          channels.channel5.channelLogo = 'img/channels/ctd.png'
        }

        channels.channel6.tintColor = 'gray'
        channels.channel6.channelLogo = 'img/channels/ctart.png'

        channels.channel24.tintColor = '#027dee'
        channels.channel24.channelLogo = 'img/channels/ct24.png'

        channels.channel4.tintColor = '#33cc00'
        channels.channel4.channelLogo = 'img/channels/ctsport.png'

        Object.entries(channels).forEach(([key, value]) => {
          if (value.live.programme.channelTitle === '') {
            value.live.programme.title = 'Nyní nevysílá online'
            value.live.programme.imageURL = `${ATV.launchOptions.BASEURL}assets/img/channels/offline.jpg`
          }
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
