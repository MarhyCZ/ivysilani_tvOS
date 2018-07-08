import ATV from 'atvjs'
import fastXmlParser from 'fast-xml-parser'

import API from 'lib/ivysilani.js'

// const _ = ATV._;

const PlayPage = ATV.Page.create({
  name: 'play',
  ready (options, resolve, reject) {
    /* let getVideoUrl = ATV.Ajax.get(API.url.videoUrl({id: options.ID,qualities: `{"VOD":"max1080p","LIVE":"max720p"}`}));
    playerType = flash, ios, iPad je to same - m3u8 playlist s ruznymi kvalitami
    playerType = progressive je jako HbbTV. Dava primo video. v tvOS to vyusti, ze prehravac ma thumbnaily na timeline
    je potreba pouzit okhttp User-Agent, jinak to bude playerType ignorovat a pusti to dash
    u progressive je potreba kvalita 'max1080p', ktera vybere konkretni stream, namisto celeho m3u8 playlistu
    max1080p zajistuje, ze pro videa s rozlisenim mensi nez 1080p, se automaticky vybere mensi kvalita a nedojde k chybe

    Update: po změně providera CDN už není potřeba user-agent, request funguje i bez toho

    // Zkontroluj, jestli se jedná o live show a neni to Video on Demand. Tam se bude jednat o string, protoze fastXmlParser konverze.
    // && (options.isVod === "")

    if ('elapsedPercentage' in options) {
      let channelName = API.get.liveChannel(options.channelTitle)
      getPlaylistUrl = ATV.Ajax.post(API.url.timeshift, API.xhrOptions(
        {
          channel: channelName,
          playerType: 'ios',
          quality: 'web',
          timeshiftWindow: 1
        }
      ))
    }
*/
    // Zkontroluj, Jestli se nejedna o live show a jestli to je vysilani ve forme Video on Demand.
    // || (("elapsedPercentage" in options) && (options.isVod == 1))

    let setQuality
    let setPlayerType
    if (options.isVod === '') {
      setQuality = 'web'
      setPlayerType = 'ios'
    } else {
      setQuality = 'max1080p'
      setPlayerType = 'progressive'
    }
    const getPlaylistUrl = ATV.Ajax.post(API.url.playlist, API.xhrOptions({
      ID: options.ID,
      quality: setQuality,
      playerType: setPlayerType,
      playlistType: 'json'
    }))

    // Then resolve them at once
    Promise
      .all([getPlaylistUrl])
      .then((xhrs) => {
        const parsed = fastXmlParser.parse(xhrs[0].response)
        const playlistUrl = Object.values(parsed)[0]
        console.log(playlistUrl)

        const player = new Player()
        const tvosPlaylist = new Playlist()

        const playlist = API.syncAjax(playlistUrl, { responseType: 'json' }).playlist

        // Iterate and stack up the playlist queue [0].streamUrls.main
        Object.entries(playlist).forEach(([key, value]) => {
          //  const streamUrls = API.syncAjax(value.streamUrls.main, { responseType: 'text' })
          //  const lines = streamUrls.split(/\r\n|\r|\n/)

          const mediaItem = new MediaItem('video', value.streamUrls.main)
          mediaItem.artworkImageURL = value.previewImageUrl
          mediaItem.title = value.title
          tvosPlaylist.push(mediaItem)

          if (key == 0) {
            player.playlist = tvosPlaylist
            player.play()
          }
        })

        resolve(false)
      }, (xhr) => {
        // error
        reject(xhr)
      })
  }
})

export default PlayPage
