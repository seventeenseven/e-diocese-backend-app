import DonationPrice from '../../../../models/donationPrice'

export default async ({ user, params }, res, next) => {
  try {
    const donationPrice = await DonationPrice.findById(params.id).lean()
    return res.json({
      success: true,
      ...donationPrice
    })
  } catch (err) {
    return next(err)
  }
}
