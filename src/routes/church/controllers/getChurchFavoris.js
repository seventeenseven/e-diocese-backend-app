import ChurchFavoris from '../../../models/churchFavoris/index.js'

export default async ({ user }, res, next) => {
  try {
    const favoris = await ChurchFavoris.find({ user: user.id })
      .populate('church')
    return res.json({
      success: true,
      favoris
    })
  } catch (err) {
    return next(err)
  }
}
