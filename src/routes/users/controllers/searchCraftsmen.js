import User, { UserType } from '../../../models/user'

export default async ({ query }, res, next) => {
  try {
    const craftsmen = await User.find({
      userType: UserType.craftsman,
      picture: { $ne: null },
      emailVerified: true,
      $and: [{ town: { $regex: query.town } }, { job: { $regex: query.job } }]
    })
      .sort({ createdAt: -1 })
      .limit(1000)
    return res.json({
      success: true,
      craftsmen,
      count: craftsmen.length
    })
  } catch (err) {
    return next(err)
  }
}
