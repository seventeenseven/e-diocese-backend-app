import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { compile, headersSent } from '~/utils/morgan'
import { errorHandler, initLanguage } from '~/middlewares'
import { env } from '~/config'
import i18n from '~/services/i18n'
// import * as Sentry from '@sentry/node'

const addRequestId = require('express-request-id')()
const fileUpload = require('express-fileupload')
const userAgent = require('express-useragent')

// Sentry setup
// Sentry.init({dsn: sentry.url})

export default (apiRoot, routes) => {
  const app = express()

  app.set('views', path.resolve('./src/views'))
  app.set('view engine', 'ejs')

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(addRequestId)
    app.use(fileUpload())
    app.use(userAgent.express())
    app.use(morgan(function developmentFormatLine (tokens, req, res) {
      // get the status code if response written
      var status = headersSent(res)
        ? res.statusCode
        : undefined

      // get status color
      var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
            : status >= 200 ? 32 // green
              : 0 // no color

      // get colored function
      var fn = developmentFormatLine[color]

      if (!fn) {
        // compile
        fn = developmentFormatLine[color] = compile('\x1b[0m:method :url \x1b[' +
          color + 'm:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m')
      }

      return fn(tokens, req, res)
    }))
  }
  // if (env === 'production') {
  //   app.use(Sentry.Handlers.requestHandler())
  //   app.use(Sentry.Handlers.errorHandler())
  // }
  app.use(express.static(path.join(__dirname, '../../views/static')))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ strict: false }))
  app.use(initLanguage(i18n))
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(errorHandler)

  return app
}
