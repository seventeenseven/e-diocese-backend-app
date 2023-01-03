import Donation from '../../../../models/donation'
import Priere from '../../../../models/priere'
import Church from '../../../../models/church'
import Activite from '../../../../models/activite'
import New from '../../../../models/news'
import Video from '../../../../models/video'
import Versement from '../../../../models/versement'
import mongoose from 'mongoose'
import { storeLogger } from '../../../../helpers'
import moment from 'moment'

export default async ({ user }, res, next) => {
  try {
    let donation
    let intentions
    const churchs = await Church.count({})
    let activites
    let news
    let videos
    let amountIntentions

    if (user.isSuperAdmin) {
      donation = await Donation.aggregate([{
        $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
      }
      ])
      intentions = await Priere.count({ isPaid: true })
      activites = await Activite.count({})
      news = await New.count({})
      videos = await Video.count({})
      amountIntentions = await Priere.aggregate([{
        $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
      }
      ])
    } else {
      donation = await Donation.aggregate([
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
          $match: {
            'churches._id': mongoose.Types.ObjectId(user.id)
          }
        },
        {
          $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
        }
      ])
      amountIntentions = await Priere.aggregate([
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
          $match: {
            'churches._id': mongoose.Types.ObjectId(user.id)
          }
        },
        {
          $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
        }
      ])
      intentions = await Priere.count({ church: user.id, isPaid: true })
      activites = await Activite.count({ church: user.id })
      news = await New.count({ church: user.id })
      videos = await Video.count({ church: user.id })
    }

    let totalDonation = 0

    const filterDonation = donation.filter(e => e._id === true)
    if (filterDonation.length > 0) {
      totalDonation = filterDonation[0].sum_val
    }

    let totalAmountIntentions = 0

    const filterIntention = amountIntentions.filter(e => e._id === true)
    if (filterIntention.length > 0) {
      totalAmountIntentions = filterIntention[0].sum_val
    }

    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const first = moment(new Date(`${firstDay}`)).format('YYYY-MM-DD[T00:00:00.000Z]')
    const second = moment(new Date(`${lastDay}`)).format('YYYY-MM-DD[T23:59:59.999Z]')

    let monthStart = new Date(first)
    let monthEnd = new Date(second)

    const versementsPrieres = await Versement.aggregate([
      {
        $match: { $and:
                  [
                    {type: 'priere'},
                    { createdAt: { $gte: monthStart, $lt: monthEnd } }
                  ] }
      },
      {
        $group: { _id: null, sum_val: { $sum: '$amount' } }
      }
    ])

    const versementsDons = await Versement.aggregate([
      {
        $match: { $and:
                    [
                      {type: 'dons'},
                      { createdAt: { $gte: monthStart, $lt: monthEnd } }
                    ]
        }
      },
      {
        $group: {
          _id: null,
          sum_val: {$sum: '$amount'
          }
        }
      }
    ])

    let amountVersementsPrieres = 0
    let amountVersementsDons = 0

    if (versementsPrieres.length > 0) {
      amountVersementsPrieres = versementsPrieres[0].sum_val
    }

    if (versementsDons.length > 0) {
      amountVersementsDons = versementsDons[0].sum_val
    }

    await storeLogger({ action: 'Affichage des statistiques sur le tableau de bord', user })

    return res.json({
      success: true,
      donation: totalDonation,
      intentions,
      churchs,
      activites,
      news,
      videos,
      amountIntentions: totalAmountIntentions,
      amountVersementsPrieres,
      amountVersementsDons
    })
  } catch (err) {
    return next(err)
  }
}
