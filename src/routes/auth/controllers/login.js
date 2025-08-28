import Session from '../../../models/session/index.js'
import {publicIpv4} from 'public-ip';
import { sign } from '../../../services/jwt/index.js'
import { security } from '../../../config.js'

export default async ({ bodymen: { body }, useragent, headers }, res, next) => {
  try {
    const { phone, code } = body;
    const ipv4 = await publicIpv4();
    let ip;

    // Contournement de vérification en développement
    if (process.env.NODE_ENV !== 'production') {
      console.warn("BYPASS AUTH: Mode développement - vérification désactivée");
    } else {
      // Logique de vérification normale en production
      if (!isValidCode(phone, code)) {
        throw new Error("Code invalide");
      }
    }

    if (process.env.NODE_ENV === 'production') {
      ip = headers['x-forwarded-for'];
    } else {
      ip = ipv4;
    }

    const user = await Session.createSession(ip, useragent, body);
    const token = await sign(user.id, {
      expiresIn: security.jwtStrategyExpiry
    });

    return res.json({
      success: true,
      ...user,
      token
    });
  } catch (error) {
    return next(error);
  }
};

