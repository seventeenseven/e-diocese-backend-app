import util from 'util'
import { ServiceError } from '../../error/index.js'

const OrangeKotaciError = function () {
  ServiceError.apply(this, arguments)
  Error.captureStackTrace(this, OrangeKotaciError)
}

util.inherits(OrangeKotaciError, ServiceError)

OrangeKotaciError.prototype.name = 'OrangeKotaciError'

export {
  OrangeKotaciError
}
