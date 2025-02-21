import Video from '../../../../models/video/index.js'
import VideoFavoris from '../../../../models/videoFavoris/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const findVideo = await Video.findById(params.id)
    if (findVideo === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const videoBeforeDelete = await findVideo.deleteOne({ _id: params.id })
    const findVideoFavoris = await VideoFavoris.findOne({ video: params.id })
    let associatedVideoFavoris

    if (findVideoFavoris !== null) {
      associatedVideoFavoris = await findVideoFavoris.deleteOne({ _id: findVideoFavoris.id })
    }
    await storeLogger({ action: "Suppression d'une vidéo", user })
    return res.json({
      success: true,
      video: videoBeforeDelete,
      associatedVideoFavoris
    })
  } catch (err) {
    return next(err)
  }
}
