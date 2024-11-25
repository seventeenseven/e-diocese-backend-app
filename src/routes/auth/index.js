import { login, logout, sendVerificationCode } from './controllers/index.js'
import { middleware as body } from 'bodymen'
import { Router } from 'express'
import { schema } from '../../models/user/index.js'
import { token } from '../../services/passport/index.js'

const router = new Router()

const { phone } = schema.tree

router.post(
  '/login',
  body({
    // email,
    // password: {
    //   type: String,
    //   required: true
    // }
    phone,
    code: {
      type: String,
      required: false
    }
  }),
  login
)
router.delete('/logout/:id',
  token({ required: true }),
  logout)

router.post(
  '/send-verification-code',
  body({
    phone
  }),
  sendVerificationCode
)

export default router
