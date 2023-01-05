import Priere from '../../../../models/priere'
import Donation from '../../../../models/donation'
import { HttpError } from '~/services/error'
import moment from 'moment'
import mongoose from 'mongoose'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw new HttpError(403, "Vous n'avez pas le droit d'effectuer cette action")
    }

    const date = new Date(body.month)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const first = moment(new Date(`${firstDay}`)).format('YYYY-MM-DD[T00:00:00.000Z]')
    const second = moment(new Date(`${lastDay}`)).format('YYYY-MM-DD[T23:59:59.999Z]')

    const monthStart = new Date(first)
    const monthEnd = new Date(second)

    let amountVersement = 0

    if (body.type === 'priere') {
      const priere = await Priere.aggregate([
        {
          $lookup: {
            from: 'churches',
            localField: 'church',
            foreignField: '_id',
            as: 'churches'
          }
        },
        {
          $unwind: {
            path: '$churches'
          }
        },
        {
          $match: { $and:
                    [
                      {'churches._id': mongoose.Types.ObjectId(body.church)},
                      { createdAt: { $gte: monthStart, $lt: monthEnd } }
                    ] }
        },
        {
          $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
        }
      ])
      const filterPriere = priere.filter(e => e._id === true)
      if (filterPriere.length > 0) {
        amountVersement = filterPriere[0].sum_val
      }
    } else {
      const donation = await Donation.aggregate([
        {
          $lookup: {
            from: 'churches',
            localField: 'church',
            foreignField: '_id',
            as: 'churches'
          }
        },
        {
          $unwind: {
            path: '$churches'
          }
        },
        {
          $match: { $and:
                    [
                      {'churches._id': mongoose.Types.ObjectId(body.church)},
                      { createdAt: { $gte: monthStart, $lt: monthEnd } }
                    ] }
        },
        {
          $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
        }
      ])
      const filterDon = donation.filter(e => e._id === true)
      if (filterDon.length > 0) {
        amountVersement = filterDon[0].sum_val
      }
    }

    return res.json({
      success: true,
      amountVersement
    })
  } catch (err) {
    return next(err)
  }
}
