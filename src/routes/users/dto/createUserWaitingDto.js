import { schema } from '../../../models/waitinglistUser/index.js'

const { email, phone } = schema.tree

export const createUserWaitingDto = {
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email,
  phone,
  job: {
    type: String
  },
  address: {
    type: String
  }
}
