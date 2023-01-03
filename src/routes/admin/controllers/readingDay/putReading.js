import ReadingDay from '../../../../models/readingDay'
import { HttpError } from '~/services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    const readingDay = await ReadingDay.findById(params.id)
    if (!readingDay) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }
    const newReadingDay = Object.assign(readingDay, body)
    newReadingDay.save()

    await storeLogger({ action: "Modification d'une lecture du jour", user })

    return res.json({
      success: true,
      readingDay: newReadingDay
    })
  } catch (err) {
    return next(err)
  }
}
