import mongoose, { Schema } from 'mongoose'

const churchFavorisSchema = new Schema(
  {
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
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

churchFavorisSchema.methods = {

}

churchFavorisSchema.statics = {
  async createFavoris (favoris) {
    return this.create(favoris)
  }
}

const model = mongoose.model('ChurchFavoris', churchFavorisSchema)

export const schema = model.schema
export default model
