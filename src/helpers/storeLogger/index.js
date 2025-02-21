import Logger from '../../models/logger/index.js'

export default async ({ action, user }) => {
  try {
    if (user.isSuperAdmin) {
      return await Logger.createLogger({ action, admin: user.id })
    }
    return Logger.createLogger({ action, church: user.id })
  } catch (err) {
    return console.error(err)
  }
}
