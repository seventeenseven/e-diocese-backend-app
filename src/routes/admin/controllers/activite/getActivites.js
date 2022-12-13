import Activite from '../../../../models/activite'

export default async ({ user }, res, next) => {
  try {
    const activites = await Activite.find({})
    return res.json({
      success: true,
      activites
    })
  } catch (err) {
    return next(err)
  }
}
