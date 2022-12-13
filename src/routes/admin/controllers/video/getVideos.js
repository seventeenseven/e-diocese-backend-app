import Video from '../../../../models/video'

export default async ({ user }, res, next) => {
  try {
    const videos = await Video.find({})
    return res.json({
      success: true,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
