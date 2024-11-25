import errorhandler from 'errorhandler/index.js'
import mongoose from 'mongoose'
import { HttpError } from '../../services/error/index.js'

export default async (err, req, res, next) => {
  let error = err

  if (typeof error === 'number') {
    error = new HttpError(error)
  }

  if (error instanceof HttpError) {
    res.sendHttpError(error)
  } else if (error instanceof mongoose.Error.ValidationError) {
    res.sendHttpError(new HttpError(400))
  } else if (error.name === 'UnauthorizedError') {
    res.sendHttpError(new HttpError(401))
  } else if (error.name === 'StatusCodeError') {
    res.sendHttpError(new HttpError(400))
  } else if (process.env.NODE_ENV === 'development') {
    errorhandler()(error, req, res, next)
  } else {
    console.error(err)
    res.sendHttpError(new HttpError(500))
  }
}
