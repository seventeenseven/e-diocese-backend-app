import ChurchFavoris from '../../../models/churchFavoris/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getFavoris = await ChurchFavoris.findOne({ church: body.church })
    if (getFavoris != null) {
      await ChurchFavoris.findByIdAndDelete(getFavoris.id)
      return res.json({
        success: true,
        errorMessage: 'Supprimer avec succès'
      })
    }
    const refactBody = { ...body, user: user.id }
    const favoris = await ChurchFavoris.createFavoris(refactBody)
    return res.json({
      success: true,
      favoris
    })
  } catch (err) {
    return next(err)
  }
}
