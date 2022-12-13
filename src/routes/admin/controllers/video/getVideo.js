import Video from '../../../../models/video'

export default async ({ user, params }, res, next) => {
  try {
    const video = await Video.findById(params.id).lean()
    return res.json({
      success: true,
      ...video
    })
  } catch (err) {
    return next(err)
  }
}
