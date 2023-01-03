import mongoose, { Schema } from 'mongoose'

const versementSchema = new Schema(
  {
    amount: {
      type: Number
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
      required: true
    },
    month: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

versementSchema.methods = {}

versementSchema.statics = {
  async createVersement (versement) {
    return this.create(versement)
  }
}

const model = mongoose.model('Versement', versementSchema)

export const schema = model.schema
export default model
