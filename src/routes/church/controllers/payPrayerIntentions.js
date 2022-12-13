import Transaction from '~/models/transaction'
import PrayerPrice from '~/models/prayerPrice'

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
