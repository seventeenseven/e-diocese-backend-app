import Session from '../../../models/session/index.js'
import {publicIpv4} from 'public-ip';
import { sign } from '../../../services/jwt/index.js'
import { security } from '../../../config.js'

export default async ({ bodymen: { body }, useragent, headers }, res, next) => {
  try {
    const ipv4 = await publicIpv4();
    let ip
    if (process.env.NODE_ENV === 'production') {
      ip = headers['x-forwarded-for']
    } else {
      ip = ipv4
    }
    const user = await Session.createSession(ip, useragent, body)
    console.log(user.id)
    const token = await sign(user.id, {
      expiresIn: security.jwtStrategyExpiry
    })
    return res.json({
      success: true,
      ...user,
      token
    })
  } catch (error) {
    return next(error)
  }
}
