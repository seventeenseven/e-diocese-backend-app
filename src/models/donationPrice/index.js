import mongoose, { Schema } from 'mongoose'

const donationPriceSchema = new Schema(
  {
    label: {
      type: String,
      trim: true,
      default: null
    },
    value: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

donationPriceSchema.methods = {

}

donationPriceSchema.statics = {
  async createPrice (price) {
    return this.create(price)
  }
}

const model = mongoose.model('DonationPrice', donationPriceSchema)

export const schema = model.schema
export default model
