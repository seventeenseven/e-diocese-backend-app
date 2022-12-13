import PrayerPrice from '../../../../models/prayerPrice'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const price = await PrayerPrice.findById(params.id)
    if (!price) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newPrice = await PrayerPrice.updateOne({ _id: params.id }, { $set: { amount: body.amount } })

    return res.json({
      success: true,
      price: newPrice
    })
  } catch (err) {
    return next(err)
  }
}
