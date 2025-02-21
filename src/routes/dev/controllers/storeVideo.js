import Video from '../../../models/video/index.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const videos = await Video.createVideo(body)
    return res.json({ success: true, videos })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
