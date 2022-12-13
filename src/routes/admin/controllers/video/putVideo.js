import Video from '../../../../models/video'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const video = await Video.findById(params.id)
    if (!video) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newVideo = Object.assign(video, body)
    newVideo.save()

    return res.json({
      success: true,
      video: newVideo
    })
  } catch (err) {
    return next(err)
  }
}
