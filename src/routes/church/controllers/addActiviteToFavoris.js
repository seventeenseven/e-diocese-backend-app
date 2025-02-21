import ActiviteFavoris from '../../../models/activiteFavoris/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getFavoris = await ActiviteFavoris.findOne({ activite: body.activite })
    if (getFavoris != null) {
      await ActiviteFavoris.findByIdAndDelete(getFavoris.id)
      return res.json({
        success: true,
        errorMessage: 'Supprimer avec succès'
      })
    }
    const refactBody = { ...body, user: user.id }
    const favoris = await ActiviteFavoris.createActiviteFav(refactBody)
    return res.json({
      success: true,
      favoris
    })
  } catch (err) {
    return next(err)
  }
}
