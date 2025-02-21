import ReadingDay from '../../../../models/readingDay/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ user, params }, res, next) => {
  try {
    const findReadingDay = await ReadingDay.findById(params.id)
    if (findReadingDay === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const readingDayBeforeDelete = await findReadingDay.deleteOne({ _id: params.id })

    await storeLogger({ action: "Suppression d'une lecture du jour", user })

    return res.json({
      success: true,
      readingDay: readingDayBeforeDelete
    })
  } catch (err) {
    return next(err)
  }
}
