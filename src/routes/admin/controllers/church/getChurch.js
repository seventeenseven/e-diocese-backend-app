import Church from '../../../../models/church'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const church = await Church.findById(params.id).lean()
    await storeLogger({ action: "Affichage d'une église", user })
    return res.json({
      success: true,
      ...church
    })
  } catch (err) {
    return next(err)
  }
}
