import _ from 'lodash'
import { HttpError } from '../../services/error'

export default (permissions = {}) => async ({ user }, res, next) => {
  try {
    await user.populateSubscriptionPlan()
    const userPersmissions = user.subscriptionPlan.permissions

    let allowAccess = true

    _.keys(permissions).forEach(permissionKey => {
      if (!permissions[permissionKey]) {
        return null
      }

      const permission = _.find(userPersmissions, ({ title }) => title === permissionKey)
      if (!permission || !permission.isActive) {
        allowAccess = false
      }
    })

    if (!allowAccess) {
      return res.sendHttpError(new HttpError(403, 'You haven\'t access'))
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
