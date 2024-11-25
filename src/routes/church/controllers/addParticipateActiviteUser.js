import ParticipateActivity from '../../../models/participateActivity'

export default async ({ bodymen: { body }, user }, res, next) => {
  try {
    const getParticipate = await ParticipateActivity.findOne({
      activite: body.activite,
      user: user.id
    })

    // return ParticipateActivity.findByIdAndDelete(sessionId)

    if (getParticipate != null) {
      await ParticipateActivity.findByIdAndDelete(getParticipate.id)
      return res.json({
        success: true,
        message: 'Vous ne participez plus à cette activité'
      })
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
