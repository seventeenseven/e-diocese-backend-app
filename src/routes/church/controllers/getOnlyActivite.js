import Activite from '../../../models/activite/index.js'
import ActiviteFavoris from '../../../models/activiteFavoris/index.js'
import ParticipateActivity from '../../../models/participateActivity/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const activite = await Activite.findById(params.activiteId).lean()
    const favoris = await ActiviteFavoris.findOne({ activite: params.activiteId, user: user.id })
    const participate = await ParticipateActivity.findOne({ activite: params.activiteId, user: user.id })

    let isFavoris = false
    let isParticipate = false

    if (favoris !== null) {
      isFavoris = true
    }

    if (participate != null) {
      isParticipate = true
    }

    const activiteRefactor = Object.assign({favoris: isFavoris, participate: isParticipate}, activite)

    console.log(activiteRefactor)

    return res.json({
      success: true,
      activite: activiteRefactor
    })
  } catch (err) {
    return next(err)
  }
}
