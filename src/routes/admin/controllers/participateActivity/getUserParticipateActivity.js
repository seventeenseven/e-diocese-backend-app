import ParticipateActivity from '../../../../models/participateActivity'

export default async ({ user }, res, next) => {
  try {
    let participateActivity
    if (user.isSuperAdmin) {
      participateActivity = await ParticipateActivity.find({})
        .populate('activite')
        .populate('user')
    } else {
      const participateGetForFilter = await ParticipateActivity.find({})
        .populate('activite')
        .populate('user')

      participateActivity = participateGetForFilter.filter(e => e.activite.church.toString() === user.id)
      console.log('participateGetForFilter', participateGetForFilter)
      console.log('participateActivity', participateActivity)
    }

    return res.json({
      success: true,
      participateActivity
    })
  } catch (err) {
    return next(err)
  }
}
