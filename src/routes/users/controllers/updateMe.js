import User from '../../../models/user'
import { HttpError } from '../../../services/error'
import i18n from '../../../services/i18n'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const userWithSameEmail = await User.findByEmail(body.email)
    if (userWithSameEmail && userWithSameEmail.email !== user.email) {
      throw new HttpError(400, i18n.__('userWithSameEmailError'))
    }
    await Object.assign(user, {...body, picture: user.picture}).save()
    return res.json({
      success: true,
      user: user.view(true)
    })
  } catch (err) {
    return next(err)
  }
}
