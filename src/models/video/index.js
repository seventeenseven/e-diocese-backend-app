import mongoose, { Schema } from 'mongoose'

const videoSchema = new Schema(
  {
    url: {
      type: String,
      trim: true,
      default: null
    },
    titre: {
      type: String,
      trim: true,
      default: null
    },
    description: {
      type: String,
      trim: true,
      default: null
    },
    church: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Church'
    }
  },
  {
    timestamps: true
  }
)

videoSchema.methods = {

}

videoSchema.statics = {
  async createVideo (video) {
    return this.create(video)
  }
}

const model = mongoose.model('Video', videoSchema)

export const schema = model.schema
export default model
