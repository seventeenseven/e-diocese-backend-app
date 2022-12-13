import News from '../../../../models/news'

export default async ({ user }, res, next) => {
  try {
    const news = await News.find({})
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
