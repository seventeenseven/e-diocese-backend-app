import Activite from '../../../../models/activite'

export default async ({ user }, res, next) => {
  try {
    let activites
    if (!user.isSuperAdmin) {
      activites = await Activite.find({ church: user.id })
    } else {
      activites = await Activite.find({})
    }

    return res.json({
      success: true,
      activites
    })
  } catch (err) {
    return next(err)
  }
}
