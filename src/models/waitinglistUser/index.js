import mongoose, { Schema } from 'mongoose'

const waitinglistUserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: null
    },
    lastName: {
      type: String,
      trim: true,
      default: null
    },
    email: {
      type: String,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      trim: true,
      required: true,
      lowercase: true
    },
    phone: {
      type: String,
      match: /^\+\d{2,20}$/,
      required: true
    },
    job: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
)

waitinglistUserSchema.methods = {}

waitinglistUserSchema.statics = {
  async createUser (user) {
    return this.create(user)
  }
}

const model = mongoose.model('WaitinglistUser', waitinglistUserSchema)

export const schema = model.schema
export default model
