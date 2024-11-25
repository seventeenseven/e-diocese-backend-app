import { proxy } from '../config.js'
import { Router } from 'express'
import dev from './dev/index.js'
import auth from './auth/index.js'
import users from './users/index.js'
import notifications from './notifications/index.js'
import church from './church/index.js'
import admin from './admin/index.js'
import { sendHttpError } from '../middlewares/index.js'
import axios from 'axios';
const router = new Router()

router.use(sendHttpError)
router.use('/dev', dev)
router.use('/auth', auth)
router.use('/users', users)
router.use('/notifications', notifications)
router.use('/church', church)
router.use('/admin', admin)

// route test user
router.get('/test', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json', {
      proxy: {
        host: proxy.host,
        port: proxy.port,
        auth: proxy.auth // Si le proxy nécessite une authentification
      }
    });
    res.json({ success: true, ip: response.data.ip });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router
