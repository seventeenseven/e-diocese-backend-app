import Activite from '../../../../models/activite'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une activité vous devez être le responsable d'une église")
    }
    const activite = await Activite.createActivite({...body, church: user.id})
    return res.json({
      success: true,
      activite
    })
  } catch (err) {
    return next(err)
  }
}
