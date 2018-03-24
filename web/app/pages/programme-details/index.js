import ATV from 'atvjs'
import fastXmlParser from 'fast-xml-parser'

import template from './template.hbs'
import API from 'lib/ivysilani.js'

const _ = ATV._

var ProgrammeDetailsPage = ATV.Page.create({
  name: 'programme-details',
  template: template,
  ready: function (options, resolve, reject) {
    // get data from multiple requests
    // ATV.Navigation.showLoading({data : {message: 'Načítání'}});

    // let getProgrammeDetails = ATV.Ajax.get(API.programmeDetails(options.ID));
    let getProgrammeDetails = ATV.Ajax.post(API.url.programmeDetails, API.xhrOptions({ID: options.ID}))
    // let getRelatedList = ATV.Ajax.get(API.relatedList(options.ID));
    let getRelatedList = ATV.Ajax.post(API.url.programmeList, API.xhrOptions(
      {
        ID: options.ID,
        'type[0]': 'related'
      }
    ))
    // Then resolve them at once
    Promise
      .all([getProgrammeDetails, getRelatedList])
      .then((xhrs) => {
        // Modifikace detailů
        let details = fastXmlParser.parse(xhrs[0].response).programme

        if (_.isEmpty(details.description)) { details.description = 'Tento pořad nemá žádný popisek' };
        details.ratingFloat = details.ratingPercentage / 100
        if (_.isEmpty(details.partTitle)) { details.partTitle = details.datePremiere };

        // Modifikace souvisejících
        let related = fastXmlParser.parse(xhrs[1].response).programmes

        resolve({
          details: details,
          related: related.related.programme
        })
      }, (xhr) => {
        // error
        reject()
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
  }
})

export default ProgrammeDetailsPage
