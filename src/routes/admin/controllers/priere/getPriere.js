import Priere from '../../../../models/church'

export default async ({ user, params }, res, next) => {
  try {
    const priere = await Priere.findById(params.id).lean()
    return res.json({
      success: true,
      ...priere
    })
  } catch (err) {
    return next(err)
  }
}
