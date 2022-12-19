import News from '../../../../models/news'

export default async ({ user }, res, next) => {
  try {
    let news
    if (!user.isSuperAdmin) {
      news = await News.find({ church: user.id })
    } else {
      news = await News.find({})
    }
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
