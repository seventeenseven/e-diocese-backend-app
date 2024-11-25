import { HttpError } from '../../../services/error'
import User from '../../../models/user'
import i18n from '../../../services/i18n'

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
    return res.json({ success: true })
  } catch (err) {
    return next(err)
  }
}
