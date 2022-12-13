import mongoose, { Schema } from 'mongoose'

const newsSchema = new Schema(
  {
    titre: {
      type: String,
      trim: true,
      default: null
    },
    sousTitre: {
      type: String,
      trim: true,
      default: null
    },
    description: {
      type: String,
      trim: true,
      default: null
    },
    image: {
      type: String,
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

newsSchema.methods = {

}

newsSchema.statics = {
  async createNews (news) {
    return this.create(news)
  }
}

const model = mongoose.model('News', newsSchema)

export const schema = model.schema
export default model
