import Transaction from '../../../models/transaction'
import User from '../../../models/user'
import { HttpError } from '../../../services/error'

export default async ({ bodymen: { body }, user }, res, next) => {
  let transaction
  try {
    transaction = await Transaction.findById(body.transactionId)
    if (!transaction) {
      throw new HttpError(404, 'Transaction introuvable')
    }

    const user = await User.findOne({ _id: transaction.user })
    if (!user) {
      throw new HttpError(404, 'Utilisateur introuvable')
    }

    const today = new Date()
    const transactionDate = new Date(transaction.createdAt)

    let diffMs = (today - transactionDate)
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)

    if (diffMins === 3) {
      await transaction.reject()
      return res.json({
        status: 'refused'
      })
    }

    return res.json({
      status: transaction.status.toLowerCase()
    })
  } catch (err) {
    return next(err)
  }
}
