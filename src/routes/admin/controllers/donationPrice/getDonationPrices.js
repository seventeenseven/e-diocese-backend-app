import DonationPrice from '../../../../models/donationPrice'

export default async ({ user }, res, next) => {
  try {
    const donationPrices = await DonationPrice.find({})
    return res.json({
      success: true,
      donationPrices
    })
  } catch (err) {
    return next(err)
  }
}
