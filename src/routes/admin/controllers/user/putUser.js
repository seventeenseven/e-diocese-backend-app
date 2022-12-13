import User from '../../../../models/user'
import { HttpError } from '~/services/error'
import i18n from '~/services/i18n'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const user = await User.findById(params.id)
    if (!user) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }

    const userWithSameEmail = await User.findByEmail(body.email)
    if (userWithSameEmail && userWithSameEmail.email !== user.email) {
      throw new HttpError(400, i18n.__('userWithSameEmailError'))
    }
    const newUser = Object.assign(user.view(true), {...body, picture: user.picture})
    newUser.save()

    return res.json({
      success: true,
      user: newUser
    })
  } catch (err) {
    return next(err)
  }
}
