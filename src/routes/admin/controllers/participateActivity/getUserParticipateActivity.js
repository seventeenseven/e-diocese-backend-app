import ParticipateActivity from '../../../../models/participateActivity'

export default async ({ user }, res, next) => {
  try {
    const participateActivity = await ParticipateActivity.find({})
      .populate('activite')
      .populate('user')

    return res.json({
      success: true,
      participateActivity
    })
  } catch (err) {
    return next(err)
  }
}
