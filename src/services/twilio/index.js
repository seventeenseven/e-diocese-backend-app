import Twilio from 'twilio'
import { twilio as twilioCofig } from '../../config'
import { TwilioError } from './error'

const { accountSid, authToken } = twilioCofig
const client = new Twilio(accountSid, authToken)

export const sendCode = async ({ to, code }) => {
  const resp = await client.messages.create({
    body: `Votre code de vérification E-Diocese est: ${code}`,
    to,
    from: 'E-Diocese'
  }).catch(err => {
    return Promise.reject(new TwilioError('Send message error', err))
  })

  if (resp) {
    console.log('resp', resp)
  }
}
