import Donation from '../../../../models/donation'
import Priere from '../../../../models/priere'
import Church from '../../../../models/church'
import Activite from '../../../../models/activite'
import New from '../../../../models/news'
import Video from '../../../../models/video'
import mongoose from 'mongoose'

export default async ({ user }, res, next) => {
  try {
    let donation
    let intentions
    const churchs = await Church.count({})
    let activites
    let news
    let videos

    if (user.isSuperAdmin) {
      donation = await Donation.aggregate([{
        $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
      }
      ])
      intentions = await Priere.count({ isPaid: true })
      activites = await Activite.count({})
      news = await New.count({})
      videos = await Video.count({})
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

    return res.json({
      success: true,
      donation: totalDonation,
      intentions,
      churchs,
      activites,
      news,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
