import Church from '../../../models/church'
import ChurchFavoris from '../../../models/churchFavoris'

export default async ({ user, params }, res, next) => {
  try {
    const church = await Church.findById(params.churchId).lean()
    const favoris = await ChurchFavoris.findOne({ church: params.churchId, user: user.id })

    let isFavoris = false

    if (favoris !== null) {
      isFavoris = true
    }

    const churchRefactor = Object.assign({favoris: isFavoris}, church)

    return res.json({
      success: true,
      church: churchRefactor
    })
  } catch (err) {
    return next(err)
  }
}
