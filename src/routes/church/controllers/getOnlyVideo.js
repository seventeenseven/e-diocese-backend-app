import Video from '../../../models/video/index.js'
import VideoFavoris from '../../../models/videoFavoris/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const video = await Video.findById(params.videoId).lean()
    const favoris = await VideoFavoris.findOne({ video: params.videoId, user: user.id })

    let isFavoris = false

    if (favoris !== null) {
      isFavoris = true
    }

    const videoRefactor = Object.assign({favoris: isFavoris}, video)

    return res.json({
      success: true,
      video: videoRefactor
    })
  } catch (err) {
    return next(err)
  }
}
