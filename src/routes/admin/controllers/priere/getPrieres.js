import Priere from '../../../../models/priere'

export default async ({ user }, res, next) => {
  try {
    let intentions
    if (!user.isSuperAdmin) {
      intentions = await Priere.find({ isPaid: true, church: user.id })
        .populate('user')
    } else {
      intentions = await Priere.find({ isPaid: true })
        .populate('user')
    }

    return res.json({
      success: true,
      intentions
    })
  } catch (err) {
    return next(err)
  }
}
