import Activite from '../../../../models/activite/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une activité vous devez être le responsable d'une église")
    }
    const activite = await Activite.createActivite({...body, church: user.id})
    await storeLogger({ action: "Création d'une activité", user })
    return res.json({
      success: true,
      activite
    })
  } catch (err) {
    return next(err)
  }
}
