import Versement from '../../../../models/versement'
import { HttpError } from '../../../../services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw new HttpError(403, "Vous n'avez pas le droit d'effectuer cette action")
    }
    const findVersement = await Versement.findById(params.id)
    if (findVersement === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const versementBeforeDelete = await findVersement.deleteOne({ _id: params.id })

    await storeLogger({ action: "Suppression d'un versement", user })

    return res.json({
      success: true,
      versement: versementBeforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
