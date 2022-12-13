import mongoose, { Schema } from 'mongoose'

const newsFavorisSchema = new Schema(
  {
    news: {
      type: Schema.Types.ObjectId,
      ref: 'News',
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

newsFavorisSchema.methods = {

}

newsFavorisSchema.statics = {
  async createNewsFav (favoris) {
    return this.create(favoris)
  }
}

const model = mongoose.model('NewsFavoris', newsFavorisSchema)

export const schema = model.schema
export default model
