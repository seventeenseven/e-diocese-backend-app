
export default (req, res, next) => {
  res.sendHttpError = httpError => {
    const json = {
      statusText: httpError.message,
      status: httpError.status
    }

    if (httpError.errors.length) {
      json.errors = httpError.errors
    }

    res.status(httpError.status)
    res.json(json)
  }

  res.sendUserError = errorMessage => {
    res.json({
      error: true,
      errorMessage
    })
  }

  next()
}
