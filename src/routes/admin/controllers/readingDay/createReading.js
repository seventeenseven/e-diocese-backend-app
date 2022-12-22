import ReadingDay from '../../../../models/readingDay'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une lecture vous devez être le responsable d'une église")
    }
    const readingDay = await ReadingDay.createReading({ ...body, church: user.id })
    return res.json({
      success: true,
      readingDay
    })
  } catch (err) {
    return next(err)
  }
}
