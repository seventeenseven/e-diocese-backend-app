import mongoose, { Schema } from 'mongoose'

const priereSchema = new Schema(
  {
    sujet: {
      type: String,
      trim: true,
      default: null
    },
    temps: {
      type: String,
      trim: true,
      default: null
    },
    periode: {
      type: String,
      trim: true,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
      required: true
    }
  },
  {
    timestamps: true
  }
)

priereSchema.methods = {
  async pay () {
    this.isPaid = true
    return this.save()
  }
}

priereSchema.statics = {
  async createPriere (priere) {
    return this.create(priere)
  }
}

const model = mongoose.model('Priere', priereSchema)

export const schema = model.schema
export default model
