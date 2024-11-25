import ParticipateActivity from '../../../models/participateActivity'

export default async ({ user }, res, next) => {
  try {
    const activities = await ParticipateActivity.find({ user: user.id })
      .populate('activite')

    return res.json({
      success: true,
      activities
    })
  } catch (err) {
    return next(err)
  }
}
