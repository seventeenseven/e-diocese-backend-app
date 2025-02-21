import Notification from '../../../models/notification/index.js'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    const notification = await Notification.createNotification(body)
    return res.json({ success: true, notification })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
