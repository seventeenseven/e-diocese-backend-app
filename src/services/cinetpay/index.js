import { CinetpayError } from './error/index.js'
import axios from 'axios';
import { cinetpay, publicHost } from '../../config.js'

const { host, apiKey, siteId } = cinetpay

export const getPayStatus = async ({ transactionId }) =>
  {try{
     const response = await axios.post(`${host}/payment/check`,{
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      json: true,
      form: {
        transaction_id: transactionId,
        site_id: siteId,
        apikey: apiKey
      }
    });
  }catch(err){
    Promise.reject(new CinetpayError('Get pay status error', err))
  }
}

export const initiatePayment = async ({
  transactionId,
  amount,
  currency,
  description
}) => {
  try {
    const response = await axios.post(
      `${host}/payment`,
      {
        transaction_id: transactionId,
        site_id: siteId,
        apikey: apiKey,
        amount,
        currency,
        description,
        notify_url: `${publicHost}/church/cinetpay/notify`,
        return_url: `${publicHost}/church/cinetpay/notify`
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new CinetpayError('initiate payment error', err);
  }
};
