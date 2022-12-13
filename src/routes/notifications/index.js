import { getNotifications } from './controllers'
import { Router } from 'express'
import { token } from '~/services/passport'
import { middleware as query } from 'querymen'

const router = new Router()

router.get('/get',
  query(),
  token({ required: true }),
  getNotifications)

export default router
