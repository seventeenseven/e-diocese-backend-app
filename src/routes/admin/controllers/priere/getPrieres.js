import Priere from '../../../../models/priere/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user }, res, next) => {
  try {
    let intentions
    if (!user.isSuperAdmin) {
      intentions = await Priere.find({ isPaid: true, church: user.id })
        .populate('user')
    } else {
      intentions = await Priere.find({ isPaid: true })
        .populate('user')
    }

    await storeLogger({ action: 'Affichage de la liste des intentions de prières', user })

    return res.json({
      success: true,
      intentions
    })
  } catch (err) {
    return next(err)
  }
}
