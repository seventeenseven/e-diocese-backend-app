import Church from '../../../../models/church'

export default async ({ user, params }, res, next) => {
  try {
    const church = await Church.findById(params.id).lean()
    return res.json({
      success: true,
      ...church
    })
  } catch (err) {
    return next(err)
  }
}
