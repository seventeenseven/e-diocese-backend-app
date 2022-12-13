import ReadingDay from '~/models/readingDay'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const readingDay = await ReadingDay.createReading(body)
    return res.json({ success: true, readingDay })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
