import Activite from '../../../../models/activite/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const activite = await Activite.findById(params.id).lean()
    await storeLogger({ action: "Affichage d'une activité", user })
    return res.json({
      success: true,
      ...activite
    })
  } catch (err) {
    return next(err)
  }
}
