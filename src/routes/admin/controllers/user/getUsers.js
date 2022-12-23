import User from '../../../../models/user'

export default async ({ user }, res, next) => {
  try {
    const users = await User.find({})
    const countUsers = await User.count({})
    return res.json({
      success: true,
      users,
      count: countUsers
    })
  } catch (err) {
    return next(err)
  }
}
