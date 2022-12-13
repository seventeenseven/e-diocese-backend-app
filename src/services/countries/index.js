import _ from 'lodash'
import allCountries from './countries.json'
const euList = [
  { country: 'Austria', code: 'AT', vat: 20 },
  { country: 'Belgium', code: 'BE', vat: 21 },
  { country: 'Bulgaria', code: 'BG', vat: 20 },
  { country: 'Croatia', code: 'HR', vat: 25 },
  { country: 'Cyprus', code: 'CY', vat: 19 },
  { country: 'Czech Republic', code: 'CZ', vat: 21 },
  { country: 'Denmark', code: 'DK', vat: 25 },
  { country: 'Estonia', code: 'EE', vat: 20 },
  { country: 'Finland', code: 'FI', vat: 24 },
  { country: 'France', code: 'FR', vat: 20 },
  { country: 'Germany', code: 'DE', vat: 19 },
  { country: 'Greece', code: 'GR', vat: 24 },
  { country: 'Hungary', code: 'HU', vat: 27 },
  { country: 'Ireland', code: 'IE', vat: 23 },
  { country: 'Italy', code: 'IT', vat: 22 },
  { country: 'Latvia', code: 'LV', vat: 21 },
  { country: 'Lithuania', code: 'LT', vat: 21 },
  { country: 'Luxembourg', code: 'LU', vat: 17 },
  { country: 'Malta', code: 'MT', vat: 18 },
  { country: 'Netherlands', code: 'NL', vat: 21 },
  { country: 'Poland', code: 'PL', vat: 23 },
  { country: 'Portugal', code: 'PT', vat: 23 },
  { country: 'Romania', code: 'RO', vat: 20 },
  { country: 'Slovakia', code: 'SK', vat: 20 },
  { country: 'Slovenia', code: 'SI', vat: 22 },
  { country: 'Spain', code: 'ES', vat: 21 },
  { country: 'Sweden', code: 'SE', vat: 25 },
  { country: 'United Kingdom', code: 'GB', vat: 20 }
]

// const africaCountries = ['NG', 'KE', 'GH', 'CM', 'CI']
const countriesWithEuro = []
const phoneCodes = []

_.keys(allCountries).forEach(code => {
  const country = allCountries[code]

  const name = _.get(country, 'name')
  const phone = _.get(country, 'phone', '')
  const currency = _.get(country, 'currency', '')
  const phoneParts = _.split(phone, ',')

  if (phoneParts.length > 1) {
    phoneParts.forEach(phonePart => {
      phoneCodes.push({
        code,
        phone: phonePart,
        name
      })
    })
  } else {
    phoneCodes.push({
      code,
      phone,
      name
    })
  }

  if (currency === 'EUR') {
    countriesWithEuro.push(code)
  }
})

export const getCoutriesPhoneCodes = () => phoneCodes
export const isValidCountryCode = code => _.has(allCountries, code) // return true/false

export const getCurrencyByCountryCode = code => {
  const euroSearch = _.find(euList, eu => eu.code === code)

  if (euroSearch) {
    return 'EUR'
  }

  return _.get(allCountries[code], 'currency', 'USD')
  // if (_.indexOf(africaCountries, code) !== -1 || _.indexOf(countriesWithEuro, code) !== -1) {
  //   return _.get(allCountries[code], 'currency', 'USD')
  // }
  //
  // return 'USD'
}
