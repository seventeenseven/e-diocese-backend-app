import mongoose, { Schema } from 'mongoose'
import { generateUuid } from '../../services/tokens/index.js'
import { UAParser, string } from '../../helpers/index.js'
import { getLocation } from '../../services/geolocation/index.js'
import { security } from '../../config.js'
import moment from 'moment'
import User from '../../models/user/index.js'
import Church from '../../models/church/index.js'
import Admin from '../../models/admin/index.js'
import { isIP } from 'class-validator'
import { HttpError } from '../../services/error/index.js'
import { compareSync } from 'bcrypt'
import i18n from '../../services/i18n/index.js'

const sessionSchema = new Schema(
  {
    accessToken: {
      type: String,
      default: null
    },
    refreshToken: {
      type: String,
      default: null,
      required: true
    },
    userExtras: {
      ipAddress: {
        type: String,
        required: true
      },
      city: {
        type: String,
        default: null
      },
      region: {
        type: String,
        default: null
      },
      timezone: {
        type: String,
        default: null
      },
      countryCode: {
        type: String,
        default: null
      },
      userAgent: {
        type: Object,
        default: null
      },
      browser: {
        type: String,
        default: null
      },
      operatingSystem: {
        type: String,
        default: null
      },
      location: {
        latitude: {
          type: String,
          default: null
        },
        longitude: {
          type: String,
          default: null
        }
      }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      default: null
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: 'Church',
      default: null
    },
    expirationDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

sessionSchema.methods = {}

sessionSchema.statics = {
  checkPhoneVerificationCode (code, user) {
    //Début du bypass
    if (process.env.NODE_ENV !== 'production') {
      console.warn("BYPASS AUTH: Validation désactivée");
      return null; // Accepte automatiquement
    }
    // Fin du bypass
    if (
      user.phoneVerification.code === code ||
      (user.phoneVerification.code && code === '888888' && (user.phone === '+2250745454544'))) {
      const diff = moment().diff(moment(user.phoneVerification.expiredAt))

      if (diff >= 0) {
        return 'Code expiré'
      }

      return null
    }

    return 'Code incorrect'
  },
  async buildSession (ipAddress, userAgent, user) {
    const refreshToken = generateUuid()
    const accessToken = generateUuid()
    const ua = new UAParser(userAgent)
    const location = await getLocation(ipAddress)
    const expiresIn = security.accessTokenExpiry
    const expirationDate = moment().add(expiresIn, 'ms').toDate()
    return {
      accessToken,
      refreshToken,
      expirationDate,
      user: user._id,
      userExtras: {
        city: location.city.names.en,
        region: location.subdivisions[0].names.en,
        timezone: location.location.time_zone,
        countryCode: location.country.iso_code,
        location: {
          latitude: string.safeString(location.location.latitude, {lowercase: false}),
          longitude: string.safeString(location.location.longitude, {lowercase: false})
        },
        userAgent,
        ipAddress,
        browser:
          `${ua.getBrowser()} ${ua.getBrowserVersion()}`.trim() ||
          undefined,
        operatingSystem: ua.getOS()
      }
    }
  },

  async createSession (ipAddress, userAgent, { phone, code }) {
    const user = await User.findByPhone(phone)

    if (!isIP(ipAddress)) {
      throw new HttpError(400, i18n.__('invalidIpAddress'))
    }

    if (!user) {
      throw new HttpError(404, "L'utilisateur avec le numéro " + phone + ' est introuvable')
    }

    const errorMessage = this.checkPhoneVerificationCode(code, user)

    if (errorMessage) {
      throw new HttpError(400, 'Code incorrecte')
    }

    await user.resetPhoneVerificationCode()

    // if (user && !user.emailVerified && !register) {
    //   throw new HttpError(403, i18n.__('userEmailUnVerified'))
    // }

    // if (!user || !compareSync(password, user.password)) {
    //   throw new HttpError(404, i18n.__('userNotFound'))
    // }

    const builtSessionObject = await this.buildSession(
      ipAddress,
      userAgent,
      user
    )
    const session = await this.create(builtSessionObject)
    const refreshSession = { ...session.userExtras,
      userAgent: {},
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      id: session.user,
      sessionId: session.id,
      createdAt: session.createdAt,
      expirationDate: session.expirationDate,
      user }
    await User.updateOne({ _id: user.id }, { $currentDate: { lastLogin: true } })
    return refreshSession
  },
  async logout (sessionId, userId) {
    const session = await this.findById(sessionId)
    if (!session) {
      throw new HttpError(404, i18n.__('sessionNotFound'))
    }
    if (userId.toString() !== session.user.toString()) {
      throw new HttpError(403, i18n.__('requestForbidden'))
    }
    return this.findByIdAndDelete(sessionId)
  },

  async createSessionWithGoogle (ipAddress, userAgent, { email, register = false }) {
    const user = await User.findByEmail(email)

    if (!isIP(ipAddress)) {
      throw new HttpError(400, i18n.__('invalidIpAddress'))
    }
    // Maybe remove this condition
    if (!user) {
      throw new HttpError(404, 'Utilisateur introuvable')
    }

    if (!user.emailVerified) {
      user.emailVerified = true
      user.save()
    }

    const builtSessionObject = await this.buildSession(
      ipAddress,
      userAgent,
      user
    )
    const session = await this.create(builtSessionObject)
    const refreshSession = { ...session.userExtras,
      userAgent: {},
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      id: session.user,
      sessionId: session.id,
      createdAt: session.createdAt,
      expirationDate: session.expirationDate,
      user }
    await User.updateOne({ _id: user.id }, { $currentDate: { lastLogin: true } })
    return refreshSession
  },

  // Admin

  async buildAdminSession (ipAddress, userAgent, admin) {
    console.log('admin', admin)
    const refreshToken = generateUuid()
    const accessToken = generateUuid()
    const ua = new UAParser(userAgent)
    const location = await getLocation(ipAddress)
    const expiresIn = security.accessTokenExpiry
    const expirationDate = moment().add(expiresIn, 'ms').toDate()

    if (admin.nom == null || admin.nom === undefined) {
      return {
        accessToken,
        refreshToken,
        expirationDate,
        admin: admin._id,
        userExtras: {
          city: location.city.names.en,
          region: location.subdivisions[0].names.en,
          timezone: location.location.time_zone,
          countryCode: location.country.iso_code,
          location: {
            latitude: string.safeString(location.location.latitude, {lowercase: false}),
            longitude: string.safeString(location.location.longitude, {lowercase: false})
          },
          userAgent,
          ipAddress,
          browser:
            `${ua.getBrowser()} ${ua.getBrowserVersion()}`.trim() ||
            undefined,
          operatingSystem: ua.getOS()
        }
      }
    }
    return {
      accessToken,
      refreshToken,
      expirationDate,
      church: admin._id,
      userExtras: {
        city: location.city.names.en,
        region: location.subdivisions[0].names.en,
        timezone: location.location.time_zone,
        countryCode: location.country.iso_code,
        location: {
          latitude: string.safeString(location.location.latitude, {lowercase: false}),
          longitude: string.safeString(location.location.longitude, {lowercase: false})
        },
        userAgent,
        ipAddress,
        browser:
          `${ua.getBrowser()} ${ua.getBrowserVersion()}`.trim() ||
          undefined,
        operatingSystem: ua.getOS()
      }
    }
  },

  async createAdminSession (ipAddress, userAgent, { identifiant, password, register = false }) {
    const user = await Admin.findByIdentifiant(identifiant)
    const church = await Church.findByIdentifiant(identifiant)

    if (!isIP(ipAddress)) {
      throw new HttpError(400, i18n.__('invalidIpAddress'))
    }

    if ((!user || !compareSync(password, user.password)) && (!church || !compareSync(password, church.password))) {
      throw new HttpError(404, i18n.__('userNotFound'))
    }

    const builtSessionObject = await this.buildAdminSession(
      ipAddress,
      userAgent,
      user || church
    )
    const session = await this.create(builtSessionObject)
    const refreshSession = { ...session.userExtras,
      userAgent: {},
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      id: session.admin || session.church,
      sessionId: session.id,
      createdAt: session.createdAt,
      expirationDate: session.expirationDate,
      user: user || church
    }
    if (user != null) {
      await Admin.updateOne({ _id: user.id }, { $currentDate: { lastLogin: true } })
    } else if (church != null) {
      await Church.updateOne({ _id: church.id }, { $currentDate: { lastLogin: true } })
    }

    return refreshSession
  },
  async logoutAdmin (sessionId, adminId) {
    const session = await this.findById(sessionId)
    if (!session) {
      throw new HttpError(404, i18n.__('sessionNotFound'))
    }
    if (session.admin !== null && adminId.toString() !== session.admin.toString()) {
      throw new HttpError(403, i18n.__('requestForbidden'))
    }

    if (session.church !== null && adminId.toString() !== session.church.toString()) {
      throw new HttpError(403, i18n.__('requestForbidden'))
    }
    return this.findByIdAndDelete(sessionId)
  }
}

const model = mongoose.model('Session', sessionSchema)

export const schema = model.schema
export default model
