import Activite from '../../../../models/activite/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const activite = await Activite.findById(params.id)
    console.log('id', params.id)
    if (!activite) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newActivite = Object.assign(activite, body)
    newActivite.save()

    await storeLogger({ action: "Modification d'une activité", user })

    return res.json({
      success: true,
      activite: newActivite
    })
  } catch (err) {
    return next(err)
  }
}
