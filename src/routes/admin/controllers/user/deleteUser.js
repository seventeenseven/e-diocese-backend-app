import User from '../../../../models/user'
import ParticipateActivity from '../../../../models/participateActivity'
import { HttpError } from '~/services/error'
import { storeLogger } from '../../../../helpers'

export default async ({ user, params }, res, next) => {
  try {
    const findUser = await User.findById(params.id)
    if (findUser === null) {
      throw new HttpError(404, 'Élément introuvable')
    }
    const userBeforeDelete = await findUser.deleteOne({ _id: params.id })
    const findUserParticipateActivity = await ParticipateActivity.findOne({ user: params.id })
    let associatedUserParticipateActivity

    if (findUserParticipateActivity !== null) {
      associatedUserParticipateActivity = await findUserParticipateActivity.deleteOne({ _id: findUserParticipateActivity.id })
    }

    await storeLogger({ action: "Suppression d'un utilisateur", user })

    return res.json({
      success: true,
      user: userBeforeDelete,
      associatedUserParticipateActivity
    })
  } catch (err) {
    return next(err)
  }
}
