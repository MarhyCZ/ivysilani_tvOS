import ATV from 'atvjs'
import template from './template.hbs'
import API from 'lib/ivysilani.js'

//  const _ = ATV._

const AlphabetPage = ATV.Page.create({
  name: 'alphabet',
  data () {
    return { results: API.get.alphabetList }
  },
  template
})

export default AlphabetPage
