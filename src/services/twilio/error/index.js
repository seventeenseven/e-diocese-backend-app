import util from 'util'
import { ServiceError } from '../../error/index.js'

const TwilioError = function () {
  ServiceError.apply(this, arguments)
  Error.captureStackTrace(this, TwilioError)
}

util.inherits(TwilioError, ServiceError)

TwilioError.prototype.name = 'TwilioError'

export {
  TwilioError
}
