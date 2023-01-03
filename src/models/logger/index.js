import mongoose, { Schema } from 'mongoose'

const loggerSchema = new Schema(
  {
    action: {
      type: String,
      default: null
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
      default: null
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      default: null
    }
  },
  {
    timestamps: true
  }
)

loggerSchema.methods = {}

loggerSchema.statics = {
  async createLogger (logger) {
    return this.create(logger)
  }
}

const model = mongoose.model('Logger', loggerSchema)

export const schema = model.schema
export default model
