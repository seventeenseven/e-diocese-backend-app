import ReadingDay from '../../../../models/readingDay'

export default async ({ user }, res, next) => {
  try {
    const readingDays = await ReadingDay.find({})
    return res.json({
      success: true,
      readingDays
    })
  } catch (err) {
    return next(err)
  }
}
