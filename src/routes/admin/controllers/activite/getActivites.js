import Activite from '../../../../models/activite/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user }, res, next) => {
  try {
    let activites
    if (!user.isSuperAdmin) {
      activites = await Activite.find({ church: user.id })
    } else {
      activites = await Activite.find({})
    }

    await storeLogger({ action: 'Affichage de la liste des activités', user })

    return res.json({
      success: true,
      activites
    })
  } catch (err) {
    return next(err)
  }
}
