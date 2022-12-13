import Church from '../../../../models/church'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const church = await Church.createChurch(body)
    return res.json({
      success: true,
      church
    })
  } catch (err) {
    return next(err)
  }
}
