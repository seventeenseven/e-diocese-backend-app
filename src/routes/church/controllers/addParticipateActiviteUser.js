import ParticipateActivity from '~/models/participateActivity'
import { HttpError } from '~/services/error'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getParticipate = await ParticipateActivity.findOne({
      activite: body.activite,
      user: user.id
    })

    if (getParticipate != null) {
      throw new HttpError(400, 'Vous êtes déjà inscrit à cette activité')
    }

    const refactBody = { ...body, user: user.id }
    const activiteParticipate = await ParticipateActivity.createParticipateActivite(refactBody)
    return res.json({
      success: true,
      activiteParticipate
    })
  } catch (err) {
    return next(err)
  }
}
