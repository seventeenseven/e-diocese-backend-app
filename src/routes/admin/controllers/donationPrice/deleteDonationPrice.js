import DonationPrice from '../../../../models/donationPrice'
import { HttpError } from '~/services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const findDonationPrice = await DonationPrice.findById(params.id)
    if (findDonationPrice === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const donationPriceBeforeDelete = await findDonationPrice.deleteOne({ _id: params.id })

    await storeLogger({ action: "Suppression du prix d'un don", user })

    return res.json({
      success: true,
      donationPrice: donationPriceBeforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
