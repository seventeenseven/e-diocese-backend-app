import Versement from '../../../../models/versement'
import { storeLogger } from '../../../../helpers'
import { HttpError } from '../../../../services/error'

export default async ({ user }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw new HttpError(403, "Vous n'avez pas le droit d'effectuer cette action")
    }

    const versements = await Versement.find({})
      .populate('church')

    await storeLogger({ action: 'Affichage de la liste des versements', user })

    return res.json({
      success: true,
      versements
    })
  } catch (err) {
    return next(err)
  }
}
