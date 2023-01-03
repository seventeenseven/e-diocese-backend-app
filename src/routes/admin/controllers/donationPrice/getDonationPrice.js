import DonationPrice from '../../../../models/donationPrice'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const donationPrice = await DonationPrice.findById(params.id).lean()

    await storeLogger({ action: "Affichage du prix d'un don", user })

    return res.json({
      success: true,
      ...donationPrice
    })
  } catch (err) {
    return next(err)
  }
}
