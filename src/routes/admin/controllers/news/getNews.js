import News from '../../../../models/news'
import { storeLogger } from '../../../../helpers'

export default async ({ user }, res, next) => {
  try {
    let news
    if (!user.isSuperAdmin) {
      news = await News.find({ church: user.id })
    } else {
      news = await News.find({})
    }
    await storeLogger({ action: 'Affichage de la liste des actualités', user })
    return res.json({
      success: true,
      news
    })
  } catch (err) {
    return next(err)
  }
}
