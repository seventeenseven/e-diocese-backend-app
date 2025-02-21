import Transaction from '../../../models/transaction/index.js'
import PrayerPrice from '../../../models/prayerPrice/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const price = await PrayerPrice.findOne({})
    const transaction = await Transaction.createCinetpayTopUpInstance({
      user: user.id,
      amount: price.amount,
      currency: body.currency,
      phone: user.phone
    })
    return res.json({
      success: true,
      transaction
    })
  } catch (err) {
    return next(err)
  }
}
