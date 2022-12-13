import { schema } from '~/models/user'

const { email, phone, country } = schema.tree

export const createUserDto = {
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  picture: {
    type: String
  },
  email,
  // password: {
  //   type: String,
  //   required: true
  // },
  ville: {
    type: String,
    required: true
  },
  phone,
  country
}
