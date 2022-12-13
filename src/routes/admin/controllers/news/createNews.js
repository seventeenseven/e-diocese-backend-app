import News from '../../../../models/news'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const news = await News.createNews({...body, church: user.id})
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
