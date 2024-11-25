import Logger from '../../../models/logger'

export default async ({ user, params }, res, next) => {
  try {
    const log = await Logger.findById(params.id)
      .populate('church')
      .populate('admin')
      .lean()

    return res.json({
      success: true,
      ...log
    })
  } catch (err) {
    return next(err)
  }
}
