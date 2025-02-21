import Donation from '../../../../models/donation/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const donation = await Donation.findById(params.id)
      .populate('user')
      .populate('church')
      .lean()
    await storeLogger({ action: "Affichage des détails d'un don", user })
    return res.json({
      success: true,
      ...donation
    })
  } catch (err) {
    return next(err)
  }
}
