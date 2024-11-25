import DonationPrice from '../../../models/donationPrice'

export default async ({ user }, res, next) => {
  try {
    const prices = await DonationPrice.find({})
      .sort({ value: 1 })
      .lean()
    return res.json({
      success: true,
      prices
    })
  } catch (err) {
    return next(err)
  }
}
