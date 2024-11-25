import Activite from '../../../models/activite'

export default async ({ user, params }, res, next) => {
  try {
    const limit = 5
    const activites = await Activite.find({
      _id: { $ne: params.id }
    })
      .limit(limit)

    return res.json({
      success: true,
      activites
    })
  } catch (err) {
    return next(err)
  }
}
