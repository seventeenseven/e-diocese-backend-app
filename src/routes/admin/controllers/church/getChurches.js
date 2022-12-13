import Church from '../../../../models/church'

export default async ({ user }, res, next) => {
  try {
    const churchs = await Church.find({})
    return res.json({
      success: true,
      churchs
    })
  } catch (err) {
    return next(err)
  }
}
