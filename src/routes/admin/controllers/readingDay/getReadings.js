import ReadingDay from '../../../../models/readingDay'

export default async ({ user }, res, next) => {
  try {
    let readingDays
    if (user.isSuperAdmin) {
      readingDays = await ReadingDay.find({})
        .populate('church')
    } else {
      readingDays = await ReadingDay.find({ church: user.id })
        .populate('church')
    }
    return res.json({
      success: true,
      readingDays
    })
  } catch (err) {
    return next(err)
  }
}
