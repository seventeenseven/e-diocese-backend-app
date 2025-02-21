import Logger from '../../../models/logger/index.js'

export default async ({ user }, res, next) => {
  try {
    let logs
    logs = await Logger.find({})
      .populate('church')
      .populate('admin')
      .sort({ createdAt: -1 })

    if (!user.isSuperAdmin) {
      logs = []
    }

    return res.json({
      success: true,
      logs
    })
  } catch (err) {
    return next(err)
  }
}
