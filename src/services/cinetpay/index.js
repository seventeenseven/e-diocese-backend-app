import { CinetpayError } from './error'
import request from 'request-promise'
import { cinetpay, publicHost } from '../../config'

const { host, apiKey, siteId } = cinetpay

export const getPayStatus = ({ transactionId }) =>
  request({
    uri: `${host}/payment/check`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    json: true,
    form: {
      transaction_id: transactionId,
      site_id: siteId,
      apikey: apiKey
    }
  }).catch((err) =>
    Promise.reject(new CinetpayError('Get pay status error', err))
  )

export const initiatePayment = ({
  transactionId,
  amount,
  currency,
  description
}) =>
  request({
    uri: `${host}/payment`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    json: true,
    form: {
      transaction_id: transactionId,
      site_id: siteId,
      apikey: apiKey,
      amount,
      currency,
      description,
      notify_url: `${publicHost}/church/cinetpay/notify`,
      return_url: `${publicHost}/church/cinetpay/notify`
    }
  }).catch((err) =>
    Promise.reject(new CinetpayError('initiate payment error', err))
  )
