import Activite from '../../../../models/activite'

export default async ({ user, params }, res, next) => {
  try {
    const activite = await Activite.findById(params.id).lean()
    return res.json({
      success: true,
      ...activite
    })
  } catch (err) {
    return next(err)
  }
}
