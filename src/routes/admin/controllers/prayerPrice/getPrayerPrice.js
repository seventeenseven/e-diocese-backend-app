import PrayerPrice from '../../../../models/prayerPrice/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user }, res, next) => {
  try {
    const price = await PrayerPrice.findOne({}).lean()
    await storeLogger({ action: "Affichage du prix d'une intention de prière", user })
    return res.json({
      success: true,
      ...price
    })
  } catch (err) {
    return next(err)
  }
}
