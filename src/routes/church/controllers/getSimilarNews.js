import News from '../../../models/news'

export default async ({ user, params }, res, next) => {
  try {
    const limit = 5
    const news = await News.find({
      _id: { $ne: params.id }
    })
      .limit(limit)

    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
