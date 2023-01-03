import Versement from '../../../../models/versement'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const versement = await Versement.findById(params.id).lean()
    await storeLogger({ action: "Affichage d'un versement", user })
    return res.json({
      success: true,
      ...versement
    })
  } catch (err) {
    return next(err)
  }
}
