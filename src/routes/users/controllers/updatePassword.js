
export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    user.updatePassword(body)
    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
