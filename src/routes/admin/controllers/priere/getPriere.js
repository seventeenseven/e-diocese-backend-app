import Priere from '../../../../models/priere'

export default async ({ user, params }, res, next) => {
  try {
    const priere = await Priere.findById(params.id).populate('user').lean()
    return res.json({
      success: true,
      ...priere
    })
  } catch (err) {
    return next(err)
  }
}
