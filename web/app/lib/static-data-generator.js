import ATV from 'atvjs'

const _ = ATV._

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const randomHex = () => Math.floor(Math.random() * 16777215).toString(16)

export default function (count = 1) {
  const data = []
  for (let i = 0; i < count; i += 1) {
    data.push({
      id: _.uniqueId(),
      title: `Title ${i + 1}`,
      tagline: `Awesome title tagline ${i + 1}`,
      popularity: _.random(20, 100, true),
      poster_path: `260x375/${randomHex()}`,
      overview: loremIpsum,
      runtime: _.random(80, 180),
      release_date: '2016-12-12'
    })
  }
  if (count === 1) {
    return data[0]
  }
  return data
}
