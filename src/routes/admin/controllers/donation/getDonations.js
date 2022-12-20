import Donation from '../../../../models/donation'

export default async ({ user }, res, next) => {
  try {
    const donations = await Donation.find({ isPaid: true })
      .populate('user')
      .populate('church')

    return res.json({
      success: true,
      donations
    })
  } catch (err) {
    return next(err)
  }
}
