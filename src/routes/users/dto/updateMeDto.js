import { schema } from '../../../models/user'

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
