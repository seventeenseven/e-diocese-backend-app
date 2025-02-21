import Versement from '../../../../models/versement/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const versement = await Versement.findById(params.id)
      .populate('church')
      .lean()
    await storeLogger({ action: "Affichage d'un versement", user })
    return res.json({
      success: true,
      ...versement
    })
  } catch (err) {
    return next(err)
  }
}
