import Video from '../../../../models/video'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const video = await Video.createVideo(body)
    return res.json({
      success: true,
      video
    })
  } catch (err) {
    return next(err)
  }
}
