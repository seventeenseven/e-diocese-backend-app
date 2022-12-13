import Video from '~/models/video'

export default async ({ user, params }, res, next) => {
  try {
    const limit = 5
    const videos = await Video.find({
      _id: { $ne: params.id }
    })
      .limit(limit)

    return res.json({
      success: true,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
