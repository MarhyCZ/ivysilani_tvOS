import ATV from 'atvjs'

const favInit = () => {
  let favorites = ATV.Settings.get('favorites')
  if (favorites === undefined) {
    favorites = []
    ATV.Settings.set('favorites', favorites)
  }
}

const change = (title, id) => {
  favInit()
  if (isFav(id)) {
    remove(id)
    return false
  } else {
    add(title, id)
    return true
  }
}
const add = (title, id) => {
  let favorites = ATV.Settings.get('favorites')
  favorites.push({ title: title, ID: id })
  favorites.sort((a, b) => a['title'].localeCompare(b['title']))
  ATV.Settings.set('favorites', favorites)
  console.log(ATV.Settings.get('favorites'))
}

const remove = (id) => {
  let favorites = ATV.Settings.get('favorites')
  favorites = favorites.filter(object => object.ID !== id)
  ATV.Settings.set('favorites', favorites)
}

const isFav = (id) => {
  favInit()
  let favorites = ATV.Settings.get('favorites')
  if (favorites === undefined) {
    favorites = []
    ATV.Settings.set('favorites', favorites)
  }

  let show = favorites.find(object => object.ID === id)
  if (show === undefined) {
    return false
  } else {
    return true
  }
}
export default {
  change,
  isFav
}
