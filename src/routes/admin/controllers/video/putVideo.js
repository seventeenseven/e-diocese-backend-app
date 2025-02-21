import Video from '../../../../models/video/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const video = await Video.findById(params.id)
    if (!video) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newVideo = Object.assign(video, body)
    newVideo.save()

    await storeLogger({ action: "Modification d'une vidéo", user })

    return res.json({
      success: true,
      video: newVideo
    })
  } catch (err) {
    return next(err)
  }
}
