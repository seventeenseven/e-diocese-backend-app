import ReadingDay from '../../../../models/readingDay'
import { HttpError } from '~/services/error'

export default async ({ user, params }, res, next) => {
  try {
    const findReadingDay = await ReadingDay.findById(params.id)
    if (findReadingDay === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const readingDayBeforeDelete = await findReadingDay.deleteOne({ _id: params.id })

    return res.json({
      success: true,
      readingDay: readingDayBeforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
