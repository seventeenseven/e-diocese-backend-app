import Video from '../../../../models/video'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour ajouter une vidéo vous devez être le responsable d'une église")
    }
    const video = await Video.createVideo({ ...body, church: user.id })
    return res.json({
      success: true,
      video
    })
  } catch (err) {
    return next(err)
  }
}
