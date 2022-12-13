import DonationPrice from '../../../../models/donationPrice'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const donationPrice = await DonationPrice.createPrice(body)
    return res.json({
      success: true,
      donationPrice
    })
  } catch (err) {
    return next(err)
  }
}
