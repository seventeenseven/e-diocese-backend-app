import ParticipateActivity from '../../../../models/participateActivity'
import { storeLogger } from '../../../../helpers'

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

    await storeLogger({ action: 'Affichage de liste des utilisateurs qui participent aux activités', user })

    return res.json({
      success: true,
      participateActivity
    })
  } catch (err) {
    return next(err)
  }
}
