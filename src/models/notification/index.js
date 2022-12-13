import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

notificationSchema.methods = {}

notificationSchema.statics = {
  async createNotification (notification) {
    return this.create(notification)
  }
}

const model = mongoose.model('Notification', notificationSchema)

export const schema = model.schema
export default model
