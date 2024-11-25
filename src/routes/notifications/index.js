import { getNotifications } from './controllers/index.js'
import { Router } from 'express'
import { token } from '../../services/passport/index.js'
import { middleware as query } from 'querymen'

const router = new Router()

router.get('/get',
  query(),
  token({ required: true }),
  getNotifications)

export default router
