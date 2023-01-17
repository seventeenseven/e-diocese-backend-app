import User from '~/models/user'
import { HttpError } from '~/services/error'
import i18n from '~/services/i18n'

export default async ({ params }, res, next) => {
  try {
    const user = await User.findById(params.id)
    if (!user) {
      throw new HttpError(404, i18n.__('userNotFound'))
    }
    const deleteUser = await User.deleteOne({ _id: params.id })
    if (!deleteUser) {
      throw new HttpError(400, 'La suppression du compte a échouée')
    }
    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
