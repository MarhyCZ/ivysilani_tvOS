import ATV from 'atvjs'
import fastXmlParser from 'fast-xml-parser'

import template from './template.hbs'
import API from 'lib/ivysilani.js'
import favorites from 'lib/favorites.js'

let showInfo

var AlphabetLetterPage = ATV.Page.create({
  name: 'programme-list',
  template: template,
  ready: function (options, resolve, reject) {
    // ATV.Navigation.showLoading({data : {message: 'Načítání'}});
    // Paging support
    let currentPage
    let pageSize = 20
    if ('paging' in options) { currentPage = options.paging.nextPage } else { currentPage = '1' }
    if ('showInfo' in options) { showInfo = options.showInfo } else { showInfo = options }
    // Když přicestuji z programme-details kliknutim na dalsi epizody
    if ('SIDP' in options) { options.ID = options.SIDP }

    let getProgrammeList = ATV.Ajax.post(API.url.programmeList, API.xhrOptions(
      {
        ID: showInfo.ID,
        'paging[episodes][currentPage]': currentPage,
        'paging[episodes][pageSize]': pageSize,
        'type[0]': 'episodes',
        'type[1]': 'related',
        'type[2]': 'bonuses'
      }
    ))

    // Then resolve them at once
    // Old template {{{programmeImg ../showInfo.ID ID}}}
    Promise
      .all([getProgrammeList])
      .then((xhrs) => {
        let programmeList = fastXmlParser.parse(xhrs[0].response).programmes
        console.log(programmeList)
        // console.log(xhrs[0].response)

        // Modifikace pagování, odstraň paging, pokud se všechno vešlo na 1 stránku
        if (programmeList.episodes.paging.pagesCount === 1) { delete programmeList.episodes.paging }
        // U některých pořadů má iVysílání chybu -> ukazuje, že je více stránek,
        // přitom další už je prázdná
        if (programmeList.episodes.programme.length < pageSize) { delete programmeList.episodes.paging }
        // Pokud to není seriál ale film, obal to do pole, kvůli korektnímu zobrazení
        // Kvuli konverzti XML -> JSON. fastXMLParser hodí jednu epizodu jako child, ne jako pole
        if (!(programmeList.episodes.programme.constructor === Array)) { programmeList.episodes.programme = [programmeList.episodes.programme] }

        // Pokud se pořad nachází v oblíbených, uprav vzhled tlačítka
        let ratedState
        if (favorites.isFav(showInfo.ID)) { ratedState = 'resource://button-rated' } else { ratedState = 'resource://button-rate' }

        resolve({
          ratedState: ratedState,
          showInfo: showInfo,
          paging: programmeList.episodes.paging,
          episodes: programmeList.episodes.programme
        })
      }, (xhr) => {
        // error
        reject()
      })
  },
  afterReady (doc) {
    // Zavolá funkci, která buď přidá(true) nebo odebere(false) pořad z oblíbených
    const changeFavorites = () => {
      if (favorites.change(showInfo.title, showInfo.ID)) {
        doc.getElementById('favButton').innerHTML = '<badge src="resource://button-rated" />'
      } else {
        doc.getElementById('favButton').innerHTML = '<badge src="resource://button-rate" />'
      }
    }

    // Naslouchání stisknutí tlačítka
    doc
      .getElementById('favButton')
      .addEventListener('select', changeFavorites)
  }
})
/*
        // get the unique id of the asset
        let letterLink = options.link;

        // load data and then resolve promise
        ATV.Ajax
        //.get(API.listLetter(letterLink))
            .get('http://hd-tech.cz/most.php?url=http://hbbtv.ceskatelevize.cz/ivysilani/services/letter.php?letter=a')
            .then((xhr) => {
                let shows = xhr.response;

                resolve({
                    shows: shows.programme
                });
            }, (xhr) => {
                // error
                reject();
            });
        // for demo using static content
//      resolve(staticData());
        */

export default AlphabetLetterPage
