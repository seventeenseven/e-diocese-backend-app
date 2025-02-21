import VideoFavoris from '../../../models/videoFavoris/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getFavoris = await VideoFavoris.findOne({ video: body.video })
    if (getFavoris != null) {
      await VideoFavoris.findByIdAndDelete(getFavoris.id)
      return res.json({
        success: true,
        errorMessage: 'Supprimer avec succès'
      })
    }
    const refactBody = { ...body, user: user.id }
    const favoris = await VideoFavoris.createVideoFavoris(refactBody)
    return res.json({
      success: true,
      favoris
    })
  } catch (err) {
    return next(err)
  }
}
