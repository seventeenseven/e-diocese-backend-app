import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      default: null
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    craftsman: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

commentSchema.methods = {}

commentSchema.statics = {
  async createComment (comment) {
    return this.create(comment)
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
