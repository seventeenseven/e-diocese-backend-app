import Video from '../../../../models/video'

export default async ({ user }, res, next) => {
  try {
    let videos
    if (!user.isSuperAdmin) {
      videos = await Video.find({ church: user.id })
    } else {
      videos = await Video.find({})
    }

    return res.json({
      success: true,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
