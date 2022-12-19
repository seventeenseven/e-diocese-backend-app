import Church from '../../../../models/church'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user, params }, res, next) => {
  try {
    if (!user.isSuperAdmin) {
      throw HttpError(403, 'Vous devez être SuperAdmin pour pouvoir modifier une église')
    }
    const church = await Church.findById(params.id)
    if (!church) {
      throw new HttpError(400, "L'élément que vous voulez modifier est introuvable")
    }

    console.log('church', church)
    console.log('body', body)

    const newChurch = Object.assign(church, body)
    newChurch.save()

    return res.json({
      success: true,
      church: newChurch
    })
  } catch (err) {
    return next(err)
  }
}
