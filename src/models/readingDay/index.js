import mongoose, { Schema } from 'mongoose'

const readingDaySchema = new Schema(
  {
    date: {
      type: Date,
      default: null
    },
    titre: {
      type: String,
      trim: true,
      default: null
    },
    passage: {
      type: String,
      default: null
    },
    versets: {
      type: String,
      default: null
    },
    contenu: {
      type: String,
      default: null
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church'
    }
  },
  {
    timestamps: true
  }
)

readingDaySchema.methods = {

}

readingDaySchema.statics = {
  async createReading (reading) {
    return this.create(reading)
  }
}

const model = mongoose.model('ReadingDay', readingDaySchema)

export const schema = model.schema
export default model
