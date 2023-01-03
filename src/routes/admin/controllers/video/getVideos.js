import Video from '../../../../models/video'
import { storeLogger } from '../../../../helpers'

export default async ({ user }, res, next) => {
  try {
    let videos
    if (!user.isSuperAdmin) {
      videos = await Video.find({ church: user.id })
    } else {
      videos = await Video.find({})
    }

    await storeLogger({ action: 'Affichage de la liste des vidéos', user })

    return res.json({
      success: true,
      videos
    })
  } catch (err) {
    return next(err)
  }
}
