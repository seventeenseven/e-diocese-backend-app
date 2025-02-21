import ReadingDay from '../../../models/readingDay/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const readingDay = await ReadingDay.findById(params.id).lean()

    return res.json({
      success: true,
      ...readingDay
    })
  } catch (err) {
    return next(err)
  }
}
