import ReadingDay from '../../../../models/readingDay'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const readingDay = await ReadingDay.createReading(body)
    return res.json({
      success: true,
      readingDay
    })
  } catch (err) {
    return next(err)
  }
}
