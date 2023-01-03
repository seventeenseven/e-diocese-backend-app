import DonationPrice from '../../../../models/donationPrice'
import { HttpError } from '~/services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const donationPrice = await DonationPrice.findById(params.id)
    if (!donationPrice) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newDonationPrice = Object.assign(donationPrice, body)
    newDonationPrice.save()

    await storeLogger({ action: "Modification du prix d'un don", user })

    return res.json({
      success: true,
      donationPrice: newDonationPrice
    })
  } catch (err) {
    return next(err)
  }
}
