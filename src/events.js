import {EventEmitter} from 'events'

export default (app) => {
  const events = new EventEmitter()
  app.set('events', events)
}
