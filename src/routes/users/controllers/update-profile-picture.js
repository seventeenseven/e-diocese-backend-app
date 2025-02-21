import User from '../../../models/user/index.js'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: user.id }, { $set: { picture: body.picture } }, { new: true }).lean()
    return res.json({
      success: true,
      user: userUpdated
    })
  } catch (err) {
    return next(err)
  }
}
