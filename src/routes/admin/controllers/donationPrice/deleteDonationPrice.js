import DonationPrice from '../../../../models/donationPrice'
import { HttpError } from '~/services/error'

export default async ({ user, params }, res, next) => {
  try {
    const findDonationPrice = await DonationPrice.findById(params.id)
    if (findDonationPrice === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const donationPriceBeforeDelete = await findDonationPrice.deleteOne({ _id: params.id })

    return res.json({
      success: true,
      donationPrice: donationPriceBeforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
