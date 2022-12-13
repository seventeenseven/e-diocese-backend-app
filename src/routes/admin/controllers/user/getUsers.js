import User from '../../../../models/user'

export default async ({ user }, res, next) => {
  try {
    const users = await User.find({})
    return res.json({
      success: true,
      users
    })
  } catch (err) {
    return next(err)
  }
}
