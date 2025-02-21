import Transaction from '../../../models/transaction/index.js'
import User from '../../../models/user/index.js'
import * as cinetpay from '../../../services/cinetpay/index.js'
import Priere from '../../../models/priere/index.js'
import Donation from '../../../models/donation/index.js'

export default async (req, res, next) => {
  let transaction
  try {
    console.log('cinetpayNotify - body', req.body)
    console.log('cinetpayNotify - query', req.query)

    const transactionStatusResp = await cinetpay.getPayStatus({
      transactionId: req.body.cpm_trans_id
    })

    const { code } = transactionStatusResp

    const {
      amount
    //   currency,
    //   status,
    //   payment_method,
    //   operator_id,
    //   description
    } = transactionStatusResp.data

    transaction = await Transaction.findById(req.body.cpm_trans_id)
    if (!transaction) {
      return res.send('Transaction not found')
    }

    const user = await User.findOne({ _id: transaction.user })
    if (!user) {
      return res.send('User not found')
    }

    const newPhone = '+' + req.body.cpm_phone_prefixe + req.body.cel_phone_num
    await Transaction.updateOne(
      { _id: req.body.cpm_trans_id },
      { $set: { phone: newPhone } }
    )

    if (transaction.isPaid) {
      return res.send('Transaction is paid')
    }

    if (Number(transaction.amount) !== Number(amount)) {
      return res.send('Amount does not match')
    }

    if (code !== '00') {
      await transaction.reject()
      return res.send('Incorrect cpm_result erreur transaction')
    }

    const priere = await Priere.findOne({ transaction: req.body.cpm_trans_id })

    const donation = await Donation.findOne({ transaction: req.body.cpm_trans_id })

    if (priere != null) {
      await priere.pay()
    }

    if (donation != null) {
      await donation.pay()
    }

    await transaction.pay()

    return res.send('Success')
  } catch (err) {
    return next(err)
  }
}
