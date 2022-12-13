import News from '../../../models/news'
import NewsFavoris from '../../../models/newsFavoris'

export default async ({ user, params }, res, next) => {
  try {
    const news = await News.findById(params.newsId).lean()
    const favoris = await NewsFavoris.findOne({ news: params.newsId, user: user.id })

    let isFavoris = false

    if (favoris !== null) {
      isFavoris = true
    }

    const newsRefactor = Object.assign({favoris: isFavoris}, news)

    return res.json({
      success: true,
      news: newsRefactor
    })
  } catch (err) {
    return next(err)
  }
}
