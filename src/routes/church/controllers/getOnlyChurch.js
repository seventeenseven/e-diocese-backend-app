import Church from '../../../models/church/index.js'
import ChurchFavoris from '../../../models/churchFavoris/index.js'

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
