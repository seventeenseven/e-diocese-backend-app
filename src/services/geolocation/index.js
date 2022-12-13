import geolite2 from 'geolite2-redist'
import maxmind from 'maxmind'
import QuickLRU from 'quick-lru'

let lookup = null
let lru = new QuickLRU({
  maxSize: 100
})

export const getLocation = async (ipAddress) => {
  if (lru.has(ipAddress)) return lru.get(ipAddress) || {}
  const result = await getSafeLocation(ipAddress)
  lru.set(ipAddress, result)
  return result
}

const getSafeLocation = async (ipAddress) => {
  try {
    return getUnsafeLocation(ipAddress)
  } catch (error) {
    return {}
  }
}

const getUnsafeLocation = async (ipAddress) => {
  if (!lookup) { lookup = await geolite2.open('GeoLite2-City', (path) => maxmind.open(path)) }
  return lookup.get(ipAddress) || {}
}
