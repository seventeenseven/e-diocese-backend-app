export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
