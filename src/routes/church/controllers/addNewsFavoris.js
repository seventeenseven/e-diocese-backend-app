import NewsFavoris from '~/models/newsFavoris'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getFavoris = await NewsFavoris.findOne({ news: body.news })
    if (getFavoris != null) {
      await NewsFavoris.findByIdAndDelete(getFavoris.id)
      return res.json({
        success: true,
        errorMessage: 'Supprimer avec succès'
      })
    }
    const refactBody = { ...body, user: user.id }
    const favoris = await NewsFavoris.createNewsFav(refactBody)
    return res.json({
      success: true,
      favoris
    })
  } catch (err) {
    return next(err)
  }
}
