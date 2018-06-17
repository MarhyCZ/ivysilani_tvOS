import ATV from 'atvjs'
import Handlebars from 'handlebars'

const _ = ATV._
const imageBaseUrl = 'http://imgct.ceskatelevize.cz/cache/w1280/upload/'

function assetUrl (name) {
  return `${ATV.launchOptions.BASEURL}assets/${name}`
}

// deprecated
function programmeImage (showId, programmeId) {
  if (typeof programmeId === 'object') {
    return `${imageBaseUrl}program/porady/${showId}/foto/uni.jpg?`
  }
  return `${imageBaseUrl}program/porady/${showId}/foto/uni_${programmeId}.jpg?`
}

const helpers = {
  toJSON (obj = {}) {
    let str
    try {
      str = JSON.stringify(obj)
    } catch (ex) {
      str = '{}'
    }
    return str
  },
  asset_url (asset) {
    return new Handlebars.SafeString(assetUrl(asset))
  },
  programmeImg (showId, programmeId) {
    return new Handlebars.SafeString(programmeImage(showId, programmeId))
    // pouzijes to pak jako: {{{programmeImg ID}}}
  },
  fullImageURL (imageURL) {
    return new Handlebars.SafeString('https:' + imageURL)
  }
}

// register all helpers
_.each(helpers, (fn, name) => Handlebars.registerHelper(name, fn))

export default helpers

/* Unused

function imageUrl(name) {
    return ((_.startsWith(name, 'http://') || _.startsWith(name, 'https://')) ? name : `${ATV.launchOptions.BASEURL}assets/img/${name}`);
}

function backgroundImage(img = '', className = '') {
    return `<background><img class="${className}" src="${imageUrl(img)}" /></background>`;
}

img_url(img) {
  return new Handlebars.SafeString(imageUrl(img));
},
background_image(img) {
  return new Handlebars.SafeString(backgroundImage(img));
},
poster_url(size) {
  return new Handlebars.SafeString(`${imageBaseUrl}${size}`);
},
duration(duration) {
  return new Handlebars.SafeString(formatDuration(duration));
},
toFixed(popularity) {
  return Number.prototype.toFixed.call(popularity, 2);
},
pushJSON(obj1 = {}, obj2 = {}) {
  obj1.push(obj2);
  return toJSON(obj1);
}
 */
