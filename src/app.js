import http from 'http'
import { mongo, apiRoot } from '~/config'
import mongoose from '~/services/mongoose'
import express from '~/services/express'
import routes from '~/routes'
import registerHandlers from '~/events'

const PORT = process.env.PORT || 5000
const app = express(apiRoot, routes)

const server = http.createServer(app)

mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

setImmediate(() => {
  console.log('ICI', mongo.uri)
  server.listen(PORT, () => console.log(`Listening on ${PORT}`))
})

registerHandlers(app)

export default app
