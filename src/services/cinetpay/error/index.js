import util from 'util'
import { ServiceError } from '../../error/index.js'

const CinetpayError = function (message, data = {}) {
  ServiceError.apply(this, arguments)
  Error.captureStackTrace(this, CinetpayError)
}

util.inherits(CinetpayError, ServiceError)

CinetpayError.prototype.name = 'CinetpayError'

export {
  CinetpayError
}
