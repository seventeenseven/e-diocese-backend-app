import Church from '../../../models/church'

export default async ({ user, params }, res, next) => {
  try {
    const limit = 5
    const churchs = await Church.find({
      _id: { $ne: params.id }
    })
      .limit(limit)

    return res.json({
      success: true,
      churchs
    })
  } catch (err) {
    return next(err)
  }
}
