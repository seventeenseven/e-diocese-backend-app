import mongoose, { Schema } from 'mongoose'

const prayerPriceSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      default: null
    },
    amount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

prayerPriceSchema.methods = {

}

prayerPriceSchema.statics = {
  async createPrice (price) {
    return this.create(price)
  }
}

const model = mongoose.model('PrayerPrice', prayerPriceSchema)

export const schema = model.schema
export default model
