import axios from 'axios';
import { orangeKotaci } from '../../config'

const { host } = orangeKotaci

export const sendCode = async ({ to, code }) =>
  {
    try {
    const response = await axios.get(`${host}/ediocese/sendSms.php`, {
      params: { mobileNumber: to, sms: code }
    });
    console.log(response.data);
  } catch (err) {
    console.error('send sms error', err);
  }
}
