import DonationPrice from '~/models/donationPrice'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const prices = await DonationPrice.createPrice(body)
    return res.json({ success: true, prices })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
