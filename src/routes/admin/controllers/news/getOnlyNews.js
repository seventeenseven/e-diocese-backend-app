import News from '../../../../models/news'

export default async ({ user, params }, res, next) => {
  try {
    const news = await News.findById(params.id).lean()
    return res.json({
      success: true,
      ...news
    })
  } catch (err) {
    return next(err)
  }
}
