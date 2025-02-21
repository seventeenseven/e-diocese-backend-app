import VideoFavoris from '../../../models/videoFavoris/index.js'

export default async ({ user }, res, next) => {
  try {
    const videosFavoris = await VideoFavoris.find({ user: user.id })
      .populate('video')

    return res.json({
      success: true,
      videosFavoris
    })
  } catch (err) {
    return next(err)
  }
}
