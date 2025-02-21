import Video from '../../../../models/video/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour ajouter une vidéo vous devez être le responsable d'une église")
    }
    const video = await Video.createVideo({ ...body, church: user.id })
    await storeLogger({ action: "Ajout d'une nouvelle vidéo", user })
    return res.json({
      success: true,
      video
    })
  } catch (err) {
    return next(err)
  }
}
