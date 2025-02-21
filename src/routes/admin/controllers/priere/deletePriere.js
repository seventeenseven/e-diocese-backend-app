import Priere from '../../../../models/priere/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const findPriere = await Priere.findById(params.id)
    if (findPriere === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const priereforeDelete = await findPriere.deleteOne({ _id: params.id })

    await storeLogger({ action: "Suppression d'une intention de prière", user })

    return res.json({
      success: true,
      priere: priereforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
