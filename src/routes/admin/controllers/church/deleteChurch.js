import Church from '../../../../models/church'
import ChurchFavoris from '../../../../models/churchFavoris'
import { HttpError } from '~/services/error'

export default async ({ user, params }, res, next) => {
  try {
    const findChurch = await Church.findById(params.id)
    if (findChurch === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const churchBeforeDelete = await findChurch.deleteOne({ _id: params.id })
    const findChurchFavoris = await ChurchFavoris.findOne({ church: params.id })
    let associatedChurchFavoris

    if (findChurchFavoris !== null) {
      associatedChurchFavoris = await findChurchFavoris.deleteOne({ _id: findChurchFavoris.id })
    }
    return res.json({
      success: true,
      church: churchBeforeDelete,
      associatedChurchFavoris
    })
  } catch (err) {
    return next(err)
  }
}
