import Notification from '../../../models/notification/index.js'

export default async ({ user, query }, res, next) => {
  try {
    const notifications = await Notification.find({ user: user.id })
      .sort({ createdAt: -1 }).limit(Number(query.limit))
    const count = await Notification.countDocuments({ user: user.id }).limit(Number(query.limit))
    return res.json({
      success: true,
      notifications,
      page: Number(query.page),
      count
    })
  } catch (err) {
    return next(err)
  }
}
