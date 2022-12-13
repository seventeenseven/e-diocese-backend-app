import { login, logout, sendVerificationCode } from './controllers'
import { middleware as body } from 'bodymen'
import { Router } from 'express'
import { schema } from '~/models/user'
import { token } from '~/services/passport'

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
      required: true
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
