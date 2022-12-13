export default async ({ user }, res, next) => {
  try {
    return res.json({
      success: true,
      user: user.view(true)
    })
  } catch (err) {
    return next(err)
  }
}
