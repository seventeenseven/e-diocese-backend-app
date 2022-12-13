import Video from '../../../../models/video'
import VideoFavoris from '../../../../models/videoFavoris'
import { HttpError } from '~/services/error'

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
    return res.json({
      success: true,
      video: videoBeforeDelete,
      associatedVideoFavoris
    })
  } catch (err) {
    return next(err)
  }
}
