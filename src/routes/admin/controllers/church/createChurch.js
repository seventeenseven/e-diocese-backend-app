import Church from '../../../../models/church'
import { HttpError } from '~/services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw HttpError(403, 'Vous devez être SuperAdmin pour pouvoir créer une église')
    }
    const church = await Church.createChurch(body)

    await storeLogger({ action: "Création d'une église", user })

    return res.json({
      success: true,
      church
    })
  } catch (err) {
    return next(err)
  }
}
