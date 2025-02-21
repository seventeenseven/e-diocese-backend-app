import { HttpError } from '../../../services/error/index.js'
import User from '../../../models/user/index.js'
import i18n from '../../../services/i18n/index.js'
import { sign } from '../../../services/jwt/index.js'
import { security } from '../../../config.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const user = await User.findByEmail(body.email)
    if (!user) {
      throw new HttpError(404, i18n.__('userNotFound'))
    }
    const errorMessage = user.checkEmailVerificationCode(body.code)
    if (errorMessage) {
      throw new HttpError(400, errorMessage)
    }
    await user.resetEmailVerificationCode()

    const token = await sign(user.id, {
      expiresIn: security.jwtStrategyExpiry
    })
    return res.json({ success: true, token })
  } catch (err) {
    return next(err)
  }
}
