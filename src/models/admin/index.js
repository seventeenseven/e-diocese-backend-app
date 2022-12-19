import { compareSync } from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { string } from '~/helpers'
import { hashPlainPassword } from '~/services/tokens'
import { HttpError } from '~/services/error'
import i18n from '~/services/i18n'

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: null
    },
    lastName: {
      type: String,
      trim: true,
      default: null
    },
    isSuperAdmin: {
      type: Boolean,
      default: true
    },
    picture: {
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
    company: {
      type: String,
      trim: true,
      default: 'E-Diocese'
    },
    phone: {
      type: String,
      match: /^\+\d{2,20}$/,
      default: null,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      default: null
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

adminSchema.methods = {
  view () {
    let view = {}
    let fields = [
      'id',
      'createdAt',
      'updatedAt',
      'isSuperAdmin',
      'firstName',
      'lastName',
      'picture',
      'email',
      'phone',
      'identifiant',
      'lastLogin',
      'company'
    ]

    fields.forEach((field) => {
      view[field] = this[field]
    })
    return view
  },
  getFullName () {
    return `${this.firstName} ${this.lastName}`
  },
  updatePassword ({ oldPassword, newPassword }) {
    if (!compareSync(oldPassword, this.password)) {
      throw new HttpError(400, i18n.__('incorrectOldPassword'))
    }
    const hashedPassword = hashPlainPassword(newPassword)
    this.password = hashedPassword
    return this.save()
  }
}

adminSchema.statics = {
  async findByEmail (email) {
    const { safeEmail } = string
    const emailSafe = safeEmail(email)
    return this.findOne({ email: emailSafe })
  },
  async findByIdentifiant (id) {
    return this.findOne({ identifiant: id })
  },
  async createAdmin (admin) {
    const checkForUser = await this.findByEmail(admin.email)
    if (checkForUser) {
      throw new HttpError(400, i18n.__('verifiedAccountAlreadyAssociated'))
    }
    const checkPhone = await this.findOne({ phone: admin.phone })
    if (checkPhone) {
      throw new HttpError(400, i18n.__('userPhoneExist'))
    }
    const hashedPassword = hashPlainPassword(admin.password)
    return this.create({
      ...admin,
      password: hashedPassword
    })
  }
}

const model = mongoose.model('Admin', adminSchema)

export const schema = model.schema
export default model
