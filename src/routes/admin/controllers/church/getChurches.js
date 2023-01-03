import Church from '../../../../models/church'
import { storeLogger } from '../../../../helpers'

export default async ({ user }, res, next) => {
  try {
    const churchs = await Church.find({})

    await storeLogger({ action: 'Affichage de la liste des églises', user })

    return res.json({
      success: true,
      churchs
    })
  } catch (err) {
    return next(err)
  }
}
