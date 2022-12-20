import Donation from '../../../../models/donation'

export default async ({ user, params }, res, next) => {
  try {
    const donation = await Donation.findById(params.id)
      .populate('user')
      .populate('church')
      .lean()
    return res.json({
      success: true,
      ...donation
    })
  } catch (err) {
    return next(err)
  }
}
