import ReadingDay from '../../../../models/readingDay'

export default async ({ user, params }, res, next) => {
  try {
    const readingDay = await ReadingDay.findById(params.id)
      .populate('church')
      .lean()
    return res.json({
      success: true,
      ...readingDay
    })
  } catch (err) {
    return next(err)
  }
}
