import mongoose, { Schema } from 'mongoose'

const donationSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
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
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

donationSchema.methods = {
  async pay () {
    this.isPaid = true
    return this.save()
  }
}

donationSchema.statics = {
  async createDonation (donation) {
    return this.create(donation)
  }
}

const model = mongoose.model('Donation', donationSchema)

export const schema = model.schema
export default model
