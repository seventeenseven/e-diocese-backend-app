import Activite from '../../../../models/activite'
import ActiviteFavoris from '../../../../models/activiteFavoris'
import { HttpError } from '~/services/error'

export default async ({ user, params }, res, next) => {
  try {
    const findActivite = await Activite.findById(params.id)
    if (findActivite === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const activiteBeforeDelete = await findActivite.deleteOne({ _id: params.id })
    const findActiviteFavoris = await ActiviteFavoris.findOne({ activite: params.id })
    let associatedActiviteFavoris

    if (findActiviteFavoris !== null) {
      associatedActiviteFavoris = await findActiviteFavoris.deleteOne({ _id: findActiviteFavoris.id })
    }
    return res.json({
      success: true,
      activite: activiteBeforeDelete,
      associatedActiviteFavoris
    })
  } catch (err) {
    return next(err)
  }
}
