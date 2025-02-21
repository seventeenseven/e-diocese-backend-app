import { schema } from '../../../models/user/index.js'

export const { email, phone } = schema.tree

export const updateMeDto = {
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email,
  phone
}
