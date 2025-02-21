import WaitinglistUser from '../../../models/waitinglistUser/index.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const user = await WaitinglistUser.createUser(body)
    return res.json({
      success: true,
      user
    })
  } catch (err) {
    return next(err)
  }
}
