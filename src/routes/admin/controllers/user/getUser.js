import User from '../../../../models/user'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const user = await User.findById(params.id).lean()

    await storeLogger({ action: "Affichage des informations d'un utilisateur de l'application mobile", user })

    return res.json({
      success: true,
      ...user
    })
  } catch (err) {
    return next(err)
  }
}
