
import request from 'request-promise'
import { orangeKotaci } from '../../config'

const { host } = orangeKotaci

export const sendCode = async ({ to, code }) =>
  request({
    uri: `${host}/ediocese/sendSms.php?mobilenumber=${to}&smscode=${code}`,
    method: 'GET',
    json: true
  }).catch((err) => {
    console.error('send sms error', err)
  }
  )
