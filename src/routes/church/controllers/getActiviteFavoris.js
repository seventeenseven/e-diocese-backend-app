import ActiviteFavoris from '~/models/activiteFavoris'

export default async ({ user }, res, next) => {
  try {
    const activiteFavoris = await ActiviteFavoris.find({ user: user.id })
      .populate('activite')
    const count = await ActiviteFavoris.countDocuments({})
    return res.json({
      success: true,
      activiteFavoris,
      count
    })
  } catch (err) {
    return next(err)
  }
}
