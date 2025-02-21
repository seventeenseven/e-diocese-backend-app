import Video from '../../../../models/video/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const video = await Video.findById(params.id).lean()
    await storeLogger({ action: "Affichage d'une vidéo", user })
    return res.json({
      success: true,
      ...video
    })
  } catch (err) {
    return next(err)
  }
}
