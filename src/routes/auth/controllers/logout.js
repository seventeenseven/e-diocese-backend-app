import Session from '../../../models/session/index.js'

export default async ({ user, params }, res, next) => {
  try {
    await Session.logout(params.id, user.id)
    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
