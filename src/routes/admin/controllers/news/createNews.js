import News from '../../../../models/news'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une actualité vous devez être le responsable d'une église")
    }
    const news = await News.createNews({...body, church: user.id})
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
