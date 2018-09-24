import ATV from 'atvjs'
import fastXmlParser from 'fast-xml-parser'

import template from './template.hbs'
import API from 'lib/ivysilani.js'

const FavoritesPage = ATV.Page.create({
  name: 'favorites',
  template,
  ready (options, resolve, reject) {
    let favorites = ATV.Settings.get('favorites')

    if (favorites === undefined) {
      ATV.Navigation.showError({
        data: {
          title: 'Žádné oblíbené pořady',
          message: 'Zkuste nějaké přidat při procházení'
        },
        type: 'document'
      })
      // makeDom(cfg, response)
    }

    var promises = []

    // Issue a request for each show and then parse into JSON
    favorites.forEach((value) => {
      promises.push(
        ATV.Ajax.post(API.url.programmeDetails, API.xhrOptions({ ID: value.ID }))
          // Promise
          .then((xhr) => {
            value.showInfo = fastXmlParser.parse(xhr.response).programme
            // Pokud uživatel přejde na serial z oblibenych, do showInfo se načte poslední epizoda
            // Nahraď tedy promennou ID promennou SIDP (Show ID)
            value.showInfo.ID = value.showInfo.SIDP
            console.log(value.showInfo)
          }))
    })

    // After all requests are done
    Promise
      .all(promises)
      .then(() => {
        resolve({
          favorites
        })
      }, (xhr) => {
        // error
        reject(xhr)
      })
  }
})

export default FavoritesPage
