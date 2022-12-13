import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'fr'
})

export default i18n
