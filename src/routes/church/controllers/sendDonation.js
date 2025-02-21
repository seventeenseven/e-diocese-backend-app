import Transaction from '../../../models/transaction/index.js'
import Donation from '../../../models/donation/index.js'
import * as cinetpay from '../../../services/cinetpay/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const transaction = await Transaction.createCinetpayTopUpInstance({
      user: user.id,
      amount: body.amount,
      currency: user.currency,
      phone: user.phone
    })

    const donation = await Donation.createDonation({
      amount: body.amount,
      church: body.church,
      user: user.id,
      transaction: transaction.id
    })

    const init = await cinetpay.initiatePayment({
      transactionId: transaction.id,
      amount: body.amount,
      currency: user.currency,
      description: 'payment ' + transaction.id
    })

    console.log('payment', init)

    return res.json({
      success: true,
      transaction,
      donation,
      paymentUrl: init.data.payment_url
    })
  } catch (err) {
    return next(err)
  }
}
