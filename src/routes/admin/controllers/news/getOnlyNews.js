import News from '../../../../models/news'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const news = await News.findById(params.id).lean()
    await storeLogger({ action: "Affichage d'une actualité", user })
    return res.json({
      success: true,
      ...news
    })
  } catch (err) {
    return next(err)
  }
}
