import mongoose, { Schema } from 'mongoose'
import { string } from '../../helpers'
import { hashPlainPassword } from '../../services/tokens'
///home/jane/Work/tuto-flutter/E-diocese/e-diocese-backend-app/src/models/user/
import { HttpError } from '../../services/error'
import i18n from '../../services/i18n'
import moment from 'moment'
import generateVerificationCode from '../../utils/generateVerificationCode'
import { getCurrencyByCountryCode } from '../../services/countries'

const userSchema = new Schema(
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
    picture: {
      type: String,
      default: null
    },
    email: {
      type: String,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      trim: true,
      default: null,
      lowercase: true,
      unique: true
    },
    ville: {
      type: String,
      default: null,
      lowercase: true
    },
    emailVerification: {
      code: {
        type: String,
        default: null
      },

      expiredAt: {
        type: Date,
        default: null
      },

      changedAt: {
        type: Date,
        default: null
      }
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      match: /^\+\d{2,20}$/,
      required: true,
      unique: true,
      sparse: true
    },
    phoneVerification: {
      code: {
        type: String,
        default: null
      },
      expiredAt: {
        type: Date,
        default: null
      },

      changedAt: {
        type: Date,
        default: null
      }
    },
    // password: {
    //   type: String,
    //   default: null
    // },
    lastLogin: {
      type: Date,
      default: null
    },
    currency: {
      type: String,
      match: /^[A-Z]{2,3}$/,
      required: true
    },
    country: {
      type: String,
      match: /^[A-Z]{2}$/,
      required: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods = {
  view () {
    let view = {}
    let fields = [
      'id',
      'createdAt',
      'updatedAt',
      'firstName',
      'lastName',
      'currency',
      'country',
      'picture',
      'email',
      'phone',
      'lastLogin',
      // 'emailVerified',
      'ville'
    ]

    fields.forEach((field) => {
      view[field] = this[field]
    })
    return view
  },
  getFullName () {
    return `${this.firstName} ${this.lastName}`
  },
  updatePassword ({ newPassword }) {
    // if (!compareSync(oldPassword, this.password)) {
    //   throw new HttpError(400, i18n.__('incorrectOldPassword'))
    // }
    const hashedPassword = hashPlainPassword(newPassword)
    this.password = hashedPassword
    return this.save()
  },
  async setEmailVerificationCode () {
    const code = generateVerificationCode(6)
    this.emailVerification = {
      code,
      changedAt: new Date(),
      expiredAt: moment().add(1, 'hours')
    }
    await this.save()
    return code
  },
  async setPhoneVerificationCode () {
    const code = generateVerificationCode(6)

    this.phoneVerification = {
      code,
      changedAt: new Date(),
      expiredAt: moment().add(1, 'hours')
    }

    await this.save()
    return code
  },
  resetPhoneVerificationCode () {
    this.phoneVerification = {}
    return this.save()
  },
  resetEmailVerificationCode () {
    this.emailVerification = {}
    this.emailVerified = true
    return this.save()
  },
  checkEmailVerificationCode (code) {
    if (this.emailVerification.code === code) {
      const diff = moment().diff(moment(this.emailVerification.expiredAt))
      if (diff >= 0) {
        return i18n.__('codeExpired')
      }
      return null
    }
    return i18n.__('incorrectCode')
  }
}

userSchema.statics = {
  async findByEmail (email) {
    const { safeEmail } = string
    const emailSafe = safeEmail(email)
    return this.findOne({ email: emailSafe })
  },
  findByPhone (phone) {
    return this.findOne({ phone }).select('-__v')
  },
  async createUser (user) {
    const checkForUser = await this.findByEmail(user.email)
    if (checkForUser) {
      throw new HttpError(400, i18n.__('verifiedAccountAlreadyAssociated'))
    }
    // if (checkForUser && !checkForUser.emailVerified) {
    //   return { checkForUser, userExistAndUnverified: true }
    // }
    const checkPhone = await this.findOne({ phone: user.phone })
    if (checkPhone) {
      throw new HttpError(400, i18n.__('userPhoneExist'))
    }
    const currency = getCurrencyByCountryCode(user.country)
    // const hashedPassword = hashPlainPassword(user.password)
    return this.create({
      ...user,
      currency
      // password: hashedPassword
    })
  },
  async createUserByAdmin (user) {
    const checkForUser = await this.findByEmail(user.email)
    if (checkForUser) {
      throw new HttpError(400, i18n.__('verifiedAccountAlreadyAssociated'))
    }
    const checkPhone = await this.findOne({ phone: user.phone })
    if (checkPhone) {
      throw new HttpError(400, i18n.__('userPhoneExist'))
    }
    const hashedPassword = hashPlainPassword(user.password)
    return this.create({
      ...user,
      password: hashedPassword,
      emailVerified: true
    })
  }
}

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
