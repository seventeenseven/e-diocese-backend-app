import User from '../../../../models/user'

export default async ({ user, params }, res, next) => {
  try {
    const user = await User.findById(params.id).lean()
    return res.json({
      success: true,
      ...user
    })
  } catch (err) {
    return next(err)
  }
}
