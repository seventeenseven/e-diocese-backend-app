import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { errorHandler, initLanguage } from '../../middlewares/index.js'
import { env } from '../../config.js'
import i18n from '../../services/i18n/index.js'
import { fileURLToPath } from "url"
import addRequestId from 'express-request-id'
import fileUpload from 'express-fileupload'
import userAgent from 'express-useragent'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (apiRoot, routes) => {
  const app = express()

  // Configuration des vues
  app.set('views', path.resolve('./src/views'))
  app.set('view engine', 'ejs')

  // Middlewares conditionnels
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(addRequestId())
    app.use(fileUpload())
    app.use(userAgent.express())
    app.use(morgan('dev'))
  }

  // Middlewares essentiels
  app.use(express.static(path.join(__dirname, '../../../public')))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({ strict: false }))
  app.use(initLanguage(i18n))

  // Routes
  app.use(apiRoot, routes)

  // Gestion d'erreurs
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(errorHandler)

  return app
}
