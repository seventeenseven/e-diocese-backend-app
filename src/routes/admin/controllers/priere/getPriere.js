import Priere from '../../../../models/priere/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const priere = await Priere.findById(params.id)
      .populate('user')
      .populate('church')
      .lean()

    await storeLogger({ action: "Affichage d'une intention de prière", user })

    return res.json({
      success: true,
      ...priere
    })
  } catch (err) {
    return next(err)
  }
}
