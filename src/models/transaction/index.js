import mongoose, { Schema } from 'mongoose'

const STATUSES = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REFUSED: 'REFUSED'
}

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    currency: {
      type: String,
      match: /^[A-Z]{2,3}$/,
      required: true
    },
    paidDate: {
      type: Date,
      default: null
    },
    rejectDate: {
      type: Date,
      default: null
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true
    },
    isReject: {
      type: Boolean,
      default: false,
      required: true
    },
    status: {
      type: String,
      default: STATUSES.PENDING,
      enum: [STATUSES.PENDING, STATUSES.ACCEPTED, STATUSES.REFUSED]
    },
    amount: {
      type: Number,
      required: true
    },
    serviceTransactionRef: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    },
    signature: {
      type: String,
      default: null
    },
    txRef: {
      type: String,
      default: null
    },
    asc: String
  },
  {
    timestamps: true
  }
)

transactionSchema.methods = {
  pay () {
    this.paidDate = new Date()
    this.isPaid = true
    this.status = STATUSES.ACCEPTED
    return this.save()
  },

  reject () {
    this.rejectDate = new Date()
    this.isReject = true
    this.status = STATUSES.REFUSED
    return this.save()
  },

  setServiceTransactionRef (ref) {
    this.serviceTransactionRef = ref
    return this.save()
  },

  addSignature (sign) {
    this.signature = sign
    return this.save()
  },

  setAsc (asc) {
    this.asc = asc
    return this.save()
  }
}

transactionSchema.statics = {
  createCinetpayTopUpInstance (data) {
    return this.create(data)
  }
}

const model = mongoose.model('Transaction', transactionSchema)

export const schema = model.schema
export default model
