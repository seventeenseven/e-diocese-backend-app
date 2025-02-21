import { schema } from '../../../models/user/index.js'

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
