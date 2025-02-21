import Session from '../../../models/session/index.js'
import { sign } from '../../../services/jwt/index.js'
import { security } from '../../../config.js'
import { publicIpv4 } from 'public-ip';

export default async ({ bodymen: { body }, useragent, headers }, res, next) => {
  console.log("In login controller")
  try {
    const ipv4 = await publicIpv4();
    let ip
    if (process.env.NODE_ENV === 'production') {
      ip = headers['x-forwarded-for']
    } else {
      ip = ipv4
    }
    const user = await Session.createAdminSession(ip, useragent, body)
    const token = await sign(user.id, {
      expiresIn: security.jwtStrategyExpiry
    })
    return res.json({
      success: true,
      ...user,
      token
    })
  } catch (err) {
    console.log("Error in login: ", err);

    return next(err)
  }
}
