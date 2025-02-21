import ReadingDay from '../../../../models/readingDay/index.js'
import { HttpError } from '../../../../services/error/index.js'
import { storeLogger } from '../../../../helpers/index.js'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (user.isSuperAdmin) {
      throw new HttpError(403, "Pour créer une lecture vous devez être le responsable d'une église")
    }
    const readingDay = await ReadingDay.createReading({ ...body, church: user.id })

    await storeLogger({ action: "Ajout d'une nouvelle lecture du jour", user })

    return res.json({
      success: true,
      readingDay
    })
  } catch (err) {
    return next(err)
  }
}
