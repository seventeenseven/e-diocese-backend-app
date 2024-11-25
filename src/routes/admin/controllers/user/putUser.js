import User from '../../../../models/user'
import { HttpError } from '../../../../services/error'
import i18n from '../../../../services/i18n'
import { storeLogger } from '../../../../helpers'

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

    const userWithSamePhoneNumber = await User.findByPhone(body.phone)
    if (userWithSamePhoneNumber && userWithSamePhoneNumber.phone !== user.phone) {
      throw new HttpError(400, 'Un utilisateur avec cette adresse email existe déjà')
    }
    const newUser = Object.assign(user.view(true), {...body, picture: user.picture})
    newUser.save()

    await storeLogger({ action: "Modification des informations d'un utilisateur", user })

    return res.json({
      success: true,
      user: newUser
    })
  } catch (err) {
    return next(err)
  }
}
