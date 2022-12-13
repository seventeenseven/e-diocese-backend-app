import ReadingDay from '../../../models/readingDay'

export default async ({ user }, res, next) => {
  try {
    const readingsDay = await ReadingDay.find({})
    return res.json({
      success: true,
      readingsDay
    })
  } catch (err) {
    return next(err)
  }
}
