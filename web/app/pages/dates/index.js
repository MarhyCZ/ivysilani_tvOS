import ATV from 'atvjs'
import template from './template.hbs'
import API from 'lib/ivysilani.js'

//  const _ = ATV._

const DatesPage = ATV.Page.create({
  name: 'dates',
  data () {
    return {results: API.get.datesList}
  },
  template: template
})

export default DatesPage
