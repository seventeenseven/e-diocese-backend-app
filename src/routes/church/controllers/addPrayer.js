import Priere from '../../../models/priere/index.js'
import Transaction from '../../../models/transaction/index.js'
import PrayerPrice from '../../../models/prayerPrice/index.js'
import * as cinetpay from '../../../services/cinetpay/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const price = await PrayerPrice.findOne({})
    const transaction = await Transaction.createCinetpayTopUpInstance({
      user: user.id,
      amount: price.amount,
      currency: user.currency,
      phone: user.phone
    })
    const refactBody = { ...body,
      user: user.id,
      transaction: transaction.id,
      amount: price.amount }

    const priere = await Priere.createPriere(refactBody)

    const init = await cinetpay.initiatePayment({
      transactionId: transaction.id,
      amount: price.amount,
      currency: user.currency,
      description: 'payment ' + transaction.id
    })

    console.log('payment', init)

    return res.json({
      success: true,
      priere,
      transaction,
      paymentUrl: init.data.payment_url
    })
  } catch (err) {
    return next(err)
  }
}
