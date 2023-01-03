import DonationPrice from '../../../../models/donationPrice'
import { storeLogger } from '../../../../helpers'

export default async ({ user }, res, next) => {
  try {
    const donationPrices = await DonationPrice.find({})
      .sort({ value: 1 })
    await storeLogger({ action: "Affichage de la liste des prix d'un don", user })
    return res.json({
      success: true,
      donationPrices
    })
  } catch (err) {
    return next(err)
  }
}
