
import { proxy } from '~/config'
import { Router } from 'express'
import dev from './dev'
import auth from './auth'
import users from './users'
import notifications from './notifications'
import church from './church'
import admin from './admin'
import { sendHttpError } from '~/middlewares'
import requestPromise from 'request-promise'

const router = new Router()

router.use(sendHttpError)
router.use('/dev', dev)
router.use('/auth', auth)
router.use('/users', users)
router.use('/notifications', notifications)
router.use('/church', church)
router.use('/admin', admin)

// route test user
router.get('/test', (req, res, next) => {
  try {
    requestPromise({uri: 'https://api.ipify.org?format=json', json: true, proxy: proxy})
      .then((data) => {
        res.json({ success: true, ip: data.ip })
      })
      .catch((err) => {
        res.json({ success: false, message: err.message })
      })
  } catch (error) {
    console.log(error)
  }
})

export default router
