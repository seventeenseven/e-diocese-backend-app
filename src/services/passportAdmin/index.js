import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import Admin from '../../models/admin'
import Church from '../../models/church'

export const master = () =>
  passport.authenticate('master', { session: false })

export const tokenAdmin = ({
  required
} = {}) => (req, res, next) =>
  passport.authenticate('tokenAdmin', { session: false }, (err, user, info) => {
    if (err || (required && !user)) {
      return res.status(401).end()
    }

    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('tokenAdmin', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, async ({ id }, done) => {
  try {
    const admin = await Admin.findById(id)
    const church = await Church.findById(id)
    if (admin != null) {
      done(null, admin)
    }
    if (church != null) {
      done(null, church)
    }
    return null
  } catch (e) {
    done()
  }
  // Admin.findById(id).then((user) => {
  //   done(null, user)
  //   return null
  // }).catch(done)
})
)
