import mongoose, { Schema } from 'mongoose'

const activiteSchema = new Schema(
  {
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
    image: {
      type: String,
      default: null
    },
    ville: {
      type: String,
      default: null,
      lowercase: true
    },
    commune: {
      type: String,
      default: null
    },
    date: {
      type: Date,
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

activiteSchema.methods = {

}

activiteSchema.statics = {
  async createActivite (activite) {
    return this.create(activite)
  }
}

const model = mongoose.model('Activite', activiteSchema)

export const schema = model.schema
export default model
