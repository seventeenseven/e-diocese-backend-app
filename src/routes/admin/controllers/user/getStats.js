import Donation from '../../../../models/donation'

export default async ({ user }, res, next) => {
  try {
    const donation = await Donation.aggregate([{
      $group: {_id: '$isPaid', sum_val: {$sum: '$amount'}}
    }
    ])

    let totalDonation = 0

    const filterDonation = donation.filter(e => e._id === true)
    if (filterDonation.length > 0) {
      totalDonation = filterDonation[0].sum_val
    }

    return res.json({
      success: true,
      donation: totalDonation
    })
  } catch (err) {
    return next(err)
  }
}
