import Activite from '../../../models/activite'
import ActiviteFavoris from '../../../models/activiteFavoris'

export default async ({ user, params }, res, next) => {
  try {
    const activite = await Activite.findById(params.activiteId).lean()
    const favoris = await ActiviteFavoris.findOne({ activite: params.activiteId, user: user.id })

    let isFavoris = false

    if (favoris !== null) {
      isFavoris = true
    }

    const activiteRefactor = Object.assign({favoris: isFavoris}, activite)

    return res.json({
      success: true,
      activite: activiteRefactor
    })
  } catch (err) {
    return next(err)
  }
}
