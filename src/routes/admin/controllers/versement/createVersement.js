import Versement from '../../../../models/versement/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw new HttpError(403, "Vous n'avez pas le droit d'effectuer cette action")
    }
    const versement = await Versement.createVersement(body)
    await storeLogger({ action: "Ajout d'un nouveau versement", user })
    return res.json({
      success: true,
      versement
    })
  } catch (err) {
    return next(err)
  }
}
