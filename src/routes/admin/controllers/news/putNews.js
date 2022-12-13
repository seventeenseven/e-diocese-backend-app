import News from '../../../../models/news'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const news = await News.findById(params.id)
    if (!news) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newNews = Object.assign(news, body)
    newNews.save()

    return res.json({
      success: true,
      news: newNews
    })
  } catch (err) {
    return next(err)
  }
}
