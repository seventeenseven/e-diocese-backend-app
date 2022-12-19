const createChurchDto = {
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  commune: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    coordinates: [Number]
  },
  email: {
    type: String
  },
  pays: {
    type: String
  },
  identifiant: {
    type: String
  },
  password: {
    type: String
  }
}

export default createChurchDto
