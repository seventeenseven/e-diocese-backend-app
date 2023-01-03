import ReadingDay from '../../../../models/readingDay'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const readingDay = await ReadingDay.findById(params.id)
      .populate('church')
      .lean()
    await storeLogger({ action: "Affichage d'une lecture du jour", user })
    return res.json({
      success: true,
      ...readingDay
    })
  } catch (err) {
    return next(err)
  }
}
