import ATV from 'atvjs'
import template from './template.hbs'
import API from 'lib/ivysilani.js'

//  const _ = ATV._

const GenresPage = ATV.Page.create({
  name: 'genres',
  data () {
    return {results: API.genresList()}
  },
  template: template
})

export default GenresPage
