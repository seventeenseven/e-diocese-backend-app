import News from '../../../../models/news/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une actualité vous devez être le responsable d'une église")
    }
    const news = await News.createNews({...body, church: user.id})
    await storeLogger({ action: "Création d'une actualité", user })
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
