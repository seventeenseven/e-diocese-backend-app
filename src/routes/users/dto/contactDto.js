import { schema } from '~/models/user'

export const { email } = schema.tree

export const contactDto = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email,
  message: {
    type: String,
    required: true
  }
}
