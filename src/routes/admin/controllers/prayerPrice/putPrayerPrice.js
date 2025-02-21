import PrayerPrice from '../../../../models/prayerPrice/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const price = await PrayerPrice.findById(params.id)
    if (!price) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newPrice = await PrayerPrice.updateOne({ _id: params.id }, { $set: { amount: body.amount } })

    await storeLogger({ action: "Modification du prix d'une intention de prière", user })

    return res.json({
      success: true,
      price: newPrice
    })
  } catch (err) {
    return next(err)
  }
}
