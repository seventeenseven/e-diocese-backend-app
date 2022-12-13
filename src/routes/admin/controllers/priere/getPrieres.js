import Priere from '../../../../models/priere'

export default async ({ user }, res, next) => {
  try {
    const intentions = await Priere.find({ isPaid: true })
      .populate('user')

    return res.json({
      success: true,
      intentions
    })
  } catch (err) {
    return next(err)
  }
}
