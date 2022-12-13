import mongoose, { Schema } from 'mongoose'
import { string } from '~/helpers'

const churchSchema = new Schema(
  {
    nom: {
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
    pays: {
      type: String,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    email: {
      type: String,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      trim: true,
      required: true,
      lowercase: true,
      unique: true
    },
    identifiant: {
      type: String,
      default: null
    },
    password: {
      type: String,
      default: null
    },
    location: {
      coordinates: [Number],
      type: {
        type: String,
        default: 'Point'
      }
    },
    lastLogin: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

churchSchema.methods = {
  view () {
    let view = {}
    let fields = [
      'id',
      'createdAt',
      'updatedAt',
      'nom',
      'description',
      'image',
      'email',
      'ville',
      'commune',
      'pays',
      'logo',
      'identifiant',
      'lastLogin'
    ]

    fields.forEach((field) => {
      view[field] = this[field]
    })
    return view
  }
}

churchSchema.statics = {
  async findByEmail (email) {
    const { safeEmail } = string
    const emailSafe = safeEmail(email)
    return this.findOne({ email: emailSafe })
  },
  async findByIdentifiant (id) {
    return this.findOne({ identifiant: id })
  },
  async createChurch (church) {
    return this.create(church)
  }
}

const model = mongoose.model('Church', churchSchema)

export const schema = model.schema
export default model
