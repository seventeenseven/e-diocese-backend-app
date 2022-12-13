import News from '../../../../models/news'
import NewsFavoris from '../../../../models/newsFavoris'
import { HttpError } from '~/services/error'

export default async ({ user, params }, res, next) => {
  try {
    const findNews = await News.findById(params.id)
    if (findNews === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const newsBeforeDelete = await findNews.deleteOne({ _id: params.id })
    const findNewsFavoris = await NewsFavoris.findOne({ news: params.id })
    let associatedNewsFavoris

    if (findNewsFavoris !== null) {
      associatedNewsFavoris = await findNewsFavoris.deleteOne({ _id: findNewsFavoris.id })
    }
    return res.json({
      success: true,
      news: newsBeforeDelete,
      associatedNewsFavoris
    })
  } catch (err) {
    return next(err)
  }
}
