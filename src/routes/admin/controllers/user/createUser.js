import User from '../../../../models/user'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const user = await User.createUserByAdmin(body)
    return res.json({
      success: true,
      user
    })
  } catch (err) {
    return next(err)
  }
}
