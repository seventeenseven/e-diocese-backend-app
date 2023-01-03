import DonationPrice from '../../../../models/donationPrice'
import { storeLogger } from '../../../../helpers'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const donationPrice = await DonationPrice.createPrice(body)

    await storeLogger({ action: "Création du prix d'un don", user })

    return res.json({
      success: true,
      donationPrice
    })
  } catch (err) {
    return next(err)
  }
}
