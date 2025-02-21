import User, { UserType } from '../../../models/user/index.js'

export default async ({ params }, res, next) => {
  try {
    const craftsmen = await User.find({
      userType: UserType.craftsman,
      emailVerified: true,
      picture: { $ne: null }
    })
      .sort({ createdAt: -1 })
      .limit(Number(params.limit))

    const count = craftsmen.length

    return res.json({
      success: true,
      craftsmen,
      count
    })
  } catch (err) {
    return next(err)
  }
}
