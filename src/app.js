import http from 'http'
import { mongo, apiRoot } from './config.js'

import  mongoose from './services/mongoose/index.js'
//import express from './services/express/index.js'
import createApp from './services/express/index.js'
import router from './routes/index.js'
import registerHandlers from './events.js'

const PORT = process.env.PORT || 5000
const app = createApp(apiRoot, router)

const server = http.createServer(app)

mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

setImmediate(() => {
  console.log('ICI', mongo.uri)
  server.listen(PORT, () => console.log(`Listening on ${PORT}`))
})

registerHandlers(app)

app.use((req, res, next) => {
  console.log('Received data:', req.body);
  next();
});

export default app
