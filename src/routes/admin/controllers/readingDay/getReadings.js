import ReadingDay from '../../../../models/readingDay'
import { storeLogger } from '../../../../helpers'

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
    await storeLogger({ action: 'Affichage de la liste des lectures du jour', user })
    return res.json({
      success: true,
      readingDays
    })
  } catch (err) {
    return next(err)
  }
}
