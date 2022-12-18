import path from 'path'

require('dotenv').config()

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    publicHost:
        requireProcessEnv('PUBLIC_HOST') || 'https://e-diocese.herokuapp.com/api', // Online host
    apiRoot: requireProcessEnv('API_ROOT') || '',
    jwtSecret: requireProcessEnv('JWT_SECRET') || '',
    masterKey: requireProcessEnv('MASTER_KEY') || '',
    proxy: 'http://172.16.0.14:3128',
    pushNotification: {
      host: requireProcessEnv('PUSH_NOTIFICATION_HOST') || ''
    },
    cinetpay: {
      host: 'https://api-checkout.cinetpay.com/v2',
      apiKey: '252722363635ba443d57d17.63341972',
      siteId: '915963',
      secretKey: '18073365586366a9d576b5c1.17994038',
      notifyUrl: ''
    },
    twilio: {
      accountSid: requireProcessEnv('TWILIO_ACCOUNT_SID'),
      authToken: requireProcessEnv('TWILIO_AUTH_TOKEN'),
      sendNumber: requireProcessEnv('TWILIO_SEND_NUMBER')
    },
    orangeKotaci: {
      host: 'https://kota-ci.com'
    },
    mail: {
      user: requireProcessEnv('MAIL_USER'),
      pass: requireProcessEnv('MAIL_PASS'),
      default: requireProcessEnv('MAIL_DEFAULT')
    },
    mailConfigs: {
      host: requireProcessEnv('MAIL_HOST'),
      port: requireProcessEnv('MAIL_PORT')
    },
    sendgrid: {
      apiKey: requireProcessEnv('SENDGRID_API_KEY')
    },
    firebase: {
      databaseUrl: ''
    },
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
    security: {
      accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRES_IN || 48,
      jwtStrategyExpiry: process.env.JWT_STRATEGY_EXPIRES_IN || '7d'
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/artisans-backend-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    baseUrl: 'http://192.168.1.116:8080/api',
    mongo: {
      //* Production */
      uri: process.env.MONGODB_URI || requireProcessEnv('MONGODB_DEV_URI'),
      // 'mongodb://mongo:27017/e-diocese'
      //* Local */
      // uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artisans-bd',
      options: {
        debug: true
      }
    }
  },
  production: {
    baseUrl: requireProcessEnv('PUBLIC_HOST'),
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || requireProcessEnv('MONGODB_PROD_URI'),
      options: {}
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
