import mongoose, { Schema } from 'mongoose'

const videoFavorisSchema = new Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true
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

videoFavorisSchema.methods = {

}

videoFavorisSchema.statics = {
  async createVideoFavoris (favoris) {
    return this.create(favoris)
  }
}

const model = mongoose.model('VideoFavoris', videoFavorisSchema)

export const schema = model.schema
export default model
