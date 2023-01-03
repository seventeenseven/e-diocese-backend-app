import Donation from '../../../../models/donation'
import { storeLogger } from '../../../../helpers'

export default async ({ user }, res, next) => {
  try {
    const donations = await Donation.find({ isPaid: true })
      .populate('user')
      .populate('church')

    await storeLogger({ action: 'Affichage de la liste des dons', user })

    return res.json({
      success: true,
      donations
    })
  } catch (err) {
    return next(err)
  }
}
