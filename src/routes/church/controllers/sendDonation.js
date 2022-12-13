import Transaction from '~/models/transaction'
import * as cinetpay from '../../../services/cinetpay'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const transaction = await Transaction.createCinetpayTopUpInstance({
      user: user.id,
      amount: body.amount,
      currency: user.currency,
      phone: user.phone
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
      paymentUrl: init.data.payment_url
    })
  } catch (err) {
    return next(err)
  }
}
