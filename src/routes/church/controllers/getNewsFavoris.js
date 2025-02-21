import NewsFavoris from '../../../models/newsFavoris/index.js'

export default async ({ user }, res, next) => {
  try {
    const newsFavoris = await NewsFavoris.find({ user: user.id })
      .populate('news')

    return res.json({
      success: true,
      newsFavoris
    })
  } catch (err) {
    return next(err)
  }
}
