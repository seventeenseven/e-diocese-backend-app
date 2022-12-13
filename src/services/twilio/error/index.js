import util from 'util'
import { ServiceError } from '../../error'

const TwilioError = function () {
  ServiceError.apply(this, arguments)
  Error.captureStackTrace(this, TwilioError)
}

util.inherits(TwilioError, ServiceError)

TwilioError.prototype.name = 'TwilioError'

export {
  TwilioError
}
