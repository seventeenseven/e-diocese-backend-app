import Priere from '~/models/priere'

export default async ({ user }, res, next) => {
  try {
    const prieres = await Priere.find({ user: user.id, isPaid: true }).sort({
      createdAt: -1
    })

    const count = await Priere.countDocuments({ user: user.id, isPaid: true })
    return res.json({
      success: true,
      prieres,
      count
    })
  } catch (err) {
    return next(err)
  }
}
